import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { agencies } from "../../config";
import StationHeart from "../../components/hearts/stationHeart";
import Meta from "../../components/meta";
import Oneko from "../../components/extras/oneko";
import Snowfall from "react-snowfall";

const hoursMinutesUntilArrival = (arrivalTime) => {
  const now = new Date();
  const arrival = new Date(arrivalTime);

  const minutes = Math.floor((arrival - now) / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let finalString = '';

  if (minutes < 1 && hours < 1) return 'Due';
  if (days > 0) finalString += `${days}d `;
  if (hours % 24 > 0 || days > 0) finalString += `${hours % 24}h `;
  if (minutes % 60 > 0 || days > 0) finalString += `${minutes % 60}m`;

  return finalString.trim();
};

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
  const [lastFetched, setLastFetched] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Loading trains...");
  const [isLoading, setIsLoading] = useState(true);
  const [activateSnowfall, setActivateSnowfall] = useState(false);

  const agencyMeta = agencies[agency];

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
              if (raw !== "Not found") {
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
    };

    fetchData();
    setInterval(fetchData, 30000);
  }, [agency, stopID]);

  if (station === "Not found") {
    document.title = `Stop 404 ${agencyMeta.name} | Transitstat.us`;
    return (
      <>
        <Oneko />
        {activateSnowfall ? <Snowfall /> : null}
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
      </>
    );
  }

  document.title = `${station.stationName} ${agencyMeta.name} | Transitstat.us`;

  return (
    <>
      <Oneko />
      {activateSnowfall ? <Snowfall /> : null}
      <h1>
        {agencyMeta.name} {agencyMeta.type} Tracker
      </h1>
      <Meta />
      <div
        style={{
          maxWidth: "384px",
          padding: "0px 8px",
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
            }}
          />
        </span>
        <p
          style={{
            marginBottom: "8px",
          }}
        >
          As of{" "}
          {new Date(lastFetched).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
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
                              style={{
                                pointerEvents: train.realTime ? null : 'none',
                              }}
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
                                    {train.realTime ? '' : 'Scheduled '}
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
            if (history.state.idx && history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate(`/${agency}`, { replace: true }); //fallback
            }
          }}
        >
          Choose Another Station
        </h3>
      </div>
    </>
  );
};

export default Station;
