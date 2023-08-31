import { agencies } from "../config";
import Heart from "./heart";

const FavoritedStation = ({ agency, station, style }) => {
  console.log(station);

  const agencyObj = agencies[agency];

  return (
    <div
      class='station'
      style={{
        fontSize: "1.3rem",
        padding: "8px",
        color: agencyObj.textColor,
        backgroundColor: agencyObj.color,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>
        <a href={`/${agency}/stops/${station.stationID}`}>
          {station.stationName} ({agencyObj.name})
        </a>
      </h3>
      <Heart
        agency={agency}
        station={station}
        style={{
          width: "26px",
        }}
      />
    </div>
  );
};

export default FavoritedStation;
