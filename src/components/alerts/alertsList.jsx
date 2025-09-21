import Alert from "./alert";
import { agencies } from "../../config";

const AlertsList = ({ alertsArray, agency, filterType, filterID, style = {} }) => {
  const filteredAlertsArray = alertsArray.filter((alert) => {
    console.log(alert.additionalStationIDs)

    if (!filterType) return true; //all good
    if (filterType == 'trip' && alert.runNumber == filterID) return true;
    if (filterType == 'trip' && alert.additionalRunNumbers.includes(filterID)) return true;
    if (filterType == 'stop' && alert.stationID == filterID) return true;
    if (filterType == 'stop' && alert.additionalStationIDs.includes(filterID)) return true;
    if (filterType == 'line' && alert.lineCode == filterID) return true;
    if (filterType == 'agency' && !alert.runNumber && !alert.stationID && !alert.lineCode) return true;
    return false;
  });

  console.log(filteredAlertsArray);

  if (filteredAlertsArray.length == 0) return null; // no alerts

  const filterTypeTitles = {
    agency: 'Agency ',
    line: 'Line ',
    trip: 'Trip ',
    stop: 'Stop ',
  };

  return (
    <details style={style}>
      <summary
        style={{
          marginTop: "4px",
          marginBottom: "-4px",
          color: agencies[agency].textColor,
          backgroundColor: agencies[agency].color,
          padding: "6px 6px",
          fontSize: "1.3rem",
        }}
      >
        <strong>{filterTypeTitles[filterType] ?? ''}Alerts</strong>
      </summary>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          gap: "4px",
          marginTop: "8px",
          marginBottom: "-4px",
        }}
      >
        {filteredAlertsArray.map((alert) => <Alert alert={alert} />)}
      </div>
    </details>
  );
};

export default AlertsList;