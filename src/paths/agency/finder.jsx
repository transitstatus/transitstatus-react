// finder is used as a way to have a constant page displaying vehicles which meet certain conditions
// as of creation time, this is useful for tracking holiday trains (as train numbers change), but i could add other stuff later

import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { agencies } from "../../config";
import Meta from "../../components/meta";
import Oneko from "../../components/extras/oneko";
import { hoursMinutesUntilArrival } from "../../components/extras/randomTools";
import PieroSnowfall from "../../components/snowFallPiero";

const timeFormat = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const Finder = () => {
  const { agency } = useParams();
  const navigate = useNavigate();
  const [station, setStation] = useState({});
  const [filteredTrains, setFilteredtrains] = useState([]);
  const [lastFetched, setLastFetched] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Loading trains...");
  const [isLoading, setIsLoading] = useState(true);
  const [activateSnowfall, setActivateSnowfall] = useState(false);

  const urlParams = useMemo(() => new URLSearchParams(window.location.search), [window.location.search]);

  const agencyMeta = agencies[agency];

  const finderConditions = {
    holidayChristmas: {
      title: `Holiday ${agencyMeta.typePlural}`,
      description: `All ${agencyMeta.typeCodePlural} that are marked to be holiday/christmas themed.`
    }
  };

  let settings = JSON.parse(localStorage.getItem("transitstatus_v1_settings") ?? "{}");
  if (!settings.playgroundEnabled) settings.playgroundEnabled = false;

  useEffect(() => {
    const fetchData = () => {
      window.dataManager
        .getData(agency, "trains")
        .then((data) => {
          const prefiltered = Object.keys(data).map((runNumber) => {
            const train = data[runNumber];

            return { ...train, runNumber, finalStop: train.predictions.length > 0 ? train.predictions.at(-1) : null };
          });

          //filtering logic here

          console.log(urlParams, urlParams.size);

          if (urlParams.size == 0 || !urlParams.get("filters")) {
            setFilteredtrains(prefiltered);
          } else {
            const filtersString = urlParams.get("filters");
            const filterType = urlParams.get("filterType");

            const filters = filtersString
              .split(";")
              .filter((filter) => filter.length > 0)
              .map((filter) => {
                const filterSplit = filter.split(":");

                switch (filterSplit[0]) {
                  case "includes":
                    return { objectKey: filterSplit[1], filterOperation: (string) => string.includes(filterSplit[2]) };
                    break;
                  default:
                    return { objectKey: filterSplit[1], filterOperation: (string) => false };
                }

                return { objectKey: filterSplit[2], filterOperation: (string) => false };
              });

            const finalTrains = prefiltered.filter((train) => {
              const filterResults = filters.map((filter) => {
                try {
                  return filter.filterOperation(train[filter.objectKey]);
                } catch (e) {
                  console.log("Error processing filter:", filter);
                  console.log(e);
                  return false;
                }
              });

              if (filterType == "AND") {
                return filterResults.every((bool) => bool == true);
              } else if (filterType == "OR") {
                return filterResults.find((bool) => bool == true);
              } else {
                return false;
              }
            });

            setFilteredtrains(finalTrains);
          }

          window.dataManager.getData(agency, "lastUpdated").then((ts) => {
            setLastFetched(new Date(ts).valueOf());
            setIsLoading(false);
          });
        })
        .catch((error) => {
          console.error(error);
          window.dataManager
            .getData(agency, "shitsFucked")
            .then((raw) => {
              if (raw != "Not found") {
                const shitsFucked = JSON.parse(raw);
                if (shitsFucked.shitIsFucked) {
                  setLoadingMessage(shitsFucked.message);
                } else {
                  setLoadingMessage("Error loading data. Please try again later or choose another station.");
                }
              }
              setIsLoading(true);
            })
            .catch((e) => {
              setLoadingMessage("Error loading data. Please try again later or choose another station.");
            });
        });
    };

    fetchData();
    setInterval(fetchData, 60000);
  }, [agency]);

  document.title = `${agencyMeta.name} ${agencyMeta.type} Finder | Transitstat.us`;

  return (
    <main>
      <Oneko />
      {activateSnowfall ? <PieroSnowfall /> : null}
      <h1>
        {agencyMeta.name} {agencyMeta.type} Tracker
      </h1>
      <Meta />
      <div
        style={{
          maxWidth: "384px",
          padding: "0px 8px 4px 8px",
          marginBottom: "4px",
          marginTop: "12px",
          backgroundColor: "#333"
        }}
      >
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ marginTop: "4px" }}>{station.stationName}</h2>
        </span>
        <p>As of {new Date(lastFetched).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
      </div>
      <div className="trains">
        {isLoading ? (
          <p style={{ maxWidth: "384px", padding: "8px", marginBottom: "4px", background: "#333" }}>{loadingMessage}</p>
        ) : (
          filteredTrains
            .sort((a, b) => {
              if (!a.finalStop) return 1;
              if (!b.finalStop) return -1;
              return a.finalStop.actualETA - b.finalStop.actualETA;
            })
            .map((train) => {
              if (train.extra?.holidayChristmas && !activateSnowfall) setActivateSnowfall(true);

              return (
                <Link to={`/${agency}/track/${train.runNumber}`} key={train.runNumber} className="trainLink">
                  <div
                    className="train"
                    style={{
                      background: train.extra?.holidayChristmas
                        ? "repeating-linear-gradient(135deg, #94000a, #94000a 10px, #077001 10px, #077001 20px)"
                        : train.extra?.holidayGay
                          ? "repeating-linear-gradient(135deg, #e22016 0px 10px, #f28917 10px 20px, #efe524 20px 30px, #78b801 30px 40px, #2c58a4 40px 50px, #6d2380 50px 60px, #000 60px 70px, #945516 70px 80px, #7bcce5 80px 90px, #f4aec8 90px 100px, #fff 100px 110px, #fdd817 110px 120px, #66338b 120px 130px)"
                          : `#${train.lineColor}`,
                      color:
                        train.extra?.holidayChristmas || train.extra?.holidayGay
                          ? "#ffffff"
                          : `#${train.lineTextColor}`,
                      opacity: train.realTime ? 1 : 0.7
                    }}
                  >
                    <span
                      style={{
                        filter:
                          train.extra?.holidayChristmas || train.extra?.holidayGay
                            ? "drop-shadow(0px 0px 1px #000000) drop-shadow(0px 0px 2px #000000) drop-shadow(0px 0px 2px #000000)"
                            : null
                      }}
                    >
                      <p>
                        {agencyMeta.useCodeForShortName ? train.lineCode : train.line}
                        {agencyMeta.addLine ? " Line " : " "}
                        {agencyMeta.addType ? `${agencyMeta.type} ` : ""}
                        {train.realTime || (agencyMeta.showTripIDOnScheduled && !train.realTime)
                          ? agencyMeta.tripIDPrefix
                          : ""}
                        {train.realTime || (agencyMeta.showTripIDOnScheduled && !train.realTime)
                          ? agencyMeta.runNumberConverter
                            ? agencyMeta.runNumberConverter(train.runNumber)
                            : train.runNumber
                          : ""}
                        {train.extra?.holidayChristmas ? " 🎄" : train.extra?.holidayGay ? " 🏳️‍🌈" : ""}
                        {train.realTime ? null : <span className="noto-emoji-outline smaller-emoji"> 🕓 </span>} to
                      </p>
                      <h3>{train.dest}</h3>
                      {train.extra && train.extra.info ? <p>{train.extra.info}</p> : null}
                    </span>
                    {train.finalStop && !train.finalStop.noETA ? (
                      <span
                        style={{
                          filter:
                            train.extra?.holidayChristmas || train.extra?.holidayGay
                              ? "drop-shadow(0px 0px 1px #000000) drop-shadow(0px 0px 2px #000000) drop-shadow(0px 0px 2px #000000)"
                              : null
                        }}
                      >
                        <h3 className="trainLink" style={{ textAlign: "right" }}>
                          {hoursMinutesUntilArrival(train.finalStop.actualETA)}
                        </h3>
                        <p
                          className="trainLink"
                          style={{ fontSize: "0.8em", whiteSpace: "nowrap", textAlign: "right" }}
                        >
                          {timeFormat(train.finalStop.actualETA)}
                        </p>
                        {train.extra && train.extra.cap ? (
                          <p className="trainLink" style={{ fontSize: "0.8em" }}>
                            {Math.ceil((train.extra.load / train.extra.cap) * 100)}% Full
                          </p>
                        ) : null}
                      </span>
                    ) : (
                      <span
                        style={{
                          filter:
                            train.extra?.holidayChristmas || train.extra?.holidayGay
                              ? "drop-shadow(0px 0px 1px #000000) drop-shadow(0px 0px 2px #000000) drop-shadow(0px 0px 2px #000000)"
                              : null
                        }}
                      >
                        <h3 className="trainLink">No ETA</h3>
                        {train.extra && train.extra.cap ? (
                          <p className="trainLink" style={{ fontSize: "0.8em" }}>
                            {Math.ceil((train.extra.load / train.extra.cap) * 100)}% Full
                          </p>
                        ) : null}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })
        )}
        <h3
          className="train"
          key="backButton"
          style={{ backgroundColor: agencyMeta.color, color: agencyMeta.textColor, maxWidth: "384px" }}
          onClick={() => {
            //see if querey string has prev
            const prev = urlParams.get("prev");

            if (prev) {
              navigate(-1);
            } else if (history.state.idx && history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate(`/${agency}`, { replace: true }); //fallback
            }
          }}
        >
          Go Back
        </h3>
      </div>
    </main>
  );
};

export default Finder;
