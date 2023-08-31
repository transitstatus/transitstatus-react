import { config } from "../config";

const Meta = () => {
  return (
    <div
      style={{
        marginLeft: "2px",
        marginTop: "-4px",
        marginBottom: "4px",
      }}
    >
      <p>by Transitstat.us</p>
      <p>{config.tagLine}</p>
      <p>{config.version}</p>
      {config.additionalWarnings.map((warning, i) => {
        return <p key={i}>{warning}</p>;
      })}
    </div>
  );
};

export default Meta;