import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { agencies } from "../../config";
import Meta from "../../components/meta";
import Oneko from "../../components/extras/oneko";
import AlertsList from "../../components/alerts/alertsList";
import { hoursMinutesUntilArrival } from "../../components/extras/randomTools"; 
import PieroSnowfall from "../../components/snowFallPiero";

const timeFormat = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const AllTrains = () => {
  const { agency } = useParams();
  const navigate = useNavigate();
  const [trains, setTrains] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [lastFetched, setLastFetched] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Loading trains...");
  const [isLoading, setIsLoading] = useState(true);
  const [activateSnowfall, setActivateSnowfall] = useState(false);

  const agencyMeta = agencies[agency];

  let settings = JSON.parse(localStorage.getItem("transitstatus_v1_settings") ?? '{}');
  if (!settings.playgroundEnabled) settings.playgroundEnabled = false;

  useEffect(() => {
    const fetchData = () => {
      window.dataManager
        .getData(agency, `trains`)
        .then((data) => {
          setTrains(data);
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
                  setLoadingMessage(
                    "Error loading data. Please try again later or choose another agency."
                  );
                }
              }
              setIsLoading(true);
            })
            .catch((e) => {
              setLoadingMessage(
                "Error loading data. Please try again later or choose another agency."
              );
            });
        });

      // alerts
      window.dataManager
        .getData(agency, "alerts")
        .then((data) => {
          if (data === "Not found") return // alerts not supported
          else {
            setAlerts(data);
          }
        });
    };

    fetchData();
    setInterval(fetchData, 5000);
  }, [agency]);

  if (trains === "Not found") {
    document.title = `Trains 404 ${agencyMeta.name} | Transitstat.us`;
    return (
      <main>
        <Oneko />
        {activateSnowfall ? null /*<PieroSnowfall />*/ : null}
        <h1>Trains Not Found</h1>
        <p>
          The agency you were trying to view doesn't exist. Please go back and try
          again.
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
              navigate(`/${agency}`, { replace: true }); //fallback
            }
          }}
        >
          Choose Another Stop
        </h3>
      </main>
    );
  }

  document.title = `${agencyMeta.name} ${agencyMeta.type} Tracker | Transitstat.us`;

  return (
    <main>
      <Oneko />
      {activateSnowfall ? null /*<PieroSnowfall />*/ : null}
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
          backgroundColor: agencies[agency].color,
          color: agencies[agency].textColor,
        }}
      >
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2
            style={{
              marginTop: "4px",
            }}
          >
            All {agencyMeta.name} {agencyMeta.typePlural}
          </h2>
        </span>
      </div>
      <AlertsList alertsArray={alerts} agency={agency} filterType={'agency'} style={{ marginBottom: '8px', marginTop: '0px', maxWidth: '400px' }} />
      <div>
        <div key={'key'} className='trains'>
          {isLoading ? (
            <p
              style={{
                maxWidth: "384px",
                padding: "8px",
                marginBottom: "4px",
                background: "#333",
              }}
            >
              {loadingMessage}
            </p>
          ) : (
            Object.keys(trains)
              .map((runNumber) => {
                if (trains[runNumber].extra?.holidayChristmas && !activateSnowfall) setActivateSnowfall(true);

                return {
                  ...trains[runNumber],
                  runNumber,
                }
              })
              .sort((a, b) => { // sorting trains by whether they're tracking and the time of their next stop
                if (a.realTime && b.realTime) { // sort by number of predictions
                  if (a.predictions.length > 0 && b.predictions.length > 0) { // now sort by the time of their next stop
                    return a.predictions[0].actualETA - b.predictions[0].actualETA;
                  }
                  if (a.predictions.length > 0 && b.predictions.length == 0) return -1; // a has predictions
                  if (a.predictions.length == 0 && b.predictions.length > 0) return 1; // b has predictions
                  return 0; // neither has predictions
                }
                if (a.realTime && !b.realTime) return -1; // a positive number prioritizes a
                if (!a.realTime && b.realTime) return 1; // a negative number prioritizes b
                if (!a.realTime && !b.realTime) {
                  if (a.predictions.length > 0 && b.predictions.length > 0) { // now sort by the time of their next stop
                    return a.predictions[0].actualETA - b.predictions[0].actualETA;
                  }
                  if (a.predictions.length > 0 && b.predictions.length == 0) return -1; // a has predictions
                  if (a.predictions.length == 0 && b.predictions.length > 0) return 1; // b has predictions
                  return 0; // neither has predictions
                }
              })
              .map((train) => {
                return (
                  <Link
                    to={`/${agency}/track/${train.runNumber}`}
                    key={train.runNumber}
                    className='trainLink'
                  >
                    <div
                      className='train'
                      style={{
                        background: train.extra?.holidayChristmas ? "repeating-linear-gradient(135deg, #94000a, #94000a 10px, #077001 10px, #077001 20px)" : `#${train.lineColor}`,
                        color: train.extra?.holidayChristmas ? '#ffffff' : `#${train.lineTextColor}`,
                        opacity: train.realTime ? 1 : 0.7,
                      }}
                    >
                      <span
                        style={{
                          filter: train.extra?.holidayChristmas ? 'drop-shadow(0px 0px 2px #000000)' : null,
                        }}
                      >
                        <p>
                          {agencyMeta.useCodeForShortName
                            ? train.lineCode
                            : train.line}
                          {agencyMeta.addLine ? " Line " : " "}
                          {train.realTime ? '' : train.predictions.length > 0 ? 'Sch. ' : ""}
                          {train.realTime || (agencyMeta.showTripIDOnScheduled && !train.realTime) ? agencyMeta.tripIDPrefix : ""}
                          {train.realTime || (agencyMeta.showTripIDOnScheduled && !train.realTime) ? (agencyMeta.runNumberConverter ? agencyMeta.runNumberConverter(train.runNumber) : train.runNumber) : ""}{train.extra?.holidayChristmas ? " 🎄" : ""}
                          {train.deadMileage && train.predictions.length == 0 ? null : " to"}
                        </p>
                        {train.deadMileage && train.predictions.length == 0 ? null : <h3>{train.dest ?? train.routeLongName}</h3>}
                        {train.extra && train.extra.info ? (
                          <p>{train.extra.info}</p>
                        ) : null}
                      </span>
                      {!train.noETA ? (
                        <span
                          style={{
                            filter: train.extra?.holidayChristmas ? 'drop-shadow(0px 0px 2px #000000)' : undefined,
                          }}>
                          <h3 className='trainLink' style={{
                            textAlign: 'right',
                          }}>
                            {train.predictions.length > 0 ?
                              hoursMinutesUntilArrival(
                                train.predictions[0].actualETA
                              ) : null}
                          </h3>
                          <p
                            className='trainLink'
                            style={{
                              fontSize: "0.8em",
                              whiteSpace: "nowrap",
                              textAlign: 'right',
                            }}
                          >
                            {train.predictions.length > 0 ?
                              timeFormat(
                                train.predictions[0].actualETA
                              ) : 'No Schedule'}
                          </p>
                          {train.extra && train.extra.cap ? (
                            <p
                              className='trainLink'
                              style={{
                                fontSize: "0.8em",
                              }}
                            >
                              {Math.ceil(
                                (train.extra.load / train.extra.cap) *
                                100
                              )}
                              % Full
                            </p>
                          ) : null}
                        </span>
                      ) : (
                        <span
                          style={{
                            filter: train.extra?.holidayChristmas ? 'drop-shadow(0px 0px 2px #000000)' : undefined,
                          }}>
                          <h3 className='trainLink'>No ETA</h3>
                          {train.extra && train.extra.cap ? (
                            <p
                              className='trainLink'
                              style={{
                                fontSize: "0.8em",
                              }}
                            >
                              {Math.ceil(
                                (train.extra.load / train.extra.cap) *
                                100
                              )}
                              % Full
                            </p>
                          ) : null}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })
          )}
        </div>
        <h3
          className='train'
          key='backButton'
          style={{
            backgroundColor: agencyMeta.color,
            color: agencyMeta.textColor,
            maxWidth: "384px",
          }}
          onClick={() => {
            //see if querey string has prev
            const urlParams = new URLSearchParams(window.location.search);
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

export default AllTrains;
