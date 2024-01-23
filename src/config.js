export const agencies = {
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
    disabled: true,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    removeLineCodeFromRunNumber: false,
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
  },
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
  },
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
    removeLineCodeFromRunNumber: true,
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
  }
};

export const config = {
  siteTitle: 'Transit Stat.us',
  tagLine: 'Open source, free, and easy transit tracker.',
  version: 'Transitstat.us v1.11.2',
  additionalWarnings: [],
  globalAlerts: [
    {
      title: 'Happy New Year!',
      info: 'Happy New Year from the Transitstatus team (ok yeah i\'m just one person, but shhhh)! Big changes coming in 2024, more info to come!',
      expires: 1704866400000
    },
    {
      title: 'Transitstat.us Improvement Survey',
      info: 'Please take some time to complete the following survey to improve Transitstatus.',
      linkText: 'Survey Link',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSc8DdXR6EQ9Gu21Wl1QAW9GM1ZUj_A7nkwGx65aNZyxBJsVUA/viewform?usp=sf_link',
      expires: 1705730400000
    }
  ]
};