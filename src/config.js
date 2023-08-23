export const agencies = {
  ctat: {
    name: "CTA",
    selectionName: 'Chicago (CTA) Trains',
    endpoint: "https://store.piemadd.com/cta_trains/transitStatus",
    mapShapes: "https://gtfs.piemadd.com/data/cta/shapes/type_1.geojson",
    gtfsRoot: "https://gtfs.piemadd.com/data/cta",
    color: "#2166b1",
    textColor: "#ffffff",
    type: 'Train',
    typeCode: 'train',
    addLine: true,
    disabled: false,
    useCodeForShortName: false,
  },
  metra: {
    name: "Metra",
    selectionName: 'Metra',
    endpoint: "https://store.piemadd.com/metra/transitStatus",
    mapShapes: "https://gtfs.piemadd.com/data/metra/shapes/type_2.geojson",
    gtfsRoot: "https://gtfs.piemadd.com/data/metra",
    color: "#005195",
    textColor: "#ffffff",
    type: 'Train',
    typeCode: 'train',
    addLine: false,
    disabled: false,
    useCodeForShortName: true,
  },
};

export const config = {
  siteTitle: 'Transit Stat.us',
  tagLine: 'Open source, free, and easy transit tracker.',
  version: '0.6.0 Beta',
  additionalWarnings: [
    'Heads up: this shit will probably break!'
  ]
};