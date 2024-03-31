export const agencies = {
  amtraker: {
    name: "Amtraker",
    selectionName: 'Amtraker (Beta)',
    endpoint: "https://store.transitstat.us/atsa/ts",
    mapShapes: [
      "https://gtfs.piemadd.com/data/amtrak/shapes/type_2.geojson",
      "https://gobbler.transitstat.us/additionalShapes/amtrak.json"
    ],
    gtfsRoot: "https://gtfs.piemadd.com/data/amtrak",
    mapDefault: [37.69061057535559, -122.2893385041706, 5],
    color: "#024D77",
    textColor: "#F7F7F7F7",
    type: 'Train',
    typePlural: 'Trains',
    typeCode: 'train',
    typeCodePlural: 'trains',
    addLine: false,
    disabled: true,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: true,
  },
  bay: {
    name: "Bay Area",
    selectionName: 'Bay Area (Minus Bart)',
    endpoint: "https://store.transitstat.us/bay",
    mapShapes: [
      "https://gtfs.piemadd.com/data/RG/shapes/type_0.geojson",
      "https://gtfs.piemadd.com/data/RG/shapes/type_1.geojson",
      "https://gtfs.piemadd.com/data/RG/shapes/type_2.geojson",
      "https://gtfs.piemadd.com/data/RG/shapes/type_3.geojson",
      "https://gtfs.piemadd.com/data/RG/shapes/type_4.geojson",
      "https://gtfs.piemadd.com/data/RG/shapes/type_5.geojson",
    ],
    gtfsRoot: "https://gtfs.piemadd.com/data/RG",
    mapDefault: [37.69061057535559, -122.2893385041706, 5],
    color: "#48a136",
    textColor: "#ffffff",
    type: 'Train',
    typePlural: 'Trains',
    typeCode: 'train',
    typeCodePlural: 'trains',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  ctat: {
    name: "CTA",
    selectionName: 'Chicago (CTA) Trains',
    endpoint: "https://store.transitstat.us/cta_trains/transitStatus",
    mapShapes: ["https://gtfs.piemadd.com/data/cta/shapes/type_1.geojson"],
    gtfsRoot: "https://gtfs.piemadd.com/data/cta",
    mapDefault: [41.900296392725636, -87.6650873752688, 10],
    color: "#2166b1",
    textColor: "#ffffff",
    type: 'Train',
    typePlural: 'Trains',
    typeCode: 'train',
    typeCodePlural: 'trains',
    addLine: true,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  snowpiercer: {
    name: "Snowpiercer",
    selectionName: 'Snowpiercer',
    endpoint: "https://store.transitstat.us/snowpiercer/v1",
    mapShapes: ["https://gobbler.transitstat.us/additionalShapes/snowPiercer.json"],
    gtfsRoot: "https://gobbler.transitstat.us/piercer",
    mapDefault: [37.6362722722116, -96.71855316394493, 3],
    color: "#a5c9d7",
    textColor: "#000000",
    type: 'Train',
    typePlural: 'Trains',
    typeCode: 'train',
    typeCodePlural: 'trains',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: false,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: true,
    autoFitMaxZoom: 5,
  },
  /*
  ctab: {
    name: "CTAB",
    selectionName: 'Chicago (CTA) Holiday Bus',
    endpoint: "https://store.transitstat.us/holidaybus",
    mapShapes: ["https://gtfs.piemadd.com/data/cta/shapes/type_3.geojson"],
    gtfsRoot: "https://gtfs.piemadd.com/data/cta",
    mapDefault: [41.900296392725636, -87.6650873752688, 10],
    color: "#2166b1",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: true,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  */
  metra: {
    name: "Metra",
    selectionName: 'Metra',
    endpoint: "https://store.transitstat.us/metra/transitStatus",
    mapShapes: ["https://gtfs.piemadd.com/data/metra/shapes/type_2.geojson"],
    gtfsRoot: "https://gtfs.piemadd.com/data/metra",
    mapDefault: [42.00716298759261, -87.9244703152358, 9],
    color: "#005195",
    textColor: "#ffffff",
    type: 'Train',
    typePlural: 'Trains',
    typeCode: 'train',
    typeCodePlural: 'trains',
    addLine: false,
    disabled: false,
    useCodeForShortName: true,
    addShortName: true,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  southshore: {
    name: "South Shore Line",
    selectionName: 'South Shore Line',
    endpoint: "https://store.transitstat.us/southshore/transitStatus",
    mapShapes: ["https://gtfs.piemadd.com/data/southshore/shapes/type_2.geojson"],
    gtfsRoot: "https://gtfs.piemadd.com/data/southshore",
    mapDefault: [41.78803440543757, -86.99159058472856, 9],
    color: "#6a1a18",
    textColor: "#ffffff",
    type: 'Train',
    typePlural: 'Trains',
    typeCode: 'train',
    typeCodePlural: 'trains',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: true,
    showArrow: false,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  rutgers: {
    name: "Rutgers",
    selectionName: 'Rutgers Shuttles',
    endpoint: "https://store.transitstat.us/passio_go/rutgers",
    mapShapes: ["https://passio.piemadd.com/data/rutgers/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/rutgers",
    mapDefault: [40.35417700651374, -74.70768648283568, 9],
    color: "#ca1735",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  columbia: {
    name: "Columbia",
    selectionName: 'Columbia (NYC)',
    endpoint: "https://store.transitstat.us/passio_go/columbia",
    mapShapes: ["https://passio.piemadd.com/data/columbia/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/columbia",
    mapDefault: [40.784908389672594, -73.98111316142203, 9],
    color: "#386cb4",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  uchicago: {
    name: "UChicago",
    selectionName: 'UChicago Shuttles',
    endpoint: "https://store.transitstat.us/passio_go/chicago",
    mapShapes: ["https://passio.piemadd.com/data/chicago/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/chicago",
    mapDefault: [41.83695214205909, -87.60849773242845, 11],
    color: "#ca1735",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  gcsu: {
    name: "Georgia College & State",
    selectionName: 'GCSU Shuttles',
    endpoint: "https://store.transitstat.us/passio_go/gcsu",
    mapShapes: ["https://passio.piemadd.com/data/gcsu/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/gcsu",
    mapDefault: [33.080000, -83.230000, 13],
    color: "#2a6054",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  'georgiast': {
    name: "Georgia State",
    selectionName: 'Georgia State Shuttles',
    endpoint: "https://store.transitstat.us/passio_go/georgiast",
    mapShapes: ["https://passio.piemadd.com/data/georgiast/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/georgiast",
    mapDefault: [33.753746, -84.386330, 13],
    color: "#083fa9",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  'gatech': {
    name: "Georgia Tech",
    selectionName: 'Georgia Tech Stinger Shuttles',
    endpoint: "https://store.transitstat.us/passio_go/gatech",
    mapShapes: ["https://passio.piemadd.com/data/gatech/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/gatech",
    mapDefault: [33.775617, -84.396284, 13],
    color: "#ad9b62",
    textColor: "#000000",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  'GASO': {
    name: "Georgia Southern",
    selectionName: 'Georgia Southern Shuttles',
    endpoint: "https://store.transitstat.us/passio_go/GASO",
    mapShapes: ["https://passio.piemadd.com/data/GASO/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/GASO",
    mapDefault: [32.421000, -81.786000, 13],
    color: "#152747",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  'MIT': {
    name: "MIT",
    selectionName: 'MIT Shuttles',
    endpoint: "https://store.transitstat.us/passio_go/mit",
    mapShapes: ["https://passio.piemadd.com/data/mit/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/mit",
    mapDefault: [42.360000, -71.092000, 13],
    color: "#9e1e32",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  'uncc': {
    name: "UNC Charlotte",
    selectionName: 'UNC Charlotte Shuttles',
    endpoint: "https://store.transitstat.us/passio_go/uncc",
    mapShapes: ["https://passio.piemadd.com/data/uncc/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/uncc",
    mapDefault: [-80.740070, 35.303950, 13],
    color: "#005035",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: true,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  'uncg': {
    name: "UNC Greensboro",
    selectionName: 'UNC Greensboro Shuttles',
    endpoint: "https://store.transitstat.us/passio_go/uncg",
    mapShapes: ["https://passio.piemadd.com/data/uncg/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/uncg",
    mapDefault: [36.067170, -79.813064, 13],
    color: "#0f2044",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  'uncw': {
    name: "UNC Wilmington",
    selectionName: 'UNC Wilmington Shuttles',
    endpoint: "https://store.transitstat.us/passio_go/uncw",
    mapShapes: ["https://passio.piemadd.com/data/uncw/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/uncw",
    mapDefault: [34.224030, -77.871050, 13],
    color: "#008485",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  'bama': {
    name: "University of Alabama",
    selectionName: 'University of Alabama Shuttles',
    endpoint: "https://store.transitstat.us/passio_go/bamabama",
    mapShapes: ["https://passio.piemadd.com/data/bamabama/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/bamabama",
    mapDefault: [33.206220, -87.536116, 13],
    color: "#900f0f",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  },
  'ncstate': {
    name: "NC State",
    selectionName: 'NC State Shuttles',
    endpoint: "https://store.transitstat.us/passio_go/ncstateuni",
    mapShapes: ["https://passio.piemadd.com/data/ncstateuni/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/ncstateuni",
    mapDefault: [35.785020, -78.694083, 13],
    color: "#cc0000",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
    dontFilterMapLines: false,
  }
};

export const config = {
  siteTitle: 'Transit Stat.us',
  tagLine: 'Open source, free, and easy transit tracker.',
  version: 'Transitstat.us v1.11.12',
  additionalWarnings: [],
  globalAlerts: [
    {
      title: 'Temporary Outage',
      info: 'We apologize for the temporary outage yesterday due to an expired domain. All systems are now fully operational and we have ensured all domains automatically renew from now on.',
      expires: 1711123200000
    },
    {
      title: 'Transitstat v2 Early Beta',
      info: 'Transitstat v2 has hit its beta stage. It is a little unstable and unreliable, but feel free to test it out and send any feedback to piero@piemadd.com.',
      linkText: 'Beta Link',
      link: 'https://betamap.transitstat.us/',
      expires: 253402430399000
    }
  ]
};