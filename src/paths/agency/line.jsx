import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { agencies } from "../../config";
import Meta from "../../components/meta";
import Oneko from "../../components/extras/oneko";
import AgencyHeart from "../../components/hearts/agencyHeart";
import FavoritedStation from "../../components/favorites/favoritedStation";
import AlertsList from "../../components/alerts/alertsList";

const Line = ({ lineOverride = null }) => {
  const { agency, urlLineName } = useParams();
  const lineName = lineOverride ?? urlLineName;
  const [line, setLine] = useState({});
  const [stations, setStations] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");
  const [isLoading, setIsLoading] = useState(true);
  const [runNumber, setRunNumber] = useState("");
  const navigate = useNavigate();

  document.title = `${agencies[agency].name} ${agencies[agency].onlyUseSingleRouteCode ? agencies[agency].type : line.lineNameLong} Tracker | Transitstat.us`;

  const favoriteStations = useMemo(() => {
    const results =
      JSON.parse(localStorage.getItem("favorites-transitstatus-v0")) || {};

    Object.keys(results).forEach((key) => {
      if (key.split("-")[0] != agency) {
        delete results[key];
      }
    });

    return results;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const linesData = await window.dataManager.getData(agency, "lines");
      const stationsData = await window.dataManager.getData(agency, "stations");
      const alertsData = await window.dataManager.getData(agency, "alerts");

      if (linesData.shitsFucked) {
        setLoadingMessage(data.shitsFuckedMessage);
      }

      if (
        Object.keys(linesData).length === 0 ||
        Object.keys(stationsData).length === 0
      ) {
        try {
          const shitsFucked = await window.dataManager.getData(agency, "shitsFucked");

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
      if (alertsData && alertsData != 'Not found') setAlerts(alertsData);

      setIsLoading(false);
    };

    fetchData();
  }, [agency, lineName]);

  if (line === "Not found" || line === undefined) {
    document.title = `Line 404 ${agencies[agency].name} | Transitstat.us`;
    return (
      <main>
        <Oneko />
        <h1>Line Not Found</h1>
        <p>
          The line you were trying to view doesn't exist. Please go back and try
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
          Choose Another Line
        </h3>
      </main>
    );
  }

  return (
    <main>
      <Oneko />
      <h1>
        {agencies[agency].name} {agencies[agency].type} Tracker
      </h1>
      <Meta />
      <div className='stations'>
        {isLoading ? (
          <h2>Loading line...</h2>
        ) : <div
          style={{
            marginTop: "4px",
            padding: "8px 8px",
            backgroundColor: `#${line.routeColor}`,
            color: `#${line.routeTextColor}`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {agencies[agency].onlyUseSingleRouteCode ?
            <>
              <h2 style={{ marginTop: 0 }}>
                {agencies[agency].name} {agencies[agency].type} Tracker
              </h2>
              <AgencyHeart
                agency={agency}
                style={{
                  width: "26px",
                }}
              />
            </> : <h2 style={{ marginTop: 0 }}>
              {line.lineNameLong}{" "}
              {line.lineNameShort.length > 0 &&
                agencies[agency].addShortName &&
                line.lineNameShort != line.lineNameLong
                ? `(${line.lineNameShort})`
                : ""}
            </h2>
          }
        </div>
        }
        <AlertsList alertsArray={alerts} agency={agency} filterType={'line'} filterID={lineName} style={{ marginBottom: '4px', marginTop: '-4px' }} />
        {agencies[agency].onlyUseSingleRouteCode ?
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
                navigate('', { replace: true }); //fallback
              }
            }}
          >
            Choose Another Agency
          </h3> :
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
        }
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

        {agencies[agency].onlyUseSingleRouteCode ?
          <>
            <div>
              <h2
                style={{
                  marginTop: "4px",
                  marginBottom: "-4px",
                  color: agencies[agency].textColor,
                  backgroundColor: agencies[agency].color,
                  maxWidth: "384px",
                  padding: "4px 8px",
                }}
              >
                Track a {agencies[agency].type} by Number
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  maxWidth: "400px",
                  gap: "4px",
                  marginTop: "8px",
                }}
              >
                <input
                  type='text'
                  placeholder={`Run/${agencies[agency].type} Number`}
                  value={runNumber}
                  onChange={(e) => setRunNumber(e.target.value)}
                  style={{
                    fontSize: "1rem",
                    padding: "4px 8px",
                    color: "#fff",
                    backgroundColor: "#444",
                    flex: 1,
                    border: "2px solid #555",
                  }}
                ></input>
                <h3
                  className='route'
                  key='onMap'
                  style={{
                    backgroundColor: "#444",
                    color: "#fff",
                    fontSize: "1.3rem",
                    padding: "8px",
                  }}
                >
                  <Link
                    to={runNumber.length > 0 ? `/${agency}/track/${runNumber}` : ""}
                    style={{
                      color: "#fff",
                    }}
                  >
                    Track {agencies[agency].type}
                  </Link>
                </h3>
              </div>
            </div>
            <div>
              <h2
                style={{
                  marginTop: "4px",
                  marginBottom: "-4px",
                  color: agencies[agency].textColor,
                  backgroundColor: agencies[agency].color,
                  maxWidth: "384px",
                  padding: "4px 8px",
                }}
              >
                Favorite Stops
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "400px",
                  gap: "4px",
                  marginTop: "8px",
                }}
              >
                {Object.keys(favoriteStations).length === 0 ? (
                  <p
                    style={{
                      fontSize: "1rem",
                      padding: "4px 8px",
                      color: "#fff",
                      backgroundColor: "#444",
                    }}
                  >
                    No favorite stops yet.
                  </p>
                ) : (
                  <>
                    {Object.keys(favoriteStations)
                      .sort()
                      .map((favKey) => {
                        const fav = favoriteStations[favKey];

                        return (
                          <FavoritedStation
                            agency={favKey.split("-")[0]}
                            station={fav}
                            key={favKey}
                            style={{
                              backgroundColor: "#444",
                              color: "#fff",
                            }}
                          />
                        );
                      })}
                  </>
                )}
              </div>
            </div>
          </> : null}

        <div>
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
              to={agencies[agency].dontFilterMapLines ? `/${agency}/map` : `/${agency}/map?route=${lineName}`}
              style={{
                color: agencies[agency].textColor,
              }}
            >
              View on a Map
            </Link>
          </h3>
        </div>
      </div>
    </main>
  );
};

export default Line;
