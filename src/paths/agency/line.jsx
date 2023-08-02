import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { agencies, config } from "../../config";

const Line = () => {
  const { agency, lineName } = useParams();
  const [lines, setLines] = useState({});
  const [line, setLine] = useState({});
  const [stations, setStations] = useState({});
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const linesReq = await fetch(`${agencies[agency].endpoint}/lines`);
      const stationsReq = await fetch(`${agencies[agency].endpoint}/stations`);

      const linesData = await linesReq.json();
      const stationsData = await stationsReq.json();

      setLine(linesData[lineName]);
      setStations(stationsData);

      setIsLoading(false);
    };

    fetchData();
  }, [agency, lineName]);

  console.log(line);
  console.log(stations);

  return (
    <>
      <h1>{agencies[agency].name} Tracker</h1>
      <p>by Transitstat.us</p>
      <p>{config.tagLine}</p>
      <p>{config.version}</p>
      {config.additionalWarnings.map((warning, i) => {
        return <p key={i}>{warning}</p>;
      })}
      <div className='stations'>
        {isLoading ? (
          <h2>Loading line...</h2>
        ) : (
          <h2
            style={{
              marginTop: "4px",
              padding: "2px 6px",
              backgroundColor: `#${line.routeColor}`,
              color: `#${line.routeTextColor}`,
            }}
          >
            {line.lineNameLong} {line.lineNameShort ? `(${line.lineNameShort})` : ""}
          </h2>
        )}
        <h3
          className='route'
          key='backButton'
          style={{
            backgroundColor: agencies[agency].color,
            color: agencies[agency].textColor,
            fontSize: "1.3rem",
            padding: "8px",
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
        ) : line.stations.length > 0 ? (
          line.stations
            .sort((a, b) => {
              console.log(stations);
              console.log(a);
              console.log(stations[a]);

              const aName = stations[a].stationName;
              const bName = stations[b].stationName;

              const aNum = parseInt(aName);
              const bNum = parseInt(bName);

              if (isNaN(aNum) && isNaN(bNum)) return aName.localeCompare(bName);

              if (isNaN(aNum)) return 1;
              if (isNaN(bNum)) return -1;

              return aNum - bNum;
            })
            .map((stationKey) => {
              const station = stations[stationKey];
              return (
                <h3 key={station.stationID}>
                  <Link
                    to={`/${agency}/stops/${station.stationID}`}
                    className='station'
                    style={{
                      fontSize: "1.3rem",
                      padding: "8px",
                    }}
                  >
                    {station.stationName}
                  </Link>
                </h3>
              );
            })
        ) : (
          <p>No stations have trains tracking for this line currently.</p>
        )}
      </div>
    </>
  );
};

export default Line;
