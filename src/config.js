export const agencies = {
  ctat: {
    name: "CTA",
    selectionName: 'Chicago (CTA) Trains',
    endpoint: "https://store.piemadd.com/cta_trains/transitStatus",
    mapShapes: "https://gtfs.piemadd.com/data/cta/shapes/type_1.geojson",
    gtfsRoot: "https://gtfs.piemadd.com/data/cta",
    mapDefault: [41.900296392725636, -87.6650873752688, 10],
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
    mapDefault: [42.00716298759261, -87.9244703152358, 9],
    color: "#005195",
    textColor: "#ffffff",
    type: 'Train',
    typeCode: 'train',
    addLine: false,
    disabled: false,
    useCodeForShortName: true,
  },
  southshore: {
    name: "South Shore Line",
    selectionName: 'South Shore Line',
    endpoint: "https://store.piemadd.com/southshore/transitStatus",
    mapShapes: "https://gtfs.piemadd.com/data/southshore/shapes/type_2.geojson",
    gtfsRoot: "https://gtfs.piemadd.com/data/southshore",
    mapDefault: [41.78803440543757, -86.99159058472856, 9],
    color: "#6a1a18",
    textColor: "#ffffff",
    type: 'Train',
    typeCode: 'train',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
  }
};

export const config = {
  siteTitle: 'Transit Stat.us',
  tagLine: 'Open source, free, and easy transit tracker.',
  version: '0.7.1 Beta',
  additionalWarnings: [
    'Heads up: this shit will probably break!'
  ]
};