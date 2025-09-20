import { Link } from "react-router-dom";
import { agencies } from "../../config";
import StationHeart from "../hearts/stationHeart";

const FavoritedStation = ({ agency, station, style }) => {
  const agencyObj = agencies[agency];

  return (
    <div
      className='station'
      style={{
        fontSize: "1.2rem",
        padding: "0.4rem",
        color: agencyObj.textColor,
        backgroundColor: agencyObj.color,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        ...style,
      }}
    >
      <h3>
        <Link to={`/${agency}/stops/${station.stationID}`} style={{ color: style.color ?? agencyObj.textColor }}>
          {station.stationName}
        </Link>
      </h3>
      <StationHeart
        agency={agency}
        station={station}
        style={{
          width: "26px",
          color: style.color ?? agencyObj.textColor,
        }}
      />
    </div>
  );
};

export default FavoritedStation;
