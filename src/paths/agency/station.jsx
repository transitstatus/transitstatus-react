import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { agencies } from "../../config";
import StationHeart from "../../components/hearts/stationHeart";
import Meta from "../../components/meta";
import Oneko from "../../components/extras/oneko";
import AlertsList from "../../components/alerts/alertsList";
import { hoursMinutesUntilArrival } from "../../components/extras/randomTools";
import PieroSnowfall from "../../components/snowFall";

const timeFormat = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Station = () => {
  const { agency, stopID } = useParams();
  const navigate = useNavigate();
  const [station, setStation] = useState({});
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
        .getData(agency, `stations/${stopID}`)
        .then((data) => {
          setStation(data);
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
                    "Error loading data. Please try again later or choose another station."
                  );
                }
              }
              setIsLoading(true);
            })
            .catch((e) => {
              setLoadingMessage(
                "Error loading data. Please try again later or choose another station."
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
  }, [agency, stopID]);

  if (station === "Not found") {
    document.title = `Stop 404 ${agencyMeta.name} | Transitstat.us`;
    return (
      <main>
        <Oneko />
        {activateSnowfall ? <PieroSnowfall /> : null}
        <h1>Stop Not Found</h1>
        <p>
          The stop you were trying to view doesn't exist. Please go back and try
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

  document.title = `${station.stationName} ${agencyMeta.name} Tracker | Transitstat.us`;

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
          backgroundColor: "#333",
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
            {station.stationName}
          </h2>
          <StationHeart
            agency={agency}
            station={station}
            style={{
              width: "26px",
              marginTop: "8px",
              color: "#fff",
            }}
          />
        </span>
        <p>
          As of{" "}
          {new Date(lastFetched).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      {settings.playgroundEnabled ? (
        <h3
          className='train'
          key='backButton'
          style={{
            backgroundColor: agencyMeta.color,
            color: agencyMeta.textColor,
            maxWidth: "384px",
            marginBottom: '4px',
          }}
          onClick={() => {
            const parsedURL = new URL(document.URL);
            navigate(`${parsedURL.pathname.replace('/stops/', '/stops/display/')}${parsedURL.search}`, { replace: true })
          }}
        >
          Show Station Display
        </h3>) : null}
      <AlertsList alertsArray={alerts} agency={agency} filterType={'stop'} filterID={stopID} style={{ marginBottom: '8px', marginTop: '0px', maxWidth: '400px' }} />
      <div>
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
          Object.keys(station.destinations)
            .sort((a, b) => a.localeCompare(b)) // sorting destinations alphabetically
            .map((destinationKey) => {
              return (
                <div key={destinationKey} className='trains'>
                  {station.destinations[destinationKey].trains.length > 0 ? (
                    <>
                      <h3 className='destination'>{agencyMeta.useDirectionsInsteadOfDestinations ? `${destinationKey} ${agencyMeta.typePlural}` : `Towards ${destinationKey}`}</h3>
                      {station.destinations[destinationKey].trains
                        .sort((a, b) => {
                          if (!a.actualETA) return -1;
                          if (!b.actualETA) return 1;
                          return a.actualETA - b.actualETA;
                        })
                        .filter((eta) => eta.actualETA >= Date.now() - (1000 * 60 * 5) || eta.noETA)
                        .map((train) => {
                          if (train.extra?.holidayChristmas && !activateSnowfall) setActivateSnowfall(true);

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
                                    {train.realTime ? '' : 'Sch. '}
                                    {train.realTime || (agencyMeta.showTripIDOnScheduled && !train.realTime) ? agencyMeta.tripIDPrefix : ""}
                                    {train.realTime || (agencyMeta.showTripIDOnScheduled && !train.realTime) ? (agencyMeta.runNumberConverter ? agencyMeta.runNumberConverter(train.runNumber) : train.runNumber) : ""}{train.extra?.holidayChristmas ? " 🎄" : ""} to
                                  </p>
                                  <h3>
                                    {train.destination ?? destinationKey ?? train.routeLongName}
                                  </h3>
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
                                      {hoursMinutesUntilArrival(
                                        train.actualETA
                                      )}
                                    </h3>
                                    <p
                                      className='trainLink'
                                      style={{
                                        fontSize: "0.8em",
                                        whiteSpace: "nowrap",
                                        textAlign: 'right',
                                      }}
                                    >
                                      {timeFormat(train.actualETA)}
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
                        })}
                    </>
                  ) : (
                    <>
                      <p className='destination'>
                        {
                          agencyMeta.useDirectionsInsteadOfDestinations ?
                            `No ${destinationKey} ${agencyMeta.typePlural}` :
                            `No ${agencyMeta.typePlural} towards ${destinationKey}`
                        }
                      </p>
                    </>
                  )}
                </div>
              );
            })
        )}
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
          Choose Another Station
        </h3>
      </div>
    </main>
  );
};

export default Station;
