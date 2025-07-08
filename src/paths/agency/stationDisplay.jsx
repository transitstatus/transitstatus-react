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

const StationDisplay = () => {
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
    };

    fetchData();
    setInterval(fetchData, 5000);
  }, [agency, stopID]);

  if (station === "Not found") {
    document.title = `Stop 404 ${agencyMeta.name} | Transitstat.us`;
    return (
      <main>
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

  document.title = `${station.stationName} ${agencyMeta.name} | Transitstat.us`;

  return (
    <div className="stationDisplayPage">
      <div className='trains trainsDisplay'>
        <h3 className='train' style={{ backgroundColor: '#333', gridColumn: '1 / 3'}}>{agencyMeta.name} {station.stationName}</h3>
        <p className='train' style={{ backgroundColor: '#333', gridColumn: '3 / 5' }}>Last Updated {new Date(lastFetched).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", })}</p>
        <p className='train' style={{ backgroundColor: '#333', gridColumn: '5 / 7' }}>Transitstat.us &copy; Piero 2025</p>
        <h3 className='train' style={{ backgroundColor: agencyMeta.color, color: agencyMeta.textColor }}>Line</h3>
        <h3 className='train' style={{ backgroundColor: agencyMeta.color, color: agencyMeta.textColor }}>Train No.</h3>
        <h3 className='train' style={{ backgroundColor: agencyMeta.color, color: agencyMeta.textColor }}>Destination</h3>
        <h3 className='train' style={{ backgroundColor: agencyMeta.color, color: agencyMeta.textColor }}>Status</h3>
        <h3 className='train' style={{ backgroundColor: agencyMeta.color, color: agencyMeta.textColor }}>Time</h3>
        <h3 className='train' style={{ backgroundColor: agencyMeta.color, color: agencyMeta.textColor }}>Countdown</h3>
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
            .flatMap((destination) => station.destinations[destination].trains.map((train) => {
              return {
                ...train,
                destination: train.destination ?? destination,
              }
            }))
            .sort((a, b) => {
              if (!a.actualETA) return -1;
              if (!b.actualETA) return 1;
              return a.actualETA - b.actualETA;
            })
            .filter((eta) => eta.actualETA >= Date.now() - (1000 * 60 * 5) || eta.noETA)
            .map((train) => {
              return (
                <>
                  <div
                    className='train'
                    style={{
                      background: train.extra?.holidayChristmas ? "repeating-linear-gradient(135deg, #94000a, #94000a 10px, #077001 10px, #077001 20px)" : `#${train.lineColor}`,
                      color: train.extra?.holidayChristmas ? '#ffffff' : `#${train.lineTextColor}`,
                      filter: train.extra?.holidayChristmas ? 'drop-shadow(0px 0px 2px #000000)' : null,
                    }}
                  >
                    <h3>
                      {agencyMeta.useCodeForShortName
                        ? train.lineCode
                        : train.line}
                    </h3>
                  </div>
                  <div
                    className='train'
                    style={{
                      background: train.extra?.holidayChristmas ? "repeating-linear-gradient(135deg, #94000a, #94000a 10px, #077001 10px, #077001 20px)" : `#${train.lineColor}`,
                      color: train.extra?.holidayChristmas ? '#ffffff' : `#${train.lineTextColor}`,
                      filter: train.extra?.holidayChristmas ? 'drop-shadow(0px 0px 2px #000000)' : null,
                    }}
                  >
                    {train.realTime || (agencyMeta.showTripIDOnScheduled && !train.realTime) ? agencyMeta.tripIDPrefixOnDisplay : ""}
                    {train.realTime || (agencyMeta.showTripIDOnScheduled && !train.realTime) ? (agencyMeta.runNumberConverter ? agencyMeta.runNumberConverter(train.runNumber) : train.runNumber) : ""}{train.extra?.holidayChristmas ? " 🎄" : ""}
                  </div>
                  <div
                    className='train'
                    style={{
                      background: train.extra?.holidayChristmas ? "repeating-linear-gradient(135deg, #94000a, #94000a 10px, #077001 10px, #077001 20px)" : `#${train.lineColor}`,
                      color: train.extra?.holidayChristmas ? '#ffffff' : `#${train.lineTextColor}`,
                      filter: train.extra?.holidayChristmas ? 'drop-shadow(0px 0px 2px #000000)' : null,
                    }}
                  >
                    <h3>
                      {train.destination ?? train.routeLongName}
                    </h3>
                  </div>
                  <div
                    className='train'
                    style={{
                      background: train.extra?.holidayChristmas ? "repeating-linear-gradient(135deg, #94000a, #94000a 10px, #077001 10px, #077001 20px)" : `#${train.lineColor}`,
                      color: train.extra?.holidayChristmas ? '#ffffff' : `#${train.lineTextColor}`,
                      filter: train.extra?.holidayChristmas ? 'drop-shadow(0px 0px 2px #000000)' : null,
                    }}
                  >
                    {train.realTime ? 'Realtime' : 'Scheduled'}
                  </div>
                  <div
                    className='train'
                    style={{
                      background: train.extra?.holidayChristmas ? "repeating-linear-gradient(135deg, #94000a, #94000a 10px, #077001 10px, #077001 20px)" : `#${train.lineColor}`,
                      color: train.extra?.holidayChristmas ? '#ffffff' : `#${train.lineTextColor}`,
                      filter: train.extra?.holidayChristmas ? 'drop-shadow(0px 0px 2px #000000)' : null,
                    }}
                  >
                    {!train.noETA ? <p className='trainLink'>{timeFormat(train.actualETA)}</p> : <h3 className='trainLink'>No ETA</h3>}
                  </div>
                  <div
                    className='train'
                    style={{
                      background: train.extra?.holidayChristmas ? "repeating-linear-gradient(135deg, #94000a, #94000a 10px, #077001 10px, #077001 20px)" : `#${train.lineColor}`,
                      color: train.extra?.holidayChristmas ? '#ffffff' : `#${train.lineTextColor}`,
                      filter: train.extra?.holidayChristmas ? 'drop-shadow(0px 0px 2px #000000)' : null,
                    }}
                  >
                    {!train.noETA ?
                      <h3 className='trainLink' style={{
                        textAlign: 'right',
                        display: 'inline'
                      }}>
                        {hoursMinutesUntilArrival(
                          train.actualETA
                        )}
                      </h3> : null}
                  </div>
                </>
              );
            })
        )
        }
      </div >
    </div>
  );
};

export default StationDisplay;
