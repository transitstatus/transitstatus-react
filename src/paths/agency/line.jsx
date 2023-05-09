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

const Line = () => {
  const { agency, lineName } = useParams();
  const [stations, setStations] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await fetch(
        `https://macro.transitstat.us/${agencies[agency].endpoint}/stations`
      );

      const data = await response.json();

      let stationData = [];
      Object.values(data).forEach((station) => {
        const stationLines = station.upcomingTrains.map(
          (train) => train.routeShortName
        );

        if (stationLines.includes(lineName)) {
          stationData.push({
            name: station.name,
            stationID: station.stationID,
          });
        }
      });

      setStations(
        stationData.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      );
      setIsLoading(false);
      //don't need to re-fetch data as we only need the station names
      //setTimeout(() => fetchVehicles, 60000);
    };

    fetchVehicles();
  }, [agency]);

  return (
    <>
      <h1>Transitstat.us {agency} Tracker</h1>
      <p>Open source, free, and easy transit tracker.</p>
      <p>v0.0.3 Beta</p>
      <p>Heads up: this shit will probably break!</p>
      <h2
        style={{
          marginTop: "4px",
        }}
      >
        {lineName} Line Stations
      </h2>
      <p>
        Choose the station you would like to track a {agencies[agency].type}{" "}
        for:
      </p>
      <div className='stations'>
        <h3
          className='route'
          key='backButton'
          style={{
            backgroundColor: agencies[agency].color,
            color: agencies[agency].textColor,
          }}
          onClick={() => {
            if (history.state.idx && history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate(`/${agency}`, { replace: true }); //fallback
            }
          }}
        >
          Choose Another Line
        </h3>
        {isLoading ? (
          <p>{loadingMessage}</p>
        ) : stations.length > 0 ? (
          stations.map((station) => (
            <h3 key={station.name}>
              <Link
                to={`/${agency}/stops/${station.stationID}`}
                className='station'
              >
                {station.name}
              </Link>
            </h3>
          ))
        ) : (
          <p>No stations have trains tracking for this line currently.</p>
        )}
      </div>
    </>
  );
};

export default Line;
