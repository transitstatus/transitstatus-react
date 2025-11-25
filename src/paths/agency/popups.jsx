import { Fragment } from 'react/jsx-runtime';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { hoursMinutesUntilArrival, sortFeaturesByClosestToPoint } from '../../components/extras/randomTools';
import { Popup } from 'maplibre-gl';

const activatePopup = (map, component, popup, bypassHTML = null) => {
  if (bypassHTML) { // TODO remove
    popup.setHTML(bypassHTML).addTo(map.current);
    return;
  };
  const div = document.createElement('div');
  const root = createRoot(div);
  flushSync(() => {
    root.render(component);
  });

  popup.setDOMContent(div).addTo(map.current);
};

export const activateSelectorPopup = (e, features, map, agencyData, singleRouteID) => {
  const finalItems = sortFeaturesByClosestToPoint([e.lngLat.lng, e.lngLat.lat], features).slice(0, 5);
  const hasTrains = finalItems.find((item) => item.layer.id == 'trains');
  const hasStations = finalItems.find((item) => item.layer.id == 'stations');

  let titleText = 'Feature';
  if (hasTrains && !hasStations) titleText = 'Train';
  if (!hasTrains && hasStations) titleText = 'Station';

  const selectorPopup = new Popup({
    //offset: 16,
    closeButton: true,
    anchor: "bottom",
    maxWidth: false,
  })
    .setLngLat(e.lngLat);

  const predictions = finalItems
    .map((item, i) => {
      console.log(item)
      switch (item.layer.id) {
        case 'trains':
          const train = item.properties;
          return <p
            key={i}
            className='mapTrainBar'
            style={{
              color: train.holidayAddition == "_candyCane" ? '#ffffff' : `#${train.lineTextColor}`,
              background: train.holidayAddition == "_candyCane" ? "repeating-linear-gradient(135deg, #94000a, #94000a 10px, #077001 10px, #077001 20px)" : `#${train.lineColor}`,
              cursor: 'pointer'
            }}
            onClick={() => {
              selectorPopup.remove();
              activateTrainPopup(item, map, agencyData);
            }}
          >
            <strong
              style={{ filter: train.holidayAddition == '_candyCane' ? 'drop-shadow(0px 0px 2px #000000)' : null, }}
            >
              {agencyData.useCodeForShortName ? train.lineCode : train.line}
              {agencyData.addLine ? " Line " : " "}
              {agencyData.tripIDPrefixMinimal}
              {agencyData.runNumberConverter ? agencyData.runNumberConverter(train.id) : train.id}{!train.deadMileage ? <> to {train.dest}</> : null}
            </strong>
            <strong className='smallIdentifier'>{agencyData.type}</strong>
          </p>
        case 'stations':
          const station = item.properties;
          return <p
            key={i}
            className='mapTrainBar'
            style={{ color: agencyData.textColor, backgroundColor: agencyData.color, cursor: 'pointer' }}
            onClick={() => {
              selectorPopup.remove();
              activateStationPopup(item, map, agencyData, singleRouteID);
            }}
          >
            <strong>{station.stationName}</strong>
            <strong className='smallIdentifier'>Station</strong>
          </p>
      }
    })

  const selectorElement = <div className='mapBar'>
    <h3>Select a {titleText}</h3>
    {predictions}
  </div>;

  activatePopup(map, selectorElement, selectorPopup);
};

