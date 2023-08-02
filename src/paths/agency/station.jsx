import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { agencies, config } from "../../config";

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

const Station = () => {
  const { agency, stopID } = useParams();
  const navigate = useNavigate();
  const [station, setStation] = useState({});
  const [loadingMessage, setLoadingMessage] = useState("Loading trains...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${agencies[agency].endpoint}/stations/${stopID}`)
        .then((response) => response.json())
        .then((data) => {
          setStation(data);
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
      <h1>{agencies[agency].name} {agencies[agency].type} Tracker</h1>
      <p>by Transitstat.us</p>
      <p>{config.tagLine}</p>
      <p>{config.version}</p>
      {config.additionalWarnings.map((warning, i) => {
        return <p key={i}>{warning}</p>;
      })}
      <h2
        style={{
          marginTop: "4px",
          marginBottom: "8px",
        }}
      >
        {station.stationName}
      </h2>
      <div>
        {isLoading ? (
          <p>{loadingMessage}</p>
        ) : (
          Object.keys(station.destinations)
            .sort((a, b) => {
              if (a === station.stationName) return 1;
              if (b === station.stationName) return -1;

              return a.localeCompare(b);
            })
            .map((destinationKey) => {
              return (
                <>
                  {station.destinations[destinationKey].trains.length > 0 ? (
                    <div key={destinationKey} className='trains'>
                      <h3 className='destination'>{destinationKey}</h3>
                      {station.destinations[destinationKey].trains
                        .sort((a, b) => {
                          if (!a.eta) return -1;
                          if (!b.eta) return 1;
                          return a.eta - b.eta;
                        })
                        .map((train) => {
                          console.log(train);

                          return (
                            <Link
                              to={`/${agency}/track/${train.runNumber}`}
                              key={train.runNumber}
                              className='trainLink '
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
                                  <h3>
                                    {hoursMinutesUntilArrival(train.actualETA)}
                                  </h3>
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  ) : null}
                </>
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
