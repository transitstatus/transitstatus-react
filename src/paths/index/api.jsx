import { useNavigate } from "react-router-dom";
import APIEndpoint from "../../components/api/apiEndpoint";
import CodeBlock from "../../components/api/codeBlock";
import { agencies } from "../../config";
import { useState, useMemo } from "react";
import Oneko from "../../components/extras/oneko";
import "highlight.js/styles/atom-one-dark.min.css";

const APIDocs = () => {
  const navigate = useNavigate();

  const [runNumber, setRunNumber] = useState("");
  const [stationID, setStationID] = useState("");
  const [lineCode, setLineCode] = useState("");

  const agencyPresets = useMemo(() => {
    return Object.keys(agencies).map((agency) => {
      return {
        agency: agency,
        name: agencies[agency].name,
        baseURL: agencies[agency].endpoint,
      };
    });
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const defaultAgency = urlParams.get("defaultAgency");

  console.log("defaultAgency", defaultAgency, agencies[defaultAgency])

  const [baseURL, setBaseURL] = useState(
    agencies[defaultAgency]?.endpoint ?? "https://store.transitstat.us/atsa/ts"
  );

  document.title = "API | Transitstat.us";

  return (
    <main>
      <Oneko />
      <h1>API Guide</h1>
      <button
        onClick={() => {
          if (history.state.idx && history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate("/", { replace: true }); //fallback
          }
        }}
        className='settingsButton'
        style={{
          marginTop: "0.5rem",
        }}
      >
        Back Home
      </button>
      <h2>Contents</h2>
      <ul
        style={{
          margin: "4px 0 8px 0",
        }}
      >
        <li>
          <a href='#intro'>Introduction</a>
          <ul>
            <li>
              <a href='#notes'>Notes</a>
            </li>
          </ul>
        </li>
        <li>
          <a href='#types'>Types</a>
          <ul>
            <li>
              <a href='#type_TransitStatusResponse'>TransitStatusResponse</a>
            </li>
            <li>
              <a href='#type_TransitStatusTrain'>TransitStatusTrain</a>
            </li>
            <li>
              <a href='#type_TransitStatusStation'>TransitStatusStation</a>
            </li>
            <li>
              <a href='#type_TransitStatusLine'>TransitStatusLine</a>
            </li>
            <li>
              <a href='#type_TransitStatusShitsFucked'>
                TransitStatusShitsFucked
              </a>
            </li>
            <li>
              <a href='#type_TransitStatusAlert'>
                TransitStatusAlert
              </a>
            </li>
            <li>
              <a href='#type_TransitStatusDestination'>
                TransitStatusDestination
              </a>
            </li>
            <li>
              <a href='#type_TransitStatusDestinationTrain'>
                TransitStatusDestinationTrain
              </a>
            </li>
            <li>
              <a href='#type_TransitStatusPrediction'>
                TransitStatusPrediction
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href='#endpoints'>Endpoints</a>
          <ul>
            <li>
              <a href='#endpoint_root'>/ (API Root)</a>
            </li>
            <li>
              <a href='#endpoint_root_trains'>/trains</a>
            </li>
            <li>
              <a href='#endpoint_root_trains_runNumber'>/trains/:runNumber</a>
            </li>
            <li>
              <a href='#endpoint_root_stations'>/stations</a>
            </li>
            <li>
              <a href='#endpoint_root_stations_stationID'>
                /stations/:stationID
              </a>
            </li>
            <li>
              <a href='#endpoint_root_lines'>/lines</a>
            </li>
            <li>
              <a href='#endpoint_root_lines_lineCode'>/lines/:lineCode</a>
            </li>
            <li>
              <a href='#endpoint_root_lastUpdated'>/lastUpdated</a>
            </li>
            <li>
              <a href='#endpoint_root_shitsFucked'>/shitsFucked</a>
            </li>
          </ul>
        </li>
        <li>
          <a href='#apis'>List of APIs</a>
        </li>
      </ul>
      <h2 id='intro'>Introduction</h2>
      <p>
        Transitstat.us doesn't use a single API, but a handful of APIs following
        the same specification. In this short guide, you'll be able to quickly
        skim through the spec and fuck around with some examples.{" "}
      </p>
      <h3
        id='notes'
        style={{
          marginTop: "8px",
        }}
      >
        Notes
      </h3>
      <p>
        There are a few things that are <i>REALLY IMPORTANT</i> to pay attention
        to, and they are listed here.
      </p>
      <ul
        style={{
          margin: "4px 0 8px 0",
        }}
      >
        <li>
          When an API errors for any reason, a 404 code should be returned with
          a plain text "Not found". This is whether you're trying to get data
          which doesn't exist or if something has gone catastrophically wrong.
        </li>
        <li>
          Pay attention to what specification bits are optional. It can usually
          be assumed that a system using Passio GO will have the optional bits
          added in.
        </li>
        <li>
          Almost all endpoints will update every ~30 seconds. Hitting them more
          often than that will be useless and will just waste your time.
        </li>
        <li>
          While the required bits shown in this API can be assumed to be returned by each response, some implementations (and by some I mean one, Brightline) <i>don't follow the API spec</i>. Brightline has schedule related data that is required for it to then be ingested by Amtraker's API, which isn't documented here.
        </li>
        <li>
          The BART vehicle positions aren't real, they're interpreted from GTFS and GTFS-RT data, but it's like close enough.
        </li>
        <li>
          The API is organized like an object which you can traverse. This will
          become clearer further into the spec, but for example, if{" "}
          <code
            style={{
              color: "#ff974b",
              backgroundColor: "#444",
              padding: "2px",
              borderRadius: "4px",
            }}
          >
            /api
          </code>{" "}
          returned{" "}
          <code
            style={{
              color: "#ff974b",
              backgroundColor: "#444",
              padding: "2px",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify({
              foo: "bar",
            })}
          </code>{" "}
          you could then access{" "}
          <code
            style={{
              color: "#ff974b",
              backgroundColor: "#444",
              padding: "2px",
              borderRadius: "4px",
            }}
          >
            /api/foo
          </code>{" "}
          and get{" "}
          <code
            style={{
              color: "#ff974b",
              backgroundColor: "#444",
              padding: "2px",
              borderRadius: "4px",
            }}
          >
            bar
          </code>{" "}
          back.
        </li>
        <li>
          While not required, I'd greatly appreciate it if you could set a User
          Agent for whatever you're building with a contact email attached in
          case I notice something wrong and I can reach out to you. This is not
          required, but it would be nice and it makes my life a little easier.
          Additonally, if you build any public projects, feel free to{" "}
          <a href='mailto:piero@piemadd.com'>send them to me</a>! I really like
          seeing what people build with my APIs.
        </li>
        <li>
          These docs were mostly written while I was sleep deprived and sick. Please
          email me if you find any errors.
        </li>
      </ul>
      <h2 id='types'>Types</h2>
      <div
        style={{
          marginLeft: "16px",
        }}
      >
        <h3
          id='type_TransitStatusResponse'
          style={{
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          TransitStatusResponse
        </h3>
        <CodeBlock
          text={`interface TransitstatusResponse {
    trains: {
        [key: string]: TransitStatusTrain //key is runNumber
    },
    stations: {
        [key: string]: TransitStatusStation //key is stationID
    },
    lines: {
        [key: string]: TransitStatusLine //key is lineCode
    },
    shitsFucked?: TransitStatusShitsFucked,
    alerts?: TransitStatusAlert[],
    lastUpdated: string //timestamp, *should* be ISO 8601
}`}
          language='typescript'
        />
      </div>

      <div
        style={{
          marginLeft: "16px",
          marginTop: "16px",
        }}
      >
        <h3
          id='type_TransitStatusTrain'
          style={{
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          TransitStatusTrain
        </h3>
        <CodeBlock
          text={`interface TransitStatusTrain { //any sort of transit vehicle, inlcuding buses. don't @ me
    lat: number, //latitude coordinate
    lon: number, //longitude coordinate
    heading: number, //if these are a multiple of 90 off, pls email me so i can fix. its fucky
    realTime: boolean, //true if the vehicle is tracking, false if this is a scheduled trip 
    deadMileage: boolean, //true if the vehicle isn't associated with any actual line and is just equipment
    line: string, //plaintext line name
    lineCode: string, //line code, usually lines up with GTFS
    lineColor: string, //hex line color, minus the "#"
    lineTextColor: string, //text color for said line, also missing the "#"
    dest: string, //direction/final destination of vehicle. tends to be vehicle headsign
    predictions: TransitStatusPrediction[],
    extra?: any //really just whatever the fuck honestly. on passio go endpoints, extra will have load (number, passenger count), cap (number, max capacity), and info (string/null, extra info about vehicle)
}`}
          language='typescript'
        />
      </div>

      <div
        style={{
          marginLeft: "16px",
          marginTop: "16px",
        }}
      >
        <h3
          id='type_TransitStatusStation'
          style={{
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          TransitStatusStation
        </h3>
        <CodeBlock
          text={`interface TransitStatusStation {
    stationID: string, //station ID, usually lines up with GTFS,
    stationName: string, //plaintext station name,
    lat: number, //latitude coordinate
    lon: number, //longitude coordinate
    destinations: {
        [key: string]: TransitStatusDestination //key is 'dest' on a TransitStatusTrain
    }
}`}
          language='typescript'
        />
      </div>

      <div
        style={{
          marginLeft: "16px",
          marginTop: "16px",
        }}
      >
        <h3
          id='type_TransitStatusLine'
          style={{
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          TransitStatusLine
        </h3>
        <CodeBlock
          text={`interface TransitStatusLine {
    lineCode: string, //line ID, usually lines up with GTFS,
    lineNameShort: string, //short line name. is sometimes empty, but is never null
    lineNameLong: string, //long line name. always has a value. fucking use it
    //NOTE: routeColor and lineColor are the same thing across types/endpoints.
    //      why aren't they the same? good question
    routeColor: string, //hex line color, minus the "#"
    routeTextColor: string, //text color for said line, also missing the "#"
    hasActiveTrains: boolean, //whether vehicles are active on the line
    stations: string[] //array of station IDs for stations on this line 
}`}
          language='typescript'
        />
      </div>

      <div
        style={{
          marginLeft: "16px",
          marginTop: "16px",
        }}
      >
        <h3
          id='type_TransitStatusShitsFucked'
          style={{
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          TransitStatusShitsFucked
        </h3>
        <CodeBlock
          text={`interface TransitStatusShitsFucked {
    shitIsFucked: boolean, //is there something wrong?
    message: string, //empty normally, has an error message if something is wrong
}`}
          language='typescript'
        />
      </div>

      <div
        style={{
          marginLeft: "16px",
          marginTop: "16px",
        }}
      >
        <h3
          id='type_TransitStatusAlert'
          style={{
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          TransitStatusAlert
        </h3>
        <CodeBlock
          text={`interface TransitStatusAlert { // all items will exist, but could be a nullish value
    id: string, // unique identifier of alert
    lineCode?: string, // not nullish if this alert is for a specific line. if not, it is a system alert
    runNumber?: string, // not nullish if this alert relates to a specific run number. if not, it is for the entire line 
    stationID?: string, // not nullish if this alert relates to a specific station. if not, it is for the entire line
    additionalRunNumbers?: string[], // array of run numbers that this alert could be useful for (ie a stop alert having a run number for trains scheduled to stop there)
    additionalStationIDs?: string[], // array of additional stations that this alert should be shown at, even if this is not a station specific alert 
    title: string, // not nullish if an alert title exists
    message: string, // actual alert text, will always be *something*
}`}
          language='typescript'
        />
      </div>

      <div
        style={{
          marginLeft: "16px",
          marginTop: "16px",
        }}
      >
        <h3
          id='type_TransitStatusDestination'
          style={{
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          TransitStatusDestination
        </h3>
        <CodeBlock
          text={`interface TransitStatusDestination {
    trains: TransitStatusDestinationTrain[]
}`}
          language='typescript'
        />
      </div>

      <div
        style={{
          marginLeft: "16px",
          marginTop: "16px",
        }}
      >
        <h3
          id='type_TransitStatusDestinationTrain'
          style={{
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          TransitStatusDestinationTrain
        </h3>
        <CodeBlock
          text={`interface TransitStatusDestinationTrain {
    runNumber: string, //either the scheduled train number or the physical number on a bus. is usually a number, but can be a string
    actualETA: number, //estimated time of arrival in unix timestamp (ms)
    noETA: boolean, //whether there is no ETA for this train. really only happens when passio go dies
    realTime: boolean, //true if the vehicle is tracking, false if this is a scheduled trip 
    line: string, //plaintext line name
    lineCode: string, //line code, usually lines up with GTFS
    lineColor: string, //hex line color, minus the "#"
    lineTextColor: string, //text color for said line, also missing the "#"
    destination?: string, //used on trains where the destination key TransitStatusDestination isn't the actual definition (ie inbound/outbound for Metra)
    extra?: any //same as seen in TransitStatusTrain. 
}`}
          language='typescript'
        />
      </div>

      <div
        style={{
          marginLeft: "16px",
          marginTop: "16px",
        }}
      >
        <h3
          id='type_TransitStatusPrediction'
          style={{
            marginTop: "4px",
            marginBottom: "4px",
          }}
        >
          TransitStatusPrediction
        </h3>
        <CodeBlock
          text={`interface TransitStatusPrediction {
    stationID: string, //station ID, usually lines up with GTFS,
    stationName: string, //plaintext station name,
    actualETA: number, //estimated time of arrival in unix timestamp (ms)
    noETA: boolean, //whether there is no ETA for this train. really only happens when passio go dies
    realTime: boolean, //true if the vehicle is tracking, false if this is a scheduled trip
}`}
          language='typescript'
        />
      </div>

      <h2 id='endpoints'>Endpoints</h2>
      <div
        style={{
          marginLeft: "16px",
          fontSize: "18px",
        }}
      >
        <h3 id='endpoints_config'>Config</h3>
        <p>Please choose the API you'd like to test with:</p>
        <select
          style={{
            backgroundColor: "#444",
            color: "#ffffff",
            border: "none",
            padding: "4px",
            fontSize: "18px",
            marginTop: "2px",
            marginBottom: "4px",
          }}
          defaultValue={agencies[defaultAgency]?.endpoint}
        >
          {agencyPresets.map((agency) => {
            return (
              <option
                value={agency.baseURL}
                onClick={() => {
                  setBaseURL(agency.baseURL);
                }}
              >
                {agency.name}
              </option>
            );
          })}
        </select>
        <p>Or enter your own:</p>
        <input
          value={baseURL}
          onChange={(e) => setBaseURL(e.target.value)}
          style={{
            width: "100%",
            backgroundColor: "#444",
            color: "#ffffff",
            border: "none",
            padding: "4px",
            fontSize: "18px",
            marginTop: "2px",
            marginBottom: "4px",
          }}
        ></input>
        <br />
        <br />
        <h3
          id='endpoint_root'
          style={{
            marginBottom: "8px",
          }}
        >
          <a href={`${baseURL}`} target='_blank'>
            <code
              style={{
                color: "#ff974b",
                backgroundColor: "#444",
                padding: "2px",
                borderRadius: "4px",
              }}
            >
              /
            </code>
          </a>
          &nbsp;&rarr; TransitStatusResponse
        </h3>
        <APIEndpoint baseURL={baseURL} />

        <br />
        <br />
        <h3
          id='endpoint_root_trains'
          style={{
            marginBottom: "8px",
          }}
        >
          <a href={`${baseURL}/trains`} target='_blank'>
            <code
              style={{
                color: "#ff974b",
                backgroundColor: "#444",
                padding: "2px",
                borderRadius: "4px",
              }}
            >
              /trains
            </code>
          </a>
          &nbsp;&rarr; Object (key is runNumber, value is TransitStatusTrain)
        </h3>
        <APIEndpoint baseURL={baseURL} endpoint={"/trains"} />

        <br />
        <br />
        <h3
          id='endpoint_root_trains_runNumber'
          style={{
            marginBottom: "8px",
          }}
        >
          <a href={`${baseURL}/trains/${runNumber}`} target='_blank'>
            <code
              style={{
                color: "#ff974b",
                backgroundColor: "#444",
                padding: "2px",
                borderRadius: "4px",
              }}
            >
              /trains/:runNumber
            </code>
          </a>
          &nbsp;&rarr; TransitStatusTrain
        </h3>
        <input
          value={runNumber}
          onChange={(e) => {
            setRunNumber(e.target.value);
          }}
          style={{
            backgroundColor: "#444",
            color: "#ffffff",
            border: "none",
            padding: "4px",
            fontSize: "18px",
            marginTop: "-2px",
            marginBottom: "4px",
          }}
          placeholder='runNumber'
        ></input>
        <label>
          &nbsp;(must be a valid runNumber, or else you'll get a 404)
        </label>
        <APIEndpoint baseURL={baseURL} endpoint={`/trains/${runNumber}`} />

        <br />
        <br />
        <h3
          id='endpoint_root_stations'
          style={{
            marginBottom: "8px",
          }}
        >
          <a href={`${baseURL}/stations`} target='_blank'>
            <code
              style={{
                color: "#ff974b",
                backgroundColor: "#444",
                padding: "2px",
                borderRadius: "4px",
              }}
            >
              /stations
            </code>
          </a>
          &nbsp;&rarr; Object (key is stationID, value is TransitStatusStation)
        </h3>
        <APIEndpoint baseURL={baseURL} endpoint={"/stations"} />

        <br />
        <br />
        <h3
          id='endpoint_root_stations_stationID'
          style={{
            marginBottom: "8px",
          }}
        >
          <a href={`${baseURL}/stations/${stationID}`} target='_blank'>
            <code
              style={{
                color: "#ff974b",
                backgroundColor: "#444",
                padding: "2px",
                borderRadius: "4px",
              }}
            >
              /stations/:stationID
            </code>
          </a>
          &nbsp;&rarr; TransitStatusTrain
        </h3>
        <input
          value={stationID}
          onChange={(e) => {
            setStationID(e.target.value);
          }}
          style={{
            backgroundColor: "#444",
            color: "#ffffff",
            border: "none",
            padding: "4px",
            fontSize: "18px",
            marginTop: "-2px",
            marginBottom: "4px",
          }}
          placeholder='stationID'
        ></input>
        <label>
          &nbsp;(must be a valid stationID, or else you'll get a 404)
        </label>
        <APIEndpoint baseURL={baseURL} endpoint={`/stations/${stationID}`} />

        <br />
        <br />
        <h3
          id='endpoint_root_lines'
          style={{
            marginBottom: "8px",
          }}
        >
          <a href={`${baseURL}/lines`}>
            <code
              style={{
                color: "#ff974b",
                backgroundColor: "#444",
                padding: "2px",
                borderRadius: "4px",
              }}
            >
              /lines
            </code>
          </a>
          &nbsp;&rarr; Object (key is lineCode, value is TransitStatusLine)
        </h3>
        <APIEndpoint baseURL={baseURL} endpoint={"/lines"} />

        <br />
        <br />
        <h3
          id='endpoint_root_lines_lineCode'
          style={{
            marginBottom: "8px",
          }}
        >
          <a href={`${baseURL}/lines/${lineCode}`} target='_blank'>
            <code
              style={{
                color: "#ff974b",
                backgroundColor: "#444",
                padding: "2px",
                borderRadius: "4px",
              }}
            >
              /lines/:lineCode
            </code>
          </a>
          &nbsp;&rarr; TransitStatusLine
        </h3>
        <input
          value={lineCode}
          onChange={(e) => {
            setLineCode(e.target.value);
          }}
          style={{
            backgroundColor: "#444",
            color: "#ffffff",
            border: "none",
            padding: "4px",
            fontSize: "18px",
            marginTop: "-2px",
            marginBottom: "4px",
          }}
          placeholder='lineCode'
        ></input>
        <label>
          &nbsp;(must be a valid lineCode, or else you'll get a 404)
        </label>
        <APIEndpoint baseURL={baseURL} endpoint={`/lines/${lineCode}`} />

        <br />
        <br />
        <h3
          id='endpoint_root_lastUpdated'
          style={{
            marginBottom: "8px",
          }}
        >
          <a href={`${baseURL}/lastUpdated`}>
            <code
              style={{
                color: "#ff974b",
                backgroundColor: "#444",
                padding: "2px",
                borderRadius: "4px",
              }}
            >
              /lastUpdated
            </code>
          </a>
          &nbsp;&rarr; String (timestamp, *should* be ISO 8601)
        </h3>
        <APIEndpoint baseURL={baseURL} endpoint={"/lastUpdated"} />

        <br />
        <br />
        <h3
          id='endpoint_root_shitsFucked'
          style={{
            marginBottom: "8px",
          }}
        >
          <a href={`${baseURL}/shitsFucked`}>
            <code
              style={{
                color: "#ff974b",
                backgroundColor: "#444",
                padding: "2px",
                borderRadius: "4px",
              }}
            >
              /shitsFucked
            </code>
          </a>
          &nbsp;&rarr; TransitStatusShitsFucked (optional endpoint)
        </h3>
        <APIEndpoint baseURL={baseURL} endpoint={"/shitsFucked"} />
      </div>
      <h2 id='apis'>List of APIs</h2>
      <p>Below is a list of the officially supported Transitstatus APIs:</p>
      <div
        style={{
          marginLeft: "16px",
          fontSize: "18px",
        }}
      >
        <ul>
          {Object.values(agencies).map((agency) => {
            return (
              <li>
                <p>{agency.name}</p>
                <ul>
                  <li>
                    Endpoint:{" "}
                    <a href={agency.endpoint} target='_blank'>
                      {agency.endpoint}
                    </a>
                  </li>
                  <li>
                    System GeoJSON:{" "}
                    {agency.mapShapes.length === 1 ? (
                      <a href={agency.mapShapes[0]} target='_blank'>
                        {agency.mapShapes[0]}
                      </a>
                    ) : (
                      <ul>
                        {agency.mapShapes.map((url) => (
                          <li key={url}>
                            <a href={url} target='_blank'>
                              {url}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      <p></p>
      <button
        onClick={() => {
          if (history.state.idx && history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate("/", { replace: true }); //fallback
          }
        }}
        className='settingsButton'
      >
        Back Home
      </button>
    </main>
  );
};

export default APIDocs;
