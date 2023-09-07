import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { agencies, config } from "../../config";
import Meta from "../../components/meta";

const Agency = () => {
  const { agency } = useParams();
  const navigate = useNavigate();
  const [lines, setLines] = useState({});
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");
  const [isLoading, setIsLoading] = useState(true);

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
      fetch(`${agencies[agency].endpoint}/lines`)
        .then((response) => response.json())
        .then((data) => {
          setLines(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);

          fetch(`${agencies[agency].endpoint}/shitsFucked`)
            .then((res) => res.json())
            .then((shitsFucked) => {
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
    //setInterval(fetchData, 30000);
    //dont need to refetch lines
  }, [agency]);

  return (
    <>
      <h1>
        {agencies[agency].name} {agencies[agency].type} Tracker
      </h1>
      <Meta />
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
            <div
              className='routes'
              style={{
                marginTop: "4px",
              }}
            >
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
