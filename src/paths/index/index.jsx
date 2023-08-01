import { Link } from "react-router-dom";
import MoreLinks from "../../components/moreLinks";
import { agencies, config } from "../../config";

const Index = () => {
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
        }}
      >
        Agencies
      </h2>
      <div className='agencies'>
        {Object.keys(agencies).map((agency) => {
          return (
            <Link
              to={`/${agency}`}
              className={`agency${agencies[agency].disabled ? " disabled" : ""}`}
              style={{
                backgroundColor: agencies[agency].color,
                color: agencies[agency].textColor,
              }}
            >
              <h3>{agencies[agency].name}{agencies[agency].disabled ? " (Coming Soon)" : ""}</h3>
            </Link>
          );
        })}
      </div>
      <MoreLinks />
    </>
  );
};

export default Index;
