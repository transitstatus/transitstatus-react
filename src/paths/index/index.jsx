import { Link } from "react-router-dom";
import MoreLinks from "../../components/moreLinks";

const agencies = {
  BART: {
    name: "Bay Area Rapid Transit",
    endpoint: "bart",
    color: "#0099d8",
    textColor: "#ffffff",
  },
  Metra: {
    name: "Metra",
    endpoint: "metra",
    color: "#005195",
    textColor: "#ffffff",
  },
  LIRR: {
    name: "Long Island Rail Road",
    endpoint: "lirr",
    color: "#0f61a9",
    textColor: "#ffffff",
  },
  "NYC Subway": {
    name: "New York City Subway",
    endpoint: "nyct_subway",
    color: "#0f61a9",
    textColor: "#ffffff",
  },
};

const Index = () => {
  return (
    <>
      <h1>Transitstat.us</h1>
      <p>Open source, free, and easy transit tracker.</p>
      <p>v0.0.3 Beta</p>
      <p>Heads up: this shit will probably break!</p>
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
              className='agency'
              style={{
                backgroundColor: agencies[agency].color,
                color: agencies[agency].textColor,
              }}
            >
              <h3>
                {agencies[agency].name} ({agency})
              </h3>
            </Link>
          );
        })}
      </div>
      <MoreLinks />
    </>
  );
};

export default Index;
