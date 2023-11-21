import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { agencies } from "../../config";
import StationHeart from "../../components/hearts/stationHeart";
import Meta from "../../components/meta";
import { DataManager } from "../../dataManager";
import Oneko from "../../components/extras/oneko";

const hoursMinutesUntilArrival = (arrivalTime) => {
  const now = new Date();
  const arrival = new Date(arrivalTime);

  const minutes = Math.floor((arrival - now) / 1000 / 60);
  const hours = Math.floor(minutes / 60);

  if (minutes < 1) return "Due";
  if (hours === 0) return `${minutes % 60}m`;
  if (minutes % 60 === 0) return `${hours}h`;

  return `${hours}h ${minutes % 60}m`;
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
  const dataManager = new DataManager();
  const [station, setStation] = useState({});
  const [lastFetched, setLastFetched] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Loading trains...");
  const [isLoading, setIsLoading] = useState(true);

  document.title = `${station.stationName} ${agencies[agency].name} | Transitstat.us`;

  useEffect(() => {
    const fetchData = () => {
      dataManager
        .getData(agency, `stations/${stopID}`)
        .then((data) => {
          setStation(data);
          dataManager.getData(agency, "lastUpdated").then((ts) => {
            setLastFetched(new Date(ts).valueOf());
            setIsLoading(false);
          });
        })
        .catch((error) => {
          console.error(error);
          dataManager
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

  return (
    <>
      <Oneko />
      <h1>
        {agencies[agency].name} {agencies[agency].type} Tracker
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
            .sort((a, b) => {
              // if both have no trains, sort alphabetically
              if (
                station.destinations[a].trains.length === 0 &&
                station.destinations[b].trains.length === 0
              )
                return a.localeCompare(b);

              // if one has no trains, sort it to the bottom
              if (station.destinations[a].trains.length === 0) return 1;
              if (station.destinations[b].trains.length === 0) return -1;

              // if the station is the destination, sort it to the bottom
              if (a === station.stationName) return 1;
              if (b === station.stationName) return -1;

              // sort by the first train's arrival time
              return a.localeCompare(b);
            })
            .map((destinationKey) => {
              return (
                <div key={destinationKey} className='trains'>
                  {station.destinations[destinationKey].trains.length > 0 ? (
                    <>
                      <h3 className='destination'>Towards {destinationKey}</h3>
                      {station.destinations[destinationKey].trains
                        .sort((a, b) => {
                          if (!a.actualETA) return -1;
                          if (!b.actualETA) return 1;
                          return a.actualETA - b.actualETA;
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
                                  backgroundColor: `#${train.lineColor}`,
                                  color: `#${train.lineTextColor}`,
                                }}
                              >
                                <span>
                                  <p>
                                    {agencies[agency].useCodeForShortName
                                      ? train.lineCode
                                      : train.line}
                                    {agencies[agency].addLine ? " Line " : " "}#
                                    {agencies[agency].onlyNumberRunNumber
                                      ? train.runNumber.replace(/\D/g, "")
                                      : train.runNumber}{" "}
                                    to
                                  </p>
                                  <h3>
                                    {destinationKey
                                      ? destinationKey
                                      : train.routeLongName}
                                  </h3>
                                  {train.extra && train.extra.info ? (
                                    <p>{train.extra.info}</p>
                                  ) : null}
                                </span>
                                {!train.noETA ? (
                                  <span>
                                    <h3 className='trainLink'>
                                      {hoursMinutesUntilArrival(
                                        train.actualETA
                                      )}
                                    </h3>
                                    <p
                                      className='trainLink'
                                      style={{
                                        fontSize: "0.8em",
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
                                  <span>
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
                        No {agencies[agency].typePlural} towards{" "}
                        {destinationKey}
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
            backgroundColor: agencies[agency].color,
            color: agencies[agency].textColor,
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
