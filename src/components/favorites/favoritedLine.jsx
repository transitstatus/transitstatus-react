import { Link } from "react-router-dom";
import { agencies } from "../../config";
import LineHeart from "../hearts/lineHeart";

const FavoritedLine = ({ agency, line, style }) => {
  console.log(line);

  const agencyObj = agencies[agency];

  return (
    <div
      className='station'
      style={{
        fontSize: "1.2rem",
        padding: "0.4rem",
        color: `#${line.routeTextColor}`,
        backgroundColor: `#${line.routeColor}`,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>
        <Link to={`/${agency}/${line.lineCode}`}>
          {line.lineNameLong}{" "}
          {line.lineNameShort.length > 0 &&
          agencies[agency].addShortName &&
          line.lineNameShort != line.lineNameLong
            ? `(${line.lineNameShort})`
            : ""}
        </Link>
      </h3>
      <LineHeart
        agency={agency}
        line={line}
        style={{
          width: "26px",
        }}
      />
    </div>
  );
};

export default FavoritedLine;
