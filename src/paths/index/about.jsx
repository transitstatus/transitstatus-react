import { useNavigate } from "react-router-dom";
import Oneko from "../../components/extras/oneko";

const About = () => {
  const navigate = useNavigate();

  document.title = "About | Transitstat.us";

  return (
    <div>
      <Oneko />
      <h1>About</h1>
      <h2>Why</h2>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;Transitstat.us is a free, open-source, and
        ad-free service that provides real-time transit information for various
        transit agencies. It was made out of frustration of a lack of a
        barebones, no-frills transit tracker that just works. I didn't want
        directions or to need my location on, I just wanted to know when the
        next train was coming.
      </p>
      <h2>How</h2>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;Transitstat.us is built with React, Vite, and
        Node.js across three packages (
        <a href='https://github.com/piemadd/gtfs-schedule-data' target='_blank'>
          gtfs-schedule-data
        </a>
        ,{" "}
        <a href='https://github.com/piemadd/store' target='_blank'>
          store
        </a>
        , and{" "}
        <a href='https://github.com/piemadd/transitstatus' target='_blank'>
          transitstatus
        </a>
        ). Each package serves a diffferent purpose, but they all work together
        to provide the data for this site. The GTFS data is parsed into a more
        processable format by the gtfs-schedule-data package. Real time data is
        downloaded and parsed by the store package and then combined with the
        schedule data. The transitstatus package is for the frontend you are
        using now, only communicating directly with the store package.
      </p>
      <h2>Who</h2>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;Hi, I'm Piero. I'm a programmer and transit
        advocate based out of Chicago, IL. You can find out more about me{" "}
        <a href='https://piemadd.com/' target='__blank'>
          on my website
        </a>
        .
      </p>
      <h2>Extras</h2>
      <p>
        Nothing for now :)
      </p>
      <h2>Privacy Policy</h2>
      <p>
        The privacy policy can be found <a href='/privacy'>here</a>.
      </p>
      <br />
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
    </div>
  );
};

export default About;
