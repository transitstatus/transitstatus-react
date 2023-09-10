import { Link } from "react-router-dom";
import { agencies } from "../../config";
import AgencyHeart from "../hearts/agencyHeart";

const FavoritedAgency = ({ agency, style }) => {
  const agencyObj = agencies[agency];

  console.log(agencyObj);

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
      }}
    >
      <h3>
        <Link to={`/${agency}`}>{agencyObj.selectionName}</Link>
      </h3>
      <AgencyHeart
        agency={agency}
        style={{
          width: "26px",
        }}
      />
    </div>
  );
};

export default FavoritedAgency;
