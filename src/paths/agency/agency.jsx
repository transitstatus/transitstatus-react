import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { agencies } from "../../config";
import { DataManager } from "../../dataManager";
import Meta from "../../components/meta";
import AgencyHeart from "../../components/hearts/agencyHeart";
import FavoritedStation from "../../components/favorites/favoritedStation";

const Agency = () => {
  const { agency } = useParams();
  const navigate = useNavigate();
  const dataManager = new DataManager();
  const [lines, setLines] = useState({});
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");
  const [isLoading, setIsLoading] = useState(true);

  const favoriteStations = useMemo(() => {
    const results =
      JSON.parse(localStorage.getItem("favorites-transitstatus-v0")) || {};

    Object.keys(results).forEach((key) => {
      if (key.split("-")[0] !== agency) {
        delete results[key];
      }
    });

    return results;
  }, []);

  document.title = `${agencies[agency].name} | Transitstat.us`;

  if (!agencies[agency]) {
    return (
      <>
        <h1>Agency Not Found</h1>
        <p>
          The agency you are looking for does not exist. Please choose another
          agency.
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
              navigate("/", { replace: true }); //fallback
            }
          }}
        >
          Choose Another Agency
        </h3>
      </>
    );
  }

  useEffect(() => {
    const fetchData = () => {
      dataManager
        .getData(agency, "lines")
        .then((data) => {
          setLines(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);

          dataManager.getData(agency, "shitsFucked").then((shitsFucked) => {
            if (shitsFucked.shitIsFucked) {
              setLoadingMessage(shitsFucked.message);
            } else {
              setLoadingMessage(
                "Error loading data. Please try again later or choose another agency."
              );
            }
            setIsLoading(true);
          });
        });
    };

    fetchData();
    //setInterval(fetchData, 10000);
    //dont need to refetch lines
  }, [agency]);

  return (
    <>
      <h1>
        {agencies[agency].name} {agencies[agency].type} Tracker
      </h1>
      <Meta />
      <div className='routes'>
        <div
          style={{
            marginTop: "4px",
            padding: "8px 8px",
            backgroundColor: agencies[agency].color,
            color: agencies[agency].textColor,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2
            style={{
              marginTop: 0,
            }}
          >
            {agencies[agency].name} Routes
          </h2>
          <AgencyHeart
            agency={agency}
            style={{
              width: "26px",
            }}
          />
        </div>
        {isLoading ? (
          <p>{loadingMessage}</p>
        ) : (
          Object.keys(lines)
            .sort((a, b) => {
              const aName = lines[a].lineNameLong;
              const bName = lines[b].lineNameLong;

              const aNum = parseInt(aName);
              const bNum = parseInt(bName);

              if (isNaN(aNum) && isNaN(bNum)) return aName.localeCompare(bName);

              if (isNaN(aNum)) return 1;
              if (isNaN(bNum)) return -1;

              return aNum - bNum;
            })
            .map((lineID) => {
              const line = lines[lineID];

              if (line.hasActiveTrains === false) {
                return null;
              }

              //console.log(line);

              return (
                <h3 key={line.lineCode}>
                  <Link
                    to={`/${agency}/${line.lineCode}`}
                    className='route'
                    style={{
                      fontSize: "1.3rem",
                      padding: "8px",
                      backgroundColor: `#${line.routeColor}`,
                      color: `#${line.routeTextColor}`,
                    }}
                  >
                    {line.lineNameLong}{" "}
                    {line.lineNameShort.length > 0 &&
                    agencies[agency].addShortName &&
                    line.lineNameShort !== line.lineNameLong
                      ? `(${line.lineNameShort})`
                      : ""}
                  </Link>
                </h3>
              );
            })
        )}
        {isLoading ? (
          <p>{loadingMessage}</p>
        ) : (
          <details>
            <summary
              style={{
                padding: "6px 6px",
                fontSize: "1.3rem",
                backgroundColor: "#444",
              }}
            >
              <strong>Inactive Routes</strong>
            </summary>
            <div
              className='routes'
              style={{
                marginTop: "4px",
              }}
            >
              {Object.keys(lines)
                .sort((a, b) => {
                  const aName = lines[a].lineNameLong;
                  const bName = lines[b].lineNameLong;

                  const aNum = parseInt(aName);
                  const bNum = parseInt(bName);

                  if (isNaN(aNum) && isNaN(bNum))
                    return aName.localeCompare(bName);

                  if (isNaN(aNum)) return 1;
                  if (isNaN(bNum)) return -1;

                  return aNum - bNum;
                })
                .map((lineID) => {
                  const line = lines[lineID];

                  if (line.hasActiveTrains === true) {
                    return null;
                  }

                  console.log(line);

                  return (
                    <h3 key={line.lineCode}>
                      <Link
                        to={`/${agency}/${line.lineCode}`}
                        className='route'
                        style={{
                          fontSize: "1.3rem",
                          padding: "8px",
                          backgroundColor: `#${line.routeColor}`,
                          color: `#${line.routeTextColor}`,
                        }}
                      >
                        {line.lineNameLong}{" "}
                        {line.lineNameShort.length > 0 &&
                        agencies[agency].addShortName &&
                        line.lineNameShort !== line.lineNameLong
                          ? `(${line.lineNameShort})`
                          : ""}
                      </Link>
                    </h3>
                  );
                })}
            </div>
          </details>
        )}
        <div>
          <h2
            style={{
              marginTop: "4px",
              marginBottom: "-4px",
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

                    console.log(favKey, fav);

                    return (
                      <FavoritedStation
                        agency={favKey.split("-")[0]}
                        station={fav}
                        key={favKey}
                        style={{
                          backgroundColor: "#444",
                        }}
                      />
                    );
                  })}
              </>
            )}
          </div>
        </div>
        <h3
          className='route'
          key='onMap'
          style={{
            backgroundColor: agencies[agency].color,
            color: agencies[agency].textColor,
            fontSize: "1.3rem",
            padding: "8px",
            marginTop: "4px",
          }}
        >
          <Link to={`/${agency}/map`}>View on a Map</Link>
        </h3>
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
              navigate("/", { replace: true }); //fallback
            }
          }}
        >
          Choose Another Agency
        </h3>
      </div>
    </>
  );
};

export default Agency;
