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
    tripIDPrefix: '#',
    dontFilterMapLines: true,
  },
  brightline: {
    name: "Brightline",
    selectionName: 'Brightline',
    endpoint: "https://store.transitstat.us/brightline/v1",
    mapShapes: [
      "https://gtfs.piemadd.com/data/brightline/shapes/type_2.geojson",
    ],
    gtfsRoot: "https://gtfs.piemadd.com/data/brightline",
    mapDefault: [27.103015473022282, -80.68149, 6],
    color: "#F2E205",
    textColor: "#0A0A0A",
    type: 'Train',
    typePlural: 'Trains',
    typeCode: 'train',
    typeCodePlural: 'trains',
    addLine: false,
    disabled: false,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: true,
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
    dontFilterMapLines: false,
  },
  bart: {
    name: "BART",
    selectionName: 'Bay Area Rapid Transit (BART)',
    endpoint: "https://store.transitstat.us/bart/transitStatus",
    mapShapes: [
      "https://gtfs.piemadd.com/data/bart/shapes/type_0.geojson",
      "https://gtfs.piemadd.com/data/bart/shapes/type_1.geojson",
    ],
    gtfsRoot: "https://gtfs.piemadd.com/data/bart",
    mapDefault: [37.69496238254777, -122.12463000000002, 9.517207646032519],
    color: "#0064a8",
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
    tripIDPrefix: '',
    runNumberConverter: (runNumber) => '',
    dontFilterMapLines: true,
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
    tripIDPrefix: '#',
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
    showArrow: true,
    tripIDPrefix: '#',
    dontFilterMapLines: true,
    autoFitMaxZoom: 5,
  },
  ctab: {
    name: "CTA",
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
    tripIDPrefix: '#',
    dontFilterMapLines: false,
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
    tripIDPrefix: 'Train #',
    showTripIDOnScheduled: true,
    dontFilterMapLines: false,
    runNumberConverter: (runNumber) => runNumber.split('-').slice(-1),
    useDirectionsInsteadOfDestinations: true,
  },
  WMATA: {
    name: "WMATA",
    selectionName: 'WMATA MetroRail',
    endpoint: "https://store.transitstat.us/wmata_rail",
    mapShapes: ["https://gtfs.piemadd.com/data/wmata_rail/shapes/type_1.geojson"],
    gtfsRoot: "https://gtfs.piemadd.com/data/wmata_rail",
    mapDefault: [38.943903228525784, -77.16953659057617, 10],
    color: "#4679b0",
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
    tripIDPrefix: 'Train #',
    dontFilterMapLines: false,
  },
  NJT: {
    name: "NJT",
    selectionName: 'New Jersey Transit (Trains)',
    endpoint: "https://store.transitstat.us/njt_rail",
    mapShapes: [
      "https://gtfs.piemadd.com/data/njt_rail_nonrt/shapes/type_0.geojson",
      "https://gtfs.piemadd.com/data/njt_rail_nonrt/shapes/type_2.geojson"
    ],
    gtfsRoot: "https://gtfs.piemadd.com/data/njt_rail",
    mapDefault: [38.943903228525784, -77.16953659057617, 10],
    color: "#1a2b57",
    textColor: "#ffffff",
    type: 'Train',
    typePlural: 'Trains',
    typeCode: 'train',
    typeCodePlural: 'trains',
    addLine: false,
    disabled: true,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: false,
    tripIDPrefix: 'Train #',
    dontFilterMapLines: true,
  },
  marta: {
    name: "MARTA",
    selectionName: 'MARTA (Atlanta Trains)',
    endpoint: "https://store.transitstat.us/martat/v1",
    mapShapes: ["https://gtfs.piemadd.com/data/marta/shapes/type_1.geojson"],
    gtfsRoot: "https://gtfs.piemadd.com/data/marta",
    mapDefault: [36.57236484298264, -96.27495103346894, 3],
    color: "#ff7600",
    textColor: "#000000",
    type: 'Train',
    typePlural: 'Trains',
    typeCode: 'train',
    typeCodePlural: 'trains',
    addLine: true,
    disabled: false,
    useCodeForShortName: true,
    addShortName: true,
    showArrow: false,
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
    dontFilterMapLines: false,
  },
  mff: {
    name: "MFF",
    selectionName: 'Midwest Furry Fest',
    endpoint: "https://store.transitstat.us/mff",
    mapShapes: ["https://gobbler.transitstat.us/additionalShapes/mff.json"],
    gtfsRoot: "https://gtfs.piemadd.com/data/southshore",
    mapDefault: [41.9915363, -87.8728995, 13],
    color: "#4776bb",
    textColor: "#ffffff",
    type: 'Bus',
    typePlural: 'Buses',
    typeCode: 'bus',
    typeCodePlural: 'buses',
    addLine: true,
    disabled: true,
    useCodeForShortName: false,
    addShortName: false,
    showArrow: false,
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
    dontFilterMapLines: false,
  },
  gobus: {
    name: "GOBus",
    selectionName: "GOBus",
    endpoint: 'https://store.transitstat.us/passio_go/miller',
    mapShapes: ["https://passio.piemadd.com/data/miller/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/miller",
    mapDefault: [40.371579, -82.189678, 6],
    color: "#084a31",
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
    tripIDPrefix: '#',
    dontFilterMapLines: false,
  },
  georgiast: {
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
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
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
    tripIDPrefix: '#',
    dontFilterMapLines: false,
  },
  'ritech': {
    name: "RIT",
    selectionName: 'RIT Shuttles',
    endpoint: "https://store.transitstat.us/passio_go/ritech",
    mapShapes: ["https://passio.piemadd.com/data/ritech/shapes.json"],
    gtfsRoot: "https://passio.piemadd.com/data/ritech",
    mapDefault: [43.07044242490457, -77.65360867499999, 13],
    color: "#f76902",
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
    tripIDPrefix: '#',
    dontFilterMapLines: false,
  },
  'bigboy': {
    name: "UP Big Boy",
    selectionName: 'UP Big Boy',
    endpoint: "https://bigboyapi.amtraker.com/",
    mapShapes: [
      "https://gobbler.transitstat.us/additionalShapes/bigboypart1.json",
      "https://gobbler.transitstat.us/additionalShapes/bigboypart2.json",
      "https://gobbler.transitstat.us/additionalShapes/bigboypart3.json",
      "https://gobbler.transitstat.us/additionalShapes/bigboypart4.json",
      "https://gobbler.transitstat.us/additionalShapes/bigboypart5.json",
    ],
    gtfsRoot: "https://gtfs.piemadd.com/data/amtrak",
    mapDefault: [36.57236484298264, -96.27495103346894, 3],
    color: "#feca00",
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
    tripIDPrefix: '#',
    dontFilterMapLines: false,
  }
};

export const config = {
  siteTitle: 'Transitstat.us',
  siteTitleOther: 'Transitstatus',
  tagLine: 'Open source, free, and easy transit tracker.',
  version: 'v1.15.1',
  additionalWarnings: [],
  globalAlerts: [
    {
      title: 'Scheduled Trains Test',
      info: 'We are testing the use of GTFS schedule data to show trains that are not yet running for Metra. If these tests prove to be successful, we will expand the data to other systems.',
      expires: 1737352799999
    },
    {
      title: 'Transitstat v2 Early Beta',
      info: 'Transitstat v2 has hit its beta stage. It is a little unstable and unreliable, but feel free to test it out and send any feedback to piero@piemadd.com.',
      linkText: 'Beta Link',
      link: 'https://betamap.transitstat.us/',
      expires: -253402430399000
    }
  ]
};