export const activateTrainPopup = (feature, map, agencyData) => {
  const train = feature.properties;
  const coordinates = feature.geometry.coordinates.slice();

  const predictions = JSON.parse(train.predictions)
    .sort((a, b) => a.actualETA - b.actualETA)
    .filter((eta) => eta.actualETA >= Date.now() - (1000 * 60 * 5) || eta.noETA)
    .slice(0, 5)
    .map((prediction, i) => <p key={i} className='mapTrainBar' style={{
      color: `#${train.lineTextColor}`,
      backgroundColor: `#${train.lineColor}`,
    }}>
      <strong>{prediction.stationName}</strong>
      <strong>{prediction.noETA ? "No ETA" : hoursMinutesUntilArrival(new Date(prediction.actualETA))}</strong>
    </p>)

  const extra = train.extra ? JSON.parse(train.extra) : null;

  const trainElement = <div className='mapBar'>
    <h3>
      {agencyData.useCodeForShortName ? train.lineCode : train.line}
      {agencyData.addLine ? " Line " : " "}
      {agencyData.tripIDPrefix}
      {agencyData.runNumberConverter ? agencyData.runNumberConverter(train.id) : train.id}{!train.deadMileage ? <> to {train.dest}</> : null}
    </h3>
    {extra && (extra.cap || extra.info) ? <p style={{ marginTop: '-2px', paddingBottom: '4px' }}>
      {extra.info ?? ""}
      {extra.cap && extra.info ? " | " : ""}
      {extra.cap ? `${Math.ceil((extra.load / extra.cap) * 100)}% Full` : ""}
    </p> : null}
    {extra && (extra.last_update || extra.last_station) ? <p style={{ marginTop: '-2px', paddingBottom: '4px' }}>
      {extra.last_update ? `Last Updated ${extra.last_update}`: ""}
      {extra.last_update && extra.last_station ? " | " : ""}
      {extra.last_station ? `Last Station ${extra.last_station}` : ""}
    </p> : null}
    {predictions}
    <p className='mapTrainBar' style={{
      color: train.holidayAddition == "_candyCane" ? '#ffffff' : `#${train.lineTextColor}`,
      background: train.holidayAddition == "_candyCane" ? "repeating-linear-gradient(135deg, #94000a, #94000a 10px, #077001 10px, #077001 20px)" : `#${train.lineColor}`,
    }}>
      <strong style={{ filter: train.holidayAddition == '_candyCane' ? 'drop-shadow(0px 0px 2px #000000)' : null }}>
        <a
          href={`/${agencyData.agencyID}/track/${train.id}?prev=map`}
          style={{
            color: train.holidayAddition == '_candyCane' ? '#ffffff' : `#${train.lineTextColor}`,
            backgroundColor: train.holidayAddition == '_candyCane' ? '#00000000' : `#${train.lineColor}`
          }}>
          View Full {agencyData.type}
        </a>
      </strong>
    </p>
  </div>

  const trainPopup = new Popup({
    offset: 12,
    closeButton: true,
    anchor: "bottom",
  }).setLngLat(coordinates);

  activatePopup(map, trainElement, trainPopup);
};

export const activateStationPopup = (feature, map, agencyData, singleRouteID) => {
  const station = {
    ...feature.properties,
    destinations: JSON.parse(feature.properties.destinations),
  };
  const coordinates = feature.geometry.coordinates.slice();

  let noTrainsAtAll = true;

  const predictions = Object.keys(station.destinations).map((destKey, i) => {
    const dest = station.destinations[destKey];
    let destHasLineTrains = false;

    dest.trains.forEach((train) => {
      if (
        (train.lineCode === singleRouteID ||
          singleRouteID === "all") && train.actualETA >= Date.now() - (1000 * 60 * 5)
      ) destHasLineTrains = true;
    });

    if (dest.trains.length === 0 || !destHasLineTrains) {
      return null;
    } else {
      noTrainsAtAll = false;

      return <Fragment key={i}>
        <p className='mapStationBar'>
          {agencyData.useDirectionsInsteadOfDestinations ? '' : 'To '}
          <strong>{destKey}</strong>
        </p>
        {dest.trains
          .filter((train) => (train.lineCode === singleRouteID || singleRouteID === "all") && !train.noETA)
          .sort((a, b) => a.actualETA - b.actualETA)
          .filter((eta) => eta.actualETA >= Date.now() - (1000 * 60 * 5))
          .slice(0, 3)
          .map((train, j) => {
            return <p key={j} className='mapTrainBar' style={{ color: `#${train.lineTextColor}`, backgroundColor: `#${train.lineColor}` }}>
              <span>
                <strong>{agencyData.useCodeForShortName ? train.lineCode : train.line}{agencyData.addLine ? " Line " : " "}</strong>
                {agencyData.tripIDPrefix}
                {agencyData.runNumberConverter ? agencyData.runNumberConverter(train.runNumber) : train.runNumber} to <strong>{train.destination ?? destKey}</strong>
              </span>
              <strong>{train.noETA ? "No ETA" : hoursMinutesUntilArrival(new Date(train.actualETA))}</strong>
            </p>
          })
        }
      </Fragment>
    }
  })

  const staionElement = <div className='mapBar'>
    <h3>{station.stationName}</h3>
    {predictions}
    {noTrainsAtAll ? <p className='mapTrainBar'>No {agencyData.typeCodePlural} tracking</p> : null}
    <p className='mapStationBar' style={{ color: agencyData.textColor, backgroundColor: agencyData.color }}>
      <strong>
        <a href={`/${agencyData.agencyID}/stops/${station.stationID}?prev=map`} style={{ color: agencyData.textColor, backgroundColor: agencyData.color }}>View Full Station</a>
      </strong>
    </p>
  </div>

  const stationPopup = new Popup({
    offset: 8,
    closeButton: true,
    anchor: "bottom",
  }).setLngLat(coordinates);

  activatePopup(map, staionElement, stationPopup);
};