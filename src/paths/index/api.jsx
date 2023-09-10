import { useNavigate } from "react-router-dom";

const API = () => {
  const navigate = useNavigate();

  document.title = "API | React App";

  return (
    <div>
      <h1>API Guide</h1>
      <p>
        Transitstat.us doesn't use a single API, but a handful of APIs which all
        follow the same specification. In this short guide, you'll be able to
        see the spec and fuck around with some examples.{" "}
      </p>
      <br />
      <p
        onClick={() => {
          if (history.state.idx && history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate("/", { replace: true }); //fallback
          }
        }}
        style={{
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        Back Home
      </p>
    </div>
  );
};

export default API;
