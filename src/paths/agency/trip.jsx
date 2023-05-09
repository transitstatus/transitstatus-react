import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const agencies = {
  BART: {
    name: "Bay Area Rapid Transit",
    endpoint: "bart",
    color: "#0099d8",
    textColor: "#ffffff",
  },
  Metra: {
    name: "Metra",
    endpoint: "metra",
    color: "#005195",
    textColor: "#ffffff",
  },
  LIRR: {
    name: "Long Island Rail Road",
    endpoint: "lirr",
    color: "#0f61a9",
    textColor: "#ffffff",
  },
  "NYC Subway": {
    name: "New York City Subway",
    endpoint: "nyct_subway",
    color: "#0f61a9",
    textColor: "#ffffff",
  },
};

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

const Trip = () => {
  const { agency, tripID } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState({});
  const [stations, setStations] = useState({});
  const [loadingMessage, setLoadingMessage] = useState("Loading trip...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      const trackingResponse = await fetch(
        `https://macro.transitstat.us/${agencies[agency].endpoint}/vehicles/${tripID}`
      );
      const stationsResponse = await fetch(
        `https://gtfs.piemadd.com/data/${agencies[agency].endpoint}/stops.json`
      );

      const dataResponse = await trackingResponse.json();
      const stationsData = await stationsResponse.json();

      setTrip(dataResponse);
      setStations(stationsData);

      console.log(dataResponse);

      setIsLoading(false);
      setTimeout(() => fetchVehicles, 60000);
    };

    fetchVehicles();
  }, [agency, tripID]);

  return (
    <>
      <h1>Transitstat.us {agency} Tracker</h1>
      <p>Open source, free, and easy transit tracker.</p>
      <p>v0.0.3 Beta</p>
      <p>Heads up: this shit will probably break!</p>
      <h2
        style={{
          marginTop: "4px",
          marginBottom: "8px",
        }}
      >
        {isLoading ? (
          "Loading trip..."
        ) : (
          <>
            {trip.routeShortName} Trip {trip.tripID} to{" "}
            {trip.routeLongName.split(" to ")[1]}
          </>
        )}
      </h2>
      <div className='trains'>
        {isLoading ? (
          <p>{loadingMessage}</p>
        ) : (
          trip.stops.map((stop) => {
            console.log(stop);
            return (
              <Link
                to={`/${agency}/stops/${stop.stopID}`}
                className='train'
                key={stop.stopID}
                style={{
                  backgroundColor: `#${trip.routeColor}`,
                  color: `#${trip.routeTextColor}`,
                }}
              >
                <p>{stations[stop.stopID].stopName}</p>
                <h3>{hoursMinutesUntilArrival(Math.max(stop.arr.low, stop.arr.high) * 1000)}</h3>
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
            marginTop: "16px",
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

export default Trip;
