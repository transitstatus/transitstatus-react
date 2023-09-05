import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { agencies, config } from "../../config";
import Meta from "../../components/meta";

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

      if (linesData.shitsFucked) {
        setLoadingMessage(data.shitsFuckedMessage);
      }

      if (
        Object.keys(linesData).length === 0 ||
        Object.keys(stationsData).length === 0
      ) {
        try {
          const shitsFuckedReq = await fetch(
            `${agencies[agency].endpoint}/shitsFucked`
          );
          const shitsFucked = await shitsFuckedReq.json();

          if (shitsFucked.shitIsFucked) {
            setLoadingMessage(shitsFucked.message);
            setIsLoading(true);
            return;
          }
        } catch (e) {
          console.log("ig its just meant to be that way??");
        }
      }

      setLine(linesData[lineName]);
      setStations(stationsData);

      setIsLoading(false);
    };

    fetchData();
  }, [agency, lineName]);

  return (
    <>
      <h1>
        {agencies[agency].name} {agencies[agency].type} Tracker
      </h1>
      <Meta />
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
            {line.lineNameLong}{" "}
            {line.lineNameShort ? `(${line.lineNameShort})` : ""}
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
          <p>
            No stations have {agencies[agency].typeCodePlural} tracking for this
            line currently.
          </p>
        )}
        <h3
          className='route'
          key='viewMap'
          style={{
            backgroundColor: agencies[agency].color,
            color: agencies[agency].textColor,
            fontSize: "1.3rem",
            padding: "8px",
          }}
        >
          <Link to={`/${agency}/map?route=${lineName}`}>View on Map</Link>
        </h3>
      </div>
    </>
  );
};

export default Line;
