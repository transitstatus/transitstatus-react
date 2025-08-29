import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { agencies } from "../../config";
import Meta from "../../components/meta";
import Oneko from "../../components/extras/oneko";

const defaultKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
  'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '↺',
  'Z', 'X', 'C', 'V', 'B', 'N', 'M', ' ', '←', '🌐',
];

const LineQS = () => {
  const { agency, lineName } = useParams();
  const [line, setLine] = useState({});
  const [lineStations, setLineStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [stations, setStations] = useState({});
  const [qsText, setQsText] = useState("");
  const [nextCharacters, setNextCharacters] = useState(defaultKeys);
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  document.title = `${agencies[agency].name} ${line.lineNameLong} Tracker | Transitstat.us`;

  useEffect(() => {
    const fetchData = async () => {
      const linesData = await window.dataManager.getData(agency, "lines");
      const stationsData = await window.dataManager.getData(agency, "stations");

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

      if (linesData[lineName]) {
        const sortedLineStations =
          linesData[lineName].stations
            .sort((a, b) => {
              const aName = stationsData[a].stationName;
              const bName = stationsData[b].stationName;

              const aNum = parseInt(aName);
              const bNum = parseInt(bName);

              if (isNaN(aNum) && isNaN(bNum)) return aName.localeCompare(bName);

              if (isNaN(aNum)) return 1;
              if (isNaN(bNum)) return -1;

              return aNum - bNum;
            })
            .map((stationKey) => stationsData[stationKey]);

          setLineStations(sortedLineStations);
          setFilteredStations(sortedLineStations);

      }

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

  const updateQSKeysAndBox = (newQsText) => {
    const currentStationMatches = lineStations.filter((station) => station.stationName.toUpperCase().startsWith(newQsText));
    const possibleNextStrings = currentStationMatches.map((station) => station.stationName.toUpperCase().replace(newQsText, ''));
    const possibleNextCharacters = possibleNextStrings.map((nextString) => nextString.substring(0, 1));

    setFilteredStations(currentStationMatches)

    console.log(currentStationMatches)
    console.log(possibleNextStrings)
    console.log(possibleNextCharacters)

    const nextKeys = defaultKeys.filter((key) => {
      if (['↺', '←', '🌐', '🏠'].includes(key)) return true; //always there
      if (newQsText.length == 0) return true; // empty
      if (possibleNextCharacters.includes(key)) return true; //next keys
      return false;
    });

    setNextCharacters(nextKeys);
    setQsText(newQsText)
    console.log(nextKeys)
  };

  const handleQSClick = (target) => {
    console.log(target.innerText);

    // function keys
    if (target.innerText == '←') { // go back
      if (history.state.idx && history.state.idx > 0) {
        navigate(-1);
      } else {
        navigate(`/${agency}`, { replace: true }); //fallback
      }
    } else if (target.innerText == '🌐') { // map
      navigate(agencies[agency].dontFilterMapLines ? `/${agency}/map` : `/${agency}/map?route=${lineName}`);
    } else if (target.innerText == '↺') {
      //currentQsText = currentQsText.slice(0, -1);
      updateQSKeysAndBox(qsText.slice(0, -1));
    } else {
      updateQSKeysAndBox(qsText + target.innerText);
    }
  };

  return (
    <main className="qsMain">
      <Oneko />
      <div className="qsKeyboard">
        <div className="qsTextBox">{qsText}</div>
        {
          defaultKeys.map((text) => {
            return <button
              onClick={(e) => handleQSClick(e.target)}
              disabled={!nextCharacters.includes(text)}
            >{text}</button>
          })
        }
      </div>
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
                line.lineNameShort != line.lineNameLong
                ? `(${line.lineNameShort})`
                : ""}
            </h2>
          </div>
        )}
        {isLoading ? (
          <p>{loadingMessage}</p>
        ) : line.stations.length > 0 ? (
          filteredStations.map((station) => {
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
            to={agencies[agency].dontFilterMapLines ? `/${agency}/map` : `/${agency}/map?route=${lineName}`}
            style={{
              color: agencies[agency].textColor,
            }}
          >
            View on Map
          </Link>
        </h3>
      </div>
    </main>
  );
};

export default LineQS;
