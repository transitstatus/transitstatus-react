import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { agencies, config } from "../../config";
import Meta from "../../components/meta";

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

const timeFormat = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Trip = () => {
  const { agency, tripID } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState({});
  const [stations, setStations] = useState({});
  const [loadingMessage, setLoadingMessage] = useState("Loading trip...");
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${agencies[agency].endpoint}/trains/${tripID}`)
        .then((response) => response.json())
        .then((data) => {
          setTrip(data);
          fetch(`${agencies[agency].endpoint}/lastUpdated`)
            .then((res) => res.text())
            .then((ts) => {
              setLastFetched(new Date(ts).valueOf());
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.error(error);

          fetch(`${agencies[agency].endpoint}/shitsFucked`)
            .then((res) => res.text())
            .then((raw) => {
              if (raw !== "Not found") {
                const shitsFucked = JSON.parse(raw);
                if (shitsFucked.shitIsFucked) {
                  setLoadingMessage(shitsFucked.message);
                } else {
                  setLoadingMessage(
                    "Error loading data. Please try again later or choose another trip."
                  );
                }
              }
              setIsLoading(true);
            })
            .catch((e) => {
              setLoadingMessage(
                "Error loading data. Please try again later or choose another trip."
              );
            });
        });
    };

    fetchData();
    setInterval(fetchData, 30000);
  }, [agency, tripID]);

  console.log(trip);

  return (
    <>
      <h1>
        {agencies[agency].name} {agencies[agency].type} Tracker
      </h1>
      <Meta />

      {isLoading ? null : (
        <div
          className='trainInfo'
          style={{
            backgroundColor: `#${trip.lineColor}`,
            color: `#${trip.lineTextColor}`,
          }}
        >
          <h2>
            {trip.line} #{tripID}
          </h2>
          <p>
            As of{" "}
            {new Date(lastFetched).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {trip.extra && trip.extra.cap
              ? ` | ${Math.ceil(
                  (trip.extra.load / trip.extra.cap) * 100
                )}% Full`
              : null}
          </p>
          <p>
            Service to{" "}
            {trip.dest ??
              trip.predictions[trip.predictions.length - 1].stationName}
          </p>
        </div>
      )}
      <div className='trains'>
        {isLoading ? (
          <p>{loadingMessage}</p>
        ) : (
          trip.predictions.map((stop, i) => {
            console.log(stop);
            return (
              <Link
                to={`/${agency}/stops/${stop.stationID}`}
                className='train'
                key={`${stop.stationID}-${i}`}
                style={{
                  backgroundColor: "#444",
                  color: "#fff",
                }}
              >
                <p>
                  <strong>{stop.stationName}</strong>
                </p>
                {stop.noETA ? (
                  <span>
                    <h3>No ETA</h3>
                  </span>
                ) : (
                  <span>
                    <h3>{hoursMinutesUntilArrival(stop.actualETA)}</h3>
                    <p
                      style={{
                        fontSize: "0.8em",
                      }}
                    >
                      {timeFormat(stop.actualETA)}
                    </p>
                  </span>
                )}
              </Link>
            );
          })
        )}
        {!isLoading && trip.predictions.length === 0 ? (
          <>
            <div
              className='train'
              style={{
                backgroundColor: "#444",
              }}
            >
              <p>
                <strong>No Predictions available :c</strong>
              </p>
            </div>
          </>
        ) : null}
        <h3
          className='train'
          key='backButton'
          style={{
            backgroundColor: agencies[agency].color,
            color: agencies[agency].textColor,
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
          Choose Another {agencies[agency].type}
        </h3>
        <h3
          className='train'
          key='viewMap'
          style={{
            backgroundColor: agencies[agency].color,
            color: agencies[agency].textColor,
            padding: "8px",
            textDecoration: "none",
          }}
        >
          <Link
            to={`/${agency}/map?route=${trip.lineCode}`}
            style={{
              textDecoration: "none",
            }}
          >
            View on Map
          </Link>
        </h3>
      </div>
    </>
  );
};

export default Trip;
