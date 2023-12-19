import { Link } from "react-router-dom";
import { agencies, config } from "../../config";
import { hoursMinutesUntilArrival, timeFormat } from "../extras/dateTimeTools";

const StationETAs = ({ destinationKey, station, agency }) => {
  let lines = {};

  station.destinations[destinationKey].trains.forEach((train) => {
    if (!lines[train.lineCode]) {
      lines[train.lineCode] = {
        name: train.line,
        color: train.lineColor,
        textColor: train.lineTextColor,
        etas: [],
      };
    }

    lines[train.lineCode].etas.push({
      runNumber: train.runNumber,
      noETA: train.noETA,
      actualETA: train.actualETA,
    });
  });

  return (
    <div key={destinationKey} className='trains'>
      {station.destinations[destinationKey].trains.length > 0 ? (
        <>
          <h3 className='destination'>Towards {destinationKey}</h3>
          <div className='betterTrainFullHolder'>
            <div
              className='betterTrainMeta'
              style={{
                color: "#FFFFFF",
                backgroundColor: "#c60c30",
              }}
            >
              <p>Red Line to</p>
              <h3>Howard</h3>
            </div>
            <div className='betterTrainHolder'>
              <div
                className='betterTrain'
                style={{
                  color: "#FFFFFF",
                  backgroundColor: "#c60c30",
                }}
              >
                <h3>5m</h3>
                <p>06:24 PM</p>
              </div>
              <div
                className='betterTrain'
                style={{
                  color: "#FFFFFF",
                  backgroundColor: "#c60c30",
                }}
              >
                <h3>5m</h3>
                <p>06:24 PM</p>
              </div>
              <div
                className='betterTrain'
                style={{
                  color: "#FFFFFF",
                  backgroundColor: "#c60c30",
                }}
              >
                <h3>5m</h3>
                <p>06:24 PM</p>
              </div>
            </div>
          </div>
          {station.destinations[destinationKey].trains
            .sort((a, b) => {
              if (!a.actualETA) return -1;
              if (!b.actualETA) return 1;
              return a.actualETA - b.actualETA;
            })
            .map((train) => {
              return (
                <Link
                  to={`/${agency}/track/${train.runNumber}`}
                  key={train.runNumber}
                  className='trainLink'
                >
                  <div
                    className='train'
                    style={{
                      backgroundColor: `#${train.lineColor}`,
                      color: `#${train.lineTextColor}`,
                    }}
                  >
                    <span>
                      <p>
                        {agencies[agency].useCodeForShortName
                          ? train.lineCode
                          : train.line}
                        {agencies[agency].addLine ? " Line " : " "}#
                        {agencies[agency].removeLineCodeFromRunNumber
                          ? train.runNumber.replace(train.lineCode, "")
                          : train.runNumber}{" "}
                        to
                      </p>
                      <h3>
                        {destinationKey ? destinationKey : train.routeLongName}
                      </h3>
                      {train.extra && train.extra.info ? (
                        <p>{train.extra.info}</p>
                      ) : null}
                    </span>
                    {!train.noETA ? (
                      <span>
                        <h3 className='trainLink'>
                          {hoursMinutesUntilArrival(train.actualETA)}
                        </h3>
                        <p
                          className='trainLink'
                          style={{
                            fontSize: "0.8em",
                          }}
                        >
                          {timeFormat(train.actualETA)}
                        </p>
                        {train.extra && train.extra.cap ? (
                          <p
                            className='trainLink'
                            style={{
                              fontSize: "0.8em",
                            }}
                          >
                            {Math.ceil(
                              (train.extra.load / train.extra.cap) * 100
                            )}
                            % Full
                          </p>
                        ) : null}
                      </span>
                    ) : (
                      <span>
                        <h3 className='trainLink'>No ETA</h3>
                        {train.extra && train.extra.cap ? (
                          <p
                            className='trainLink'
                            style={{
                              fontSize: "0.8em",
                            }}
                          >
                            {Math.ceil(
                              (train.extra.load / train.extra.cap) * 100
                            )}
                            % Full
                          </p>
                        ) : null}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
        </>
      ) : (
        <>
          <p className='destination'>
            No {agencies[agency].typePlural} towards {destinationKey}
          </p>
        </>
      )}
    </div>
  );
};

export default StationETAs;
