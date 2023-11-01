import { Link } from "react-router-dom";
import MoreLinks from "../../components/moreLinks";
import { agencies, config } from "../../config";
import FavoritedStation from "../../components/favorites/favoritedStation";
import { useMemo } from "react";
import FavoritedLine from "../../components/favorites/favoritedLine";
import FavoritedAgency from "../../components/favorites/favoritedAgency";

const Index = () => {
  const favoriteStations = useMemo(() => {
    return JSON.parse(localStorage.getItem("favorites-transitstatus-v0")) || {};
  }, []);

  const favoriteLines = useMemo(() => {
    return (
      JSON.parse(localStorage.getItem("favorites-transitstatus-v1-lines")) || {}
    );
  }, []);

  const favoriteAgencies = useMemo(() => {
    return (
      JSON.parse(localStorage.getItem("favorites-transitstatus-v1-agencies")) ||
      {}
    );
  }, []);

  document.title = "Transitstat.us";

  const now = new Date().valueOf();
  const filteredAlerts = config.globalAlerts.filter((a) => a.expires > now);

  return (
    <>
      <h1>Transitstat.us</h1>
      <p>{config.tagLine}</p>
      <p>{config.version}</p>
      {config.additionalWarnings.map((warning, i) => {
        return <p key={i}>{warning}</p>;
      })}
      <h2
        style={{
          marginTop: "4px",
          marginBottom: "-4px",
          backgroundColor: "#444",
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
                  />
                );
              })}
          </>
        )}
      </div>
      <div
        style={{
          height: "8px",
        }}
      ></div>
      {/*}
      <h2
        style={{
          marginTop: "4px",
          marginBottom: "-4px",
          backgroundColor: "#444",
          maxWidth: "384px",
          padding: "4px 8px",
        }}
      >
        Favorite Lines
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
        {Object.keys(favoriteLines).length === 0 ? (
          <p
            style={{
              fontSize: "1rem",
              padding: "4px 8px",
              color: "#fff",
              backgroundColor: "#444",
            }}
          >
            No favorite lines yet.
          </p>
        ) : (
          <>
            {Object.keys(favoriteLines)
              .sort()
              .map((favKey) => {
                const fav = favoriteLines[favKey];

                console.log(favKey, fav);

                return (
                  <FavoritedLine
                    agency={favKey.split("-")[0]}
                    line={fav}
                    key={favKey}
                  />
                );
              })}
          </>
        )}
      </div>
      <div
        style={{
          height: "8px",
        }}
      ></div>
      {*/}
      <h2
        style={{
          marginTop: "4px",
          marginBottom: "-4px",
          backgroundColor: "#444",
          maxWidth: "384px",
          padding: "4px 8px",
        }}
      >
        Favorite Agencies
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
        {Object.keys(favoriteAgencies).length === 0 ? (
          <p
            style={{
              fontSize: "1rem",
              padding: "4px 8px",
              color: "#fff",
              backgroundColor: "#444",
            }}
          >
            No favorite agencies yet.
          </p>
        ) : (
          <>
            {Object.keys(favoriteAgencies)
              .sort()
              .map((favKey) => {
                const fav = favoriteAgencies[favKey];

                console.log(favKey, fav);

                return (
                  <FavoritedAgency
                    agency={favKey.split("-")[0]}
                    station={fav}
                    key={favKey}
                  />
                );
              })}
          </>
        )}
      </div>
      <div
        style={{
          height: "8px",
        }}
      ></div>
      {filteredAlerts.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "400px",
              gap: "4px",
              marginTop: "4px",
            }}
          >
            {filteredAlerts.map((alert) => {
              return (
                <details
                  style={{
                    backgroundColor: "#444",
                    padding: "4px 8px",
                  }}
                >
                  <summary
                    style={{
                      fontSize: "1.2rem",
                    }}
                  >
                    {alert.title}
                  </summary>
                  <div
                    style={{
                      height: "2px",
                    }}
                  ></div>
                  {alert.info}
                </details>
              );
            })}
          </div>
          <div
            style={{
              height: "8px",
            }}
          ></div>
        </>
      ) : null}

      <h2
        style={{
          marginTop: "4px",
          marginBottom: "-4px",
          backgroundColor: "#444",
          maxWidth: "384px",
          padding: "4px 8px",
        }}
      >
        Agencies
      </h2>
      <div className='agencies'>
        {Object.keys(agencies)
          .sort((a, b) => {
            const aName = agencies[a].selectionName;
            const bName = agencies[b].selectionName;

            if (aName < bName) {
              return -1;
            }
            if (aName > bName) {
              return 1;
            }
            return 0;
          })
          .map((agency) => {
            return (
              <Link
                to={`/${agency}`}
                key={agency}
                className={`agency${
                  agencies[agency].disabled ? " disabled" : ""
                }`}
                style={{
                  backgroundColor: agencies[agency].color,
                  color: agencies[agency].textColor,
                  fontSize: "1.2rem",
                  fontWeight: "500",
                }}
              >
                <h3>
                  {agencies[agency].selectionName}
                  {agencies[agency].disabled ? " (Coming Soon)" : ""}
                </h3>
              </Link>
            );
          })}
      </div>
      <div
        style={{
          height: "8px",
        }}
      ></div>
      <h2
        style={{
          marginTop: "4px",
          marginBottom: "-4px",
          backgroundColor: "#444",
          maxWidth: "384px",
          padding: "4px 8px",
        }}
      >
        More Links
      </h2>
      <div
        style={{
          display: "flex",
          gap: "4px",
          padding: "8px",
          backgroundColor: "#444",
          maxWidth: "384px",
          marginTop: "8px",
        }}
      >
        <p>
          <Link to='/about'>About</Link>
        </p>
        <p>
          <Link to='/api'>API Docs</Link>
        </p>
        <p>
          <Link to='/privacy'>Privacy Policy</Link>
        </p>
        {/*
        <p>
          <Link to='/api'>API</Link>
        </p>
        */}
        <p>
          <Link to='/changelog'>Changelog</Link>
        </p>
      </div>
    </>
  );
};

export default Index;
