import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { agencies, config } from "../../config";

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

  useEffect(() => {
    const fetchData = () => {
      fetch(`${agencies[agency].endpoint}/trains/${tripID}`)
        .then((response) => response.json())
        .then((data) => {
          setTrip(data);
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
  }, [agency, tripID]);

  return (
    <>
      <h1>
        {agencies[agency].name} {agencies[agency].type} Tracker
      </h1>
      <p>by Transitstat.us</p>
      <p>{config.tagLine}</p>
      <p>{config.version}</p>
      {config.additionalWarnings.map((warning, i) => {
        return <p key={i}>{warning}</p>;
      })}

      {isLoading ? (
        <p>Loading trip...</p>
      ) : (
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
            {new Date(
              trip.predictions[0].actualETA - trip.predictions[0].eta * 60000
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
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
                <span>
                  <h3>{hoursMinutesUntilArrival(stop.actualETA)}</h3>
                  <p style={{
                    fontSize: "0.8em",
                  }}>{timeFormat(stop.actualETA)}</p>
                </span>
              </Link>
            );
          })
        )}
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
          Choose Another Train
        </h3>
      </div>
    </>
  );
};

export default Trip;
