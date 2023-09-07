import { Link } from "react-router-dom";
import MoreLinks from "../../components/moreLinks";
import { agencies, config } from "../../config";
import FavoritedStation from "../../components/favoritedStation";
import { useMemo } from "react";

const Index = () => {
  const favorites = useMemo(() => {
    return JSON.parse(localStorage.getItem("favorites-transitstatus-v0")) || {};
  }, []);

  document.title = "Transitstat.us";

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
        Favorites
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
        {Object.keys(favorites).length === 0 ? (
          <p
            style={{
              fontSize: "1rem",
              padding: "4px 8px",
              color: "#fff",
              backgroundColor: "#444",
            }}
          >
            No favorites yet.
          </p>
        ) : (
          <>
            {Object.keys(favorites).map((favKey) => {
              const fav = favorites[favKey];

              console.log(favKey, fav);

              return (
                <FavoritedStation agency={favKey.split("-")[0]} station={fav} />
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
          <Link to='/settings'>Settings</Link>
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
