import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { agencies, config } from "../../config";
import Heart from "../../components/heart";
import Meta from "../../components/meta";

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
  const [station, setStation] = useState({});
  const [lastFetched, setLastFetched] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Loading trains...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${agencies[agency].endpoint}/stations/${stopID}`)
        .then((response) => response.json())
        .then((data) => {
          setStation(data);
          setLastFetched(new Date().valueOf());
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoadingMessage(
            "Error loading data. Please try again later or choose another station."
          );
          setIsLoading(true);
        });
    };

    fetchData();
    setInterval(fetchData, 30000);
  }, [agency, stopID]);

  return (
    <>
      <h1>
        {agencies[agency].name} {agencies[agency].type} Tracker
      </h1>
      <Meta />
      <div
        style={{
          maxWidth: "384px",
          padding: "0px 8px",
          marginBottom: "4px",
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
          <Heart
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
          <p>{loadingMessage}</p>
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
                          if (!a.eta) return -1;
                          if (!b.eta) return 1;
                          return a.eta - b.eta;
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
                                    {train.runNumber} to
                                  </p>
                                  <h3>
                                    {destinationKey
                                      ? destinationKey
                                      : train.routeLongName}
                                  </h3>
                                </span>
                                <span>
                                  <h3 className='trainLink'>
                                    {hoursMinutesUntilArrival(train.actualETA)}
                                  </h3>
                                  <p
                                    className='trainLink'
                                    style={{
                                      fontSize: "0.8em",
                                    }}
                                  >
                                    {timeFormat(train.actualETA)}
                                  </p>
                                </span>
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
