import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { agencies } from "../../config";
import StationHeart from "../../components/hearts/stationHeart";
import Meta from "../../components/meta";
import { DataManager } from "../../dataManager";
import Oneko from "../../components/extras/oneko";
import StationETAs from "../../components/agency/stationETAs";

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
  const dataManager = useMemo(() => new DataManager(), []);
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
                <StationETAs
                  key={destinationKey}
                  destinationKey={destinationKey}
                  station={station}
                  agency={agency}
                  stopID={stopID}
                />
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
