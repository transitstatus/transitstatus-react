import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { agencies } from "../../config";
import Meta from "../../components/meta";
//import LineHeart from "../../components/hearts/lineHeart";
import { DataManager } from "../../dataManager";
import Oneko from "../../components/extras/oneko";

const Line = () => {
  const { agency, lineName } = useParams();
  const [line, setLine] = useState({});
  const [stations, setStations] = useState({});
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dataManager = useMemo(() => new DataManager(), []);

  document.title = `${line.lineNameLong} ${agencies[agency].name} | Transitstat.us`;

  useEffect(() => {
    const fetchData = async () => {
      const linesData = await dataManager.getData(agency, "lines");
      const stationsData = await dataManager.getData(agency, "stations");

      if (linesData.shitsFucked) {
        setLoadingMessage(data.shitsFuckedMessage);
      }

      if (
        Object.keys(linesData).length === 0 ||
        Object.keys(stationsData).length === 0
      ) {
        try {
          const shitsFucked = await dataManager.getData(agency, "shitsFucked");

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
      <Oneko />
      <h1>
        {agencies[agency].name} {agencies[agency].type} Tracker
      </h1>
      <Meta />
      <div className='stations'>
        {isLoading ? (
          <h2>Loading line...</h2>
        ) : (
          <div
            style={{
              marginTop: "4px",
              padding: "8px 8px",
              backgroundColor: `#${line.routeColor}`,
              color: `#${line.routeTextColor}`,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                marginTop: 0,
              }}
            >
              {line.lineNameLong}{" "}
              {line.lineNameShort.length > 0 &&
              agencies[agency].addShortName &&
              line.lineNameShort !== line.lineNameLong
                ? `(${line.lineNameShort})`
                : ""}
            </h2>
            {/*}
            <LineHeart
              agency={agency}
              line={line}
              style={{
                width: "26px",
              }}
            />
            {*/}
          </div>
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
          <Link
            to={`/${agency}/map?route=${lineName}`}
            style={{
              color: agencies[agency].textColor,
            }}
          >
            View on Map
          </Link>
        </h3>
      </div>
    </>
  );
};

export default Line;
