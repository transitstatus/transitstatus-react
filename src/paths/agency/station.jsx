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

  if (minutes < 1) return "Due";
  if (hours === 0) return `${minutes % 60}m`;
  if (minutes % 60 === 0) return `${hours}h`;

  return `${hours}h ${minutes % 60}m`;
};

const Station = () => {
  const { agency, stopID } = useParams();
  const navigate = useNavigate();
  const [station, setStation] = useState({});
  const [stopInfo, setStopInfo] = useState({});
  const [trainDestinations, setTrainDestinations] = useState({});
  const [loadingMessage, setLoadingMessage] = useState("Loading trains...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      const trackingResponse = await fetch(
        `https://macro.transitstat.us/${agencies[agency].endpoint}/stations/${stopID}`
      );
      const stopInfoResponse = await fetch(
        `https://gtfs.piemadd.com/data/${agencies[agency].endpoint}/stops.json`
      );

      const trackingData = await trackingResponse.json();
      const stopInfoData = await stopInfoResponse.json();

      let destinations = {};

      trackingData.upcomingTrains.forEach((vehicle) => {
        const destination = vehicle.finalStop;
        destinations[destination] = destinations[destination] ?? [];
        destinations[destination].push(vehicle);
      });

      setTrainDestinations(destinations);
      setStation(trackingData);
      setStopInfo(stopInfoData);

      setIsLoading(false);
      setTimeout(() => fetchVehicles, 60000);
    };

    fetchVehicles();
  }, [agency, stopID]);

  return (
    <>
      <h1>Transitstat.us {agency} Tracker</h1>
      <p>Open source, free, and easy transit tracker.</p>
      <p>v0.0.2 Beta</p>
      <p>Heads up: this shit will probably break!</p>
      <h2
        style={{
          marginTop: "4px",
          marginBottom: "8px",
        }}
      >
        {station.name}
      </h2>
      <div>
        {isLoading ? (
          <p>{loadingMessage}</p>
        ) : (
          Object.keys(trainDestinations)
            .sort()
            .map((destination) => {
              return (
                <div key={destination} className='trains'>
                  <h3 className='destination'>
                    {stopInfo[destination].stopName}
                  </h3>
                  {trainDestinations[destination].length > 0 ? (
                    trainDestinations[destination]
                      .sort((a, b) => {
                        if (!a.arr) return -1;
                        if (!b.arr) return 1;
                        return (
                          Math.max(a.arr.low, a.arr.high) -
                          Math.max(b.arr.low, b.arr.high)
                        );
                      })
                      .map((train) => {
                        if (!train.arr) return null;

                        const arr =
                          Math.max(train.arr.low, train.arr.high) * 1000;
                        const now = new Date().valueOf();

                        return now - arr < 300000 ? (
                          <Link
                            to={`/${agency}/track/${train.tripID}`}
                            key={train.tripID}
                            className='trainLink '
                          >
                            <div
                              className='train '
                              style={{
                                backgroundColor: `#${train.routeColor}`,
                                color: `#${train.routeTextColor}`,
                              }}
                            >
                              <span>
                                <p>{train.routeShortName} to</p>
                                <h3>
                                  {stopInfo[train.finalStop]
                                    ? stopInfo[train.finalStop].stopName
                                    : train.routeLongName}
                                </h3>
                              </span>
                              <span>
                                <h3>{hoursMinutesUntilArrival(arr)}</h3>
                              </span>
                            </div>
                          </Link>
                        ) : null;
                      })
                  ) : (
                    <p>{trainDestinations[destination].length}</p>
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
          Choose Another Train
        </h3>
      </div>
    </>
  );
};

export default Station;
