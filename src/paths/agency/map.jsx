import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState, useMemo } from "react";
import * as pmtiles from "pmtiles";
import layers from "protomaps-themes-base";
import { agencies, config } from "../../config";

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
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(agencies[agency].mapDefault[1] ?? -87.6279871036212);
  const [lat] = useState(agencies[agency].mapDefault[0] ?? 41.87433196355158);
  const [zoom] = useState(agencies[agency].mapDefault[2] ?? 12.67);

  let protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

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

          console.log(arrival);

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
            id: "43f36e14-e3f5-43c1-84c0-50a9c80dc5c7",
            name: "MapLibre",
            zoom: 0,
            pitch: 0,
            center: [41.884579601743276, -87.6279871036212],
            glyphs:
              "https://cdn.jsdelivr.net/gh/piemadd/fonts@54b954f510dc79e04ae47068c5c1f2ee39a69216/_output/{fontstack}/{range}.pbf",
            layers: layers("protomaps", "black"),
            bearing: 0,
            sources: {
              protomaps: {
                type: "vector",
                tiles: [
                  "https://tilea.piemadd.com/tiles/{z}/{x}/{y}.mvt",
                  "https://tileb.piemadd.com/tiles/{z}/{x}/{y}.mvt",
                  "https://tilec.piemadd.com/tiles/{z}/{x}/{y}.mvt",
                  "https://tiled.piemadd.com/tiles/{z}/{x}/{y}.mvt",
                  //"http://10.0.0.237:8081/basemap/{z}/{x}/{y}.mvt"
                ],
                maxzoom: 13,
              },
            },
            version: 8,
            metadata: {},
          },
          center: [lng, lat],
          zoom: zoom,
          maxZoom: 16,
        });

        const stationsReq = await fetch(
          `${agencies[agency].endpoint}/stations`
        );
        const trainsReq = await fetch(`${agencies[agency].endpoint}/trains`);

        const stationsData = await stationsReq.json();
        const trainsData = await trainsReq.json();

        fetch(`${agencies[agency].endpoint}/lastUpdated`)
          .then((res) => res.text())
          .then((ts) => {
            setLastUpdated(new Date(ts));
            setIsLoading(false);
          });

        const mapShapes = await fetch(`${agencies[agency].mapShapes}`);
        const mapShapesData = await mapShapes.json();

        map.current.addSource("shapes", {
          type: "geojson",
          data: mapShapesData,
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

        map.current.addSource("stations", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: Object.keys(stationsData).map((stationId) => {
              const station = stationsData[stationId];

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
          fetch(`${agencies[agency].endpoint}/stations`)
            .then((res) => res.json())
            .then((data) => {
              map.current.getSource("stations").setData({
                type: "FeatureCollection",
                features: Object.keys(data).map((stationId) => {
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

              fetch(`${agencies[agency].endpoint}/lastUpdated`)
                .then((res) => res.text())
                .then((ts) => {
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
            "circle-radius": 8,
            "circle-color": "#fff",
            "circle-stroke-color": "#000",
            "circle-stroke-width": 1,
          },
        });

        let finalFeaturesInitial = [];
        let minLat = 90;
        let maxLat = -90;
        let minLon = 180;
        let maxLon = -180;

        Object.keys(trainsData).forEach((trainId) => {
          const train = trainsData[trainId];

          console.log(train);
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
            },
            geometry: {
              type: "Point",
              coordinates: [train.lon, train.lat],
            },
          });
        });

        map.current.addSource("trains", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: finalFeaturesInitial,
          },
        });

        map.current.fitBounds(
          [
            [minLon, minLat],
            [maxLon, maxLat],
          ],
          { padding: 50 }
        );

        setInterval(() => {
          fetch(`${agencies[agency].endpoint}/trains`)
            .then((res) => res.json())
            .then((data) => {
              let finalFeatures = [];

              Object.keys(data).forEach((trainId) => {
                const train = data[trainId];

                if (
                  train.lineCode === singleRouteID ||
                  singleRouteID === "all"
                ) {
                  finalFeatures.push({
                    type: "Feature",
                    id: trainId,
                    properties: {
                      ...train,
                      id: trainId,
                      routeColor: train.lineColor,
                      lineCode: train.lineCode,
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
                    if (error) throw error;
                    console.log(imagePath.split("_")[0]);
                    map.current.addImage(imagePath.split("_")[0], image);
                  }
                );
              });

            map.current.addLayer({
              id: "trains",
              type: "symbol",
              source: "trains",
              layout: {
                "icon-image": ["get", "routeColor"],
                "icon-size": 0.5,
                "icon-allow-overlap": true,
                "text-font": ["Open Sans Regular"],
              },
              paint: {},
            });
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

          console.log(fSorted);

          const feature = fSorted[0];

          if (feature.layer.id === "trains") {
            const train = feature.properties;
            const coordinates = feature.geometry.coordinates.slice();

            console.log(train);

            let predictionsHTML = "";

            JSON.parse(train.predictions)
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
                }${agencies[agency].addLine ? " Line " : " "}#${train.id} to ${
                  train.dest
                }</h3>${
                  extra && extra.cap
                    ? `<p style='margin-top: -2px;padding-bottom: 4px;'>${Math.ceil(
                        (extra.load / extra.cap) * 100
                      )}% Full</p>`
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
                    console.log(train);

                    finalHTML += `<p class='mapTrainBar' style='color: #${
                      train.lineTextColor
                    }; background-color: #${train.lineColor};'><span><strong>${
                      agencies[agency].useCodeForShortName
                        ? train.lineCode
                        : train.line
                    }${agencies[agency].addLine ? " Line " : " "}</strong>#${
                      train.runNumber
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
        fetch(`${agencies[agency].endpoint}/shitsFucked`)
          .then((res) => res.text())
          .then((raw) => {
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
          © OpenStreetMap
        </a>{" "}
        | <span>© Amtraker Tiles</span>
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
