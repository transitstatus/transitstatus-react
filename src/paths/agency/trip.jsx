import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { agencies } from "../../config";
import Meta from "../../components/meta";
import Oneko from "../../components/extras/oneko";
import PieroSnowfall from "../../components/snowFall";
import { hoursMinutesUntilArrival } from "../../components/extras/randomTools";

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
  const [loadingMessage, setLoadingMessage] = useState("Loading trip...");
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState(0);
  const [activateSnowfall, setActivateSnowfall] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      window.dataManager
        .getData(agency, `trains/${tripID}`)
        .then((data) => {
          setTrip(data);
          if (data.extra?.holidayChristmas && !activateSnowfall) setActivateSnowfall(true);
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
    setInterval(fetchData, 5000);
  }, [agency, tripID]);

  if (trip === "Not found") {
    document.title = `Trip 404 ${agencies[agency].name} | Transitstat.us`;

    return (
      <main>
        <Oneko />
        {activateSnowfall ? <PieroSnowfall /> : null}
        <h1>Trip Not Found</h1>
        <p>
          The trip you were trying to track doesn't exist. Please go back and
          try again.
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
          Choose Another Trip
        </h3>
      </main>
    );
  }

  document.title = `${trip.line} ${agencies[agency].tripIDPrefix}${agencies[agency].runNumberConverter ? agencies[agency].runNumberConverter(tripID) : tripID} ${agencies[agency].name} | Transitstat.us`;

  return (
    <main>
      <Oneko />
      {activateSnowfall ? <PieroSnowfall /> : null}
      <h1>
        {agencies[agency].name} {agencies[agency].type} Tracker
      </h1>
      <Meta />

      {isLoading ? null : (
        <div
          className='trainInfo'
          style={{
            background: trip.extra?.holidayChristmas ? "repeating-linear-gradient(135deg, #94000a, #94000a 10px, #077001 10px, #077001 20px)" : `#${trip.lineColor}`,
            color: trip.extra?.holidayChristmas ? '#ffffff' : `#${trip.lineTextColor}`,
            marginTop: "12px",
            textShadow: trip.extra?.holidayChristmas ? '0px 0px 2px #000000' : null
          }}
        >
          <h2>
            {trip.line}
            {agencies[agency].addLine ? " Line " : " "}
            {agencies[agency].tripIDPrefix}
            {agencies[agency].runNumberConverter ? agencies[agency].runNumberConverter(tripID) : tripID}
            {trip.extra?.holidayChristmas ? " 🎄" : ""}
          </h2>
          {trip.realTime ? <p>
            As of{" "}
            {new Date(lastFetched).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
            {trip.extra && trip.extra.cap
              ? ` | ${Math.ceil(
                (trip.extra.load / trip.extra.cap) * 100
              )}% Full`
              : null}
          </p> : <p>Scheduled, Not Yet Tracking</p>}

          {trip.extra && trip.extra.info ? <p>{trip.extra.info}</p> : null}
          <p>
            Service to{" "}
            {trip.dest ??
              trip.predictions[trip.predictions.length - 1].stationName}
            {trip.extra && trip.extra.cabCar
              ? ` | Car ${trip.extra.cabCar}`
              : null}
            {trip.extra && trip.extra.engine
              ? ` | Engine ${trip.extra.engine}`
              : null}
          </p>
        </div>
      )}
      <div className='trains'>
        {isLoading ? (
          <p
            style={{
              marginTop: "12px",
              marginBottom: "2px",
              marginLeft: "2px",
            }}
          >
            {loadingMessage}
          </p>
        ) : (
          trip.predictions.filter((eta) => eta.actualETA >= Date.now() - (1000 * 60 * 5) || eta.noETA).map((stop, i) => {
            //console.log(stop);
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
                    <h3 style={{
                      textAlign: 'right'
                    }}>{hoursMinutesUntilArrival(stop.actualETA)}</h3>
                    <p
                      style={{
                        fontSize: "0.8em",
                        whiteSpace: "nowrap",
                        textAlign: 'right'
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
                <strong>No Predictions available</strong>
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
            to={agencies[agency].dontFilterMapLines ? `/${agency}/map` : `/${agency}/map?route=${trip.lineCode}`}
            style={{
              textDecoration: "none",
              color: agencies[agency].textColor,
            }}
          >
            View on Map
          </Link>
        </h3>
      </div>
    </main>
  );
};

export default Trip;
