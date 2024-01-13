import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState, useMemo } from "react";
import * as pmtiles from "pmtiles";
import layers from "../../components/extras/mapStyle.json";
//import osmLibertyTransitstatus from "../../components/extras/osm_liberty_-_transitstatus.json";
import { agencies } from "../../config";
import { DataManager } from "../../dataManager";
import Oneko from "../../components/extras/oneko";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Map = () => {
  const { agency } = useParams();
  const singleRouteID = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const routeID = urlParams.get("route") ?? "all";

    console.log("route filter", routeID);

    return routeID;
  }, []);
  const navigate = useNavigate();
  const dataManager = useMemo(() => new DataManager(), []);
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  if (!agencies[agency]) {
    document.title = `Agency 404 Map | Transitstat.us`;
    
    return (
      <>
        <Oneko />
        <h1>Agency Not Found</h1>
        <p>
          The agency you are looking for does not exist. Please choose another
          agency.
        </p>
        <h3
          className='route'
          key='backButton'
          style={{
            backgroundColor: "#444",
            color: "#fff",
            fontSize: "1.3rem",
            padding: "8px",
            marginTop: "4px",
          }}
          onClick={() => {
            if (history.state.idx && history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate("/", { replace: true }); //fallback
            }
          }}
        >
          Choose Another Agency
        </h3>
      </>
    );
  }

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(agencies[agency].mapDefault[1] ?? -87.6279871036212);
  const [lat] = useState(agencies[agency].mapDefault[0] ?? 41.87433196355158);
  const [zoom] = useState(agencies[agency].mapDefault[2] ?? 12.67);

  let protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  document.title = `${agencies[agency].name} Map | Transitstat.us`;

  useEffect(() => {
    (async () => {
      try {
        const dateFormatter = new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });

        const hoursMinutesUntilArrival = (arrivalTime) => {
          const now = new Date();
          const arrival = new Date(arrivalTime);

          const minutes = Math.floor((arrival - now) / 1000 / 60);
          const hours = Math.floor(minutes / 60);

          if (minutes < 1 && hours < 1) return "Due";
          if (hours === 0) return `${minutes % 60}m`;
          if (minutes % 60 === 0) return `${hours}h`;

          return `${hours}h ${minutes % 60}m`;
        };

        //if (map.current) return; // initialize map only once

        if (map.current) return;

        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: {
            zoom: 0,
            pitch: 0,
            center: [41.884579601743276, -87.6279871036212],
            glyphs:
              "https://fonts.transitstat.us/_output/{fontstack}/{range}.pbf",
            sprite: "https://osml.transitstat.us/sprites/osm-liberty",
            layers: layers,
            bearing: 0,
            sources: {
              protomaps: {
                type: "vector",
                url: "pmtiles://https://pm.transitstat.us/20240105.pmtiles",
                maxzoom: 15,
                attribution:
                  "&copy; OpenStreetMap | &copy; Transitstatus | &copy; Protomaps",
              },
              natural_earth_shaded_relief: {
                maxzoom: 6,
                tileSize: 256,
                tiles: [
                  "https://naturalearthtiles.transitstat.us/{z}/{x}/{y}.png",
                ],
                type: "raster",
              },
            },
            version: 8,
            metadata: {},
          },
          center: [lng, lat],
          zoom: zoom,
          maxZoom: 20,
        });

        const stationsData = await dataManager.getData(agency, "stations");
        const trainsData = await dataManager.getData(agency, "trains");
        const linesData = await dataManager.getData(agency, "lines");

        dataManager.getData(agency, "lastUpdated").then((ts) => {
          setLastUpdated(new Date(ts));
          setIsLoading(false);
        });

        let fullMapShapes = {
          type: "FeatureCollection",
          features: [],
        };
        const mapShapeURLs = agencies[agency].mapShapes;

        for (let i = 0; i < mapShapeURLs.length; i++) {
          const mapShapes = await fetch(mapShapeURLs[i]);
          const mapShapesData = await mapShapes.json();

          fullMapShapes.features.push(
            ...mapShapesData.features.filter((feature) => {
              if (singleRouteID === "all") return true;
              if (feature.properties.routeID === singleRouteID) return true;
              return false;
            })
          );
        }

        map.current.addSource("shapes", {
          type: "geojson",
          data: fullMapShapes,
        });

        map.current.addLayer({
          id: "shapes",
          type: "line",
          source: "shapes",
          layout: {
            "line-join": "round",
            "line-round-limit": 0.1,
          },
          paint: {
            "line-color": ["get", "routeColor"],
            "line-opacity": 1,
            "line-width": 4,
          },
        });

        let minLat = 90;
        let maxLat = -90;
        let minLon = 180;
        let maxLon = -180;

        map.current.addSource("stations", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: Object.keys(stationsData)
              .filter((station) => {
                if (singleRouteID === "all") return true;

                const line = linesData[singleRouteID];

                //oopsies!
                if (!line) return false;

                if (line.stations.includes(station)) return true;

                return false;
              })
              .map((stationId) => {
                const station = stationsData[stationId];

                if (station.lat !== 0 && station.lon !== 0) {
                  if (station.lat < minLat) minLat = station.lat;
                  if (station.lat > maxLat) maxLat = station.lat;
                  if (station.lon < minLon) minLon = station.lon;
                  if (station.lon > maxLon) maxLon = station.lon;
                }

                return {
                  type: "Feature",
                  id: stationId,
                  properties: {
                    id: stationId,
                    name: station.stationName,
                    stationData: station,
                  },
                  geometry: {
                    type: "Point",
                    coordinates: [station.lon, station.lat],
                  },
                };
              }),
          },
        });

        setInterval(() => {
          dataManager.getData(agency, "stations").then((data) => {
            map.current.getSource("stations").setData({
              type: "FeatureCollection",
              features: Object.keys(data)
                .filter((station) => {
                  if (singleRouteID === "all") return true;

                  const line = linesData[singleRouteID];

                  //oopsies!
                  if (!line) return false;

                  if (line.stations.includes(station)) return true;

                  return false;
                })
                .map((stationId) => {
                  const station = data[stationId];

                  return {
                    type: "Feature",
                    id: stationId,
                    properties: {
                      id: stationId,
                      name: station.stationName,
                      stationData: station,
                    },
                    geometry: {
                      type: "Point",
                      coordinates: [station.lon, station.lat],
                    },
                  };
                }),
            });

            dataManager.getData(agency, "lastUpdated").then((ts) => {
              setLastUpdated(new Date(ts));
            });

            console.log("Updated stations data");

            //stationsSource.
          });
        }, 1000 * 30);

        map.current.addLayer({
          id: "stations",
          type: "circle",
          source: "stations",
          paint: {
            "circle-radius": 6,
            "circle-color": "#fff",
            "circle-stroke-color": "#000",
            "circle-stroke-width": 1,
          },
        });

        let finalFeaturesInitial = [];

        Object.keys(trainsData).forEach((trainId) => {
          const train = trainsData[trainId];

          if (train.lineCode !== singleRouteID && singleRouteID !== "all")
            return;

          if (train.lat !== 0 && train.lon !== 0) {
            if (train.lat < minLat) minLat = train.lat;
            if (train.lat > maxLat) maxLat = train.lat;
            if (train.lon < minLon) minLon = train.lon;
            if (train.lon > maxLon) maxLon = train.lon;
          }

          finalFeaturesInitial.push({
            type: "Feature",
            id: trainId,
            properties: {
              ...train,
              id: trainId,
              routeColor: train.lineColor,
              lineCode: train.lineCode,
              heading: train.heading,
            },
            geometry: {
              type: "Point",
              coordinates: [train.lon, train.lat],
            },
          });
        });

        console.log(finalFeaturesInitial);

        map.current.addSource("trains", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: finalFeaturesInitial,
          },
        });

        if (
          minLat !== 90 &&
          maxLat !== -90 &&
          minLon !== 180 &&
          maxLon !== -180
        ) {
          map.current.fitBounds(
            [
              [minLon, minLat],
              [maxLon, maxLat],
            ],
            { padding: 50 }
          );
        }

        setInterval(() => {
          dataManager.getData(agency, "trains").then((data) => {
            let finalFeatures = [];

            Object.keys(data).forEach((trainId) => {
              const train = data[trainId];

              if (train.lineCode === singleRouteID || singleRouteID === "all") {
                finalFeatures.push({
                  type: "Feature",
                  id: trainId,
                  properties: {
                    ...train,
                    id: trainId,
                    routeColor: train.lineColor,
                    lineCode: train.lineCode,
                    heading: train.heading,
                  },
                  geometry: {
                    type: "Point",
                    coordinates: [train.lon, train.lat],
                  },
                });
              }
            });

            map.current.getSource("trains").setData({
              type: "FeatureCollection",
              features: finalFeatures,
            });

            console.log("Updated trains data");
          });
        }, 1000 * 10);

        fetch(`${agencies[agency].gtfsRoot}/icons.json`)
          .then((res) => res.json())
          .then((data) => {
            const uniqueData = [...new Set(data)];

            uniqueData
              .filter((n) => n.includes(agencies[agency].typeCode))
              .forEach((imagePath) => {
                map.current.loadImage(
                  `${agencies[agency].gtfsRoot}/icons/${imagePath}`,
                  (error, image) => {
                    if (error)
                      console.log(
                        `Error loading image ${imagePath}, probably nothing. Fuck this idk`
                      );
                    console.log(imagePath.split(".")[0]);
                    map.current.addImage(imagePath.split("_")[0], image);
                  }
                );
              });

            uniqueData
              .filter((n) => n.includes("arrow"))
              .forEach((imagePath) => {
                map.current.loadImage(
                  `${agencies[agency].gtfsRoot}/icons/${imagePath}`,
                  (error, image) => {
                    if (error)
                      console.log(
                        `Error loading image ${imagePath}, probably nothing. Fuck this idk`
                      );
                    console.log(imagePath.split(".")[0]);
                    map.current.addImage(imagePath.split(".")[0], image);
                  }
                );
              });

            map.current.addLayer({
              id: "trains",
              type: "symbol",
              source: "trains",
              layout: {
                "icon-image": ["get", "routeColor"],
                "icon-rotation-alignment": "map",
                "icon-size": 0.5,
                "icon-allow-overlap": true,
                "text-font": ["Open Sans Regular"],
              },
              paint: {},
            });

            if (agencies[agency].showArrow) {
              map.current.addLayer({
                id: "trains_arrows",
                type: "symbol",
                source: "trains",
                layout: {
                  "icon-image": ["concat", ["get", "routeColor"], "_arrow"],
                  "icon-rotation-alignment": "map",
                  "icon-size": 0.5,
                  "icon-rotate": ["get", "heading"],
                  "icon-allow-overlap": true,
                  "text-font": ["Open Sans Regular"],
                },
                paint: {},
              });
            }
          });

        map.current.on("click", (e) => {
          let f = map.current.queryRenderedFeatures(e.point, {
            layers: ["trains", "stations"],
          });

          if (f.length === 0) return;

          const fSorted = f.sort((a, b) => {
            if (a.layer.id === "trains") return 1;
            if (b.layer.id === "trains") return -1;
            return 0;
          });

          const feature = fSorted[0];

          if (feature.layer.id === "trains") {
            const train = feature.properties;
            const coordinates = feature.geometry.coordinates.slice();

            let predictionsHTML = "";

            JSON.parse(train.predictions)
              .sort((a, b) => a.actualETA - b.actualETA)
              .slice(0, 5)
              .forEach((prediction) => {
                console.log("prediction", prediction);
                predictionsHTML += `<p class='mapTrainBar' style='color: #${
                  train.lineTextColor
                }; background-color: #${train.lineColor};'><strong>${
                  prediction.stationName
                }</strong><strong>${
                  prediction.noETA
                    ? "No ETA"
                    : hoursMinutesUntilArrival(new Date(prediction.actualETA))
                }</strong></p>`;
              });

            const extra = train.extra ? JSON.parse(train.extra) : null;

            const trainPopup = new maplibregl.Popup({
              offset: 12,
              closeButton: true,
            })
              .setLngLat(coordinates)
              .setHTML(
                `<div class='mapBar'><h3>${
                  agencies[agency].useCodeForShortName
                    ? train.lineCode
                    : train.line
                }${agencies[agency].addLine ? " Line " : " "}#${
                  agencies[agency].removeLineCodeFromRunNumber
                    ? train.id.replace(train.lineCode, "")
                    : train.id
                } to ${train.dest}</h3>${
                  extra && (extra.cap || extra.info)
                    ? `<p style='margin-top: -2px;padding-bottom: 4px;'>${
                        extra.info ?? ""
                      }${extra.cap && extra.info ? " | " : ""}${
                        extra.cap
                          ? `${Math.ceil((extra.load / extra.cap) * 100)}% Full`
                          : ""
                      }</p>`
                    : ""
                }${predictionsHTML}<p class='mapTrainBar' style='color: #${
                  train.lineTextColor
                }; background-color: #${
                  train.lineColor
                };'><strong><a style='color: #${
                  train.lineTextColor
                }; background-color: #${
                  train.lineColor
                };' href='/${agency}/track/${train.id}?prev=map'>View Full ${
                  agencies[agency].type
                }</a></strong></p></div>`
              )
              .addTo(map.current);
          } else if (feature.layer.id === "stations") {
            const station = JSON.parse(feature.properties.stationData);
            const coordinates = feature.geometry.coordinates.slice();

            let finalHTML = `<div class='mapBar'><h3>${station.stationName}</h3>`;

            let noTrainsAtAll = true;

            Object.keys(station.destinations).forEach((destKey) => {
              const dest = station.destinations[destKey];
              let destHasLineTrains = false;

              dest.trains.forEach((train) => {
                if (
                  train.lineCode === singleRouteID ||
                  singleRouteID === "all"
                ) {
                  destHasLineTrains = true;
                }
              });

              if (dest.trains.length === 0 || !destHasLineTrains) {
                //finalHTML += `<p class='mapTrainBar'>No trains tracking</p>`;
              } else {
                noTrainsAtAll = false;
                finalHTML += `<p class='mapStationBar'>To <strong>${destKey}</strong></p>`;
                dest.trains
                  .filter(
                    (train) =>
                      (train.lineCode === singleRouteID ||
                        singleRouteID === "all") &&
                      !train.noETA
                  )
                  .sort((a, b) => a.actualETA - b.actualETA)
                  .slice(0, 3)
                  .forEach((train) => {
                    finalHTML += `<p class='mapTrainBar' style='color: #${
                      train.lineTextColor
                    }; background-color: #${train.lineColor};'><span><strong>${
                      agencies[agency].useCodeForShortName
                        ? train.lineCode
                        : train.line
                    }${agencies[agency].addLine ? " Line " : " "}</strong>#${
                      agencies[agency].removeLineCodeFromRunNumber
                        ? train.runNumber.replace(train.lineCode, "")
                        : train.runNumber
                    } to <strong>${destKey}</strong></span><strong>${
                      train.noETA
                        ? "No ETA"
                        : hoursMinutesUntilArrival(new Date(train.actualETA))
                    }</strong></p>`;
                  });
              }
            });

            if (noTrainsAtAll) {
              finalHTML += `<p class='mapTrainBar'>No ${agencies[agency].typeCodePlural} tracking</p>`;
            }

            finalHTML += "</div>";

            const stationPopup = new maplibregl.Popup({
              offset: 12,
              closeButton: true,
            })
              .setLngLat(coordinates)
              .setHTML(finalHTML)
              .addTo(map.current);
          }
        });

        map.current.on("mouseenter", "stations", () => {
          map.current.getCanvas().style.cursor = "pointer";
        });

        map.current.on("mouseleave", "stations", () => {
          map.current.getCanvas().style.cursor = "";
        });

        map.current.on("mouseenter", "trains", () => {
          map.current.getCanvas().style.cursor = "pointer";
        });

        map.current.on("mouseleave", "trains", () => {
          map.current.getCanvas().style.cursor = "";
        });

        map.current.on("moveend", () => {
          console.log(
            `Map moved to ${map.current.getCenter()} with zoom ${map.current.getZoom()}`
          );
        });

        map.current.addControl(
          new maplibregl.NavigationControl({
            visualizePitch: true,
          }),
          "top-right"
        );
        map.current.addControl(new maplibregl.FullscreenControl());
        map.current.addControl(
          new maplibregl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          })
        );

        console.log("Map initialized");
      } catch (e) {
        console.log("Error initializing map", e);

        dataManager.getData(agency, "shitsFucked").then((raw) => {
          if (raw === "Not found") {
            setLoadingMessage("Error loading data :c");
          } else {
            const data = JSON.parse(raw);

            if (data.shitIsFucked) {
              setLoadingMessage(data.message);
            } else {
              setLoadingMessage("Error loading data :c");
            }
          }
          setIsLoading(true);
        });
      }
    })();
  }, []);

  return (
    <>
      <Oneko />
      <div
        ref={mapContainer}
        className='map'
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100vw",
          height: "calc(100vh - 80px)",
        }}
      ></div>
      <div
        style={{
          display: "none",
          position: "absolute",
          bottom: "0",
          right: "0",
          textAlign: "right",
          marginBottom: "80px",
          zIndex: "1000",
          padding: "4px 8px",
          color: "#fff",
          backgroundColor: "#333",
          borderStartStartRadius: "8px",
        }}
      >
        <a href='https://protomaps.com' target='_blank' rel='noreferrer'>
          Protomaps
        </a>{" "}
        |{" "}
        <a
          href='https://openstreetmap.org/copyright'
          target='_blank'
          rel='noreferrer'
        >
          &copy;OpenStreetMap
        </a>{" "}
        |{" "}
        <a href='https://piemadd.com' target='_blank' rel='noreferrer'>
          &copy;Piero
        </a>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
        }}
      >
        <p
          style={{
            height: "32px",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#444",
          }}
        >
          {isLoading
            ? loadingMessage
            : `Last Updated at ${lastUpdated.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
        </p>
        <h3
          key='backButton'
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "underline",
            cursor: "pointer",
            backgroundColor: agencies[agency].color,
            color: agencies[agency].textColor,
            fontSize: "1.3rem",
            padding: "8px",
            width: "calc(100vw - 16px)",
            height: "32px",
          }}
          onClick={() => {
            if (history.state.idx && history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate(`/${agency}`, { replace: true }); //fallback
            }
          }}
        >
          Go Back
        </h3>
      </div>
    </>
  );
};

export default Map;
