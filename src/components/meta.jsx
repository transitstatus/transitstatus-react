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
      <p>{config.siteTitleOther} {config.version} by <a href='https://piemadd.com/' target="_blank">Piero</a></p>
      {config.additionalWarnings.map((warning, i) => {
        return <p key={i}>{warning}</p>;
      })}
    </div>
  );
};

export default Meta;