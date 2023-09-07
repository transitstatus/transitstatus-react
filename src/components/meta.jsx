import { config } from "../config";

const Meta = () => {
  return (
    <div
      style={{
        marginLeft: "2px",
        marginTop: "-2px",
        marginBottom: "-8px",
      }}
    >
      <p>by <a href='https://piemadd.com/' target="__blank">Piero</a></p>
      <p>{config.tagLine}</p>
      <p>{config.version}</p>
      {config.additionalWarnings.map((warning, i) => {
        return <p key={i}>{warning}</p>;
      })}
    </div>
  );
};

export default Meta;