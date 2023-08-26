import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { agencies, config } from "../../config";

const Agency = () => {
  const { agency } = useParams();
  const navigate = useNavigate();
  const [lines, setLines] = useState({});
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${agencies[agency].endpoint}/lines`)
        .then((response) => response.json())
        .then((data) => {
          setLines(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoadingMessage(
            "Error loading data. Please try again later or choose another agency."
          );
        });
    };

    fetchData();
    //setInterval(fetchData, 30000);
    //dont need to refetch lines
  }, [agency]);

  return (
    <>
      <h1>
        {agencies[agency].name} {agencies[agency].type} Tracker
      </h1>
      <p>by Transitstat.us</p>
      <p>{config.tagLine}</p>
      <p>{config.version}</p>
      {config.additionalWarnings.map((warning, i) => {
        return <p key={i}>{warning}</p>;
      })}
      <div className='routes'>
        <h2
          style={{
            marginTop: "4px",
            padding: "2px 6px",
            backgroundColor: agencies[agency].color,
            color: agencies[agency].textColor,
          }}
        >
          {agencies[agency].name} Routes
        </h2>
        {isLoading ? (
          <p>{loadingMessage}</p>
        ) : (
          Object.keys(lines)
            .sort()
            .map((lineID) => {
              const line = lines[lineID];

              if (line.hasActiveTrains === false) {
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
                    {line.lineNameShort.length > 0
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
                backgroundColor: agencies[agency].color,
              }}
            >
              <strong>Inactive Routes</strong>
            </summary>
            <div className='routes' style={{
              marginTop: "4px",
            }}>
              {Object.keys(lines)
                .sort()
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
                        {line.lineNameShort.length > 0
                          ? `(${line.lineNameShort})`
                          : ""}
                      </Link>
                    </h3>
                  );
                })}
            </div>
          </details>
        )}
        <h3
          className='route'
          key='onMap'
          style={{
            backgroundColor: agencies[agency].color,
            color: agencies[agency].textColor,
            fontSize: "1.3rem",
            padding: "8px",
          }}
        >
          <Link to={`/${agency}/map`}>View on a Map</Link>
        </h3>
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
