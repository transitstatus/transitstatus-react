export const agencies = {
  ctat: {
    name: "CTA",
    selectionName: 'CTA (Trains)',
    endpoint: "https://store.piemadd.com/cta_trains/transitStatus",
    color: "#2166b1",
    textColor: "#ffffff",
    type: 'Train',
    addLine: true,
    disabled: false,
    useCodeForShortName: false,
  },
  metra: {
    name: "Metra",
    selectionName: 'Metra',
    endpoint: "https://store.piemadd.com/metra/transitStatus",
    color: "#005195",
    textColor: "#ffffff",
    type: 'Train',
    addLine: false,
    disabled: false,
    useCodeForShortName: true,
  },
};

export const config = {
  siteTitle: 'Transit Stat.us',
  tagLine: 'Open source, free, and easy transit tracker.',
  version: '0.5.4 Beta',
  additionalWarnings: [
    'Heads up: this shit will probably break!'
  ]
};