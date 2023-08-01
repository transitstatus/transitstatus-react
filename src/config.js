export const agencies = {
  ctat: {
    name: "CTA Trains",
    endpoint: "https://store.piemadd.com/cta_trains/transitStatus",
    color: "#2166b1",
    textColor: "#ffffff",
    type: 'Train',
    addLine: true,
    disabled: true,
  },
  metra: {
    name: "Metra",
    endpoint: "https://store.piemadd.com/metra/transitStatus",
    color: "#005195",
    textColor: "#ffffff",
    type: 'Train',
    addLine: false,
    disabled: false,
  },
};

export const config = {
  siteTitle: 'Transit Stat.us',
  tagLine: 'Open source, free, and easy transit tracker.',
  version: '0.4.0 Beta',
  additionalWarnings: [
    'Heads up: this shit will probably break!'
  ]
};