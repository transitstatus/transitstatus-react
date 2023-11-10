//this file initializes data needed for modifying settings. might move it out of a component if that makes more sense for theming stuff.

const InitializeSettings = () => {
  const settings =
    JSON.parse(localStorage.getItem("transitstatus_v1_settings")) ?? {};

  console.log("Settings:", settings);

  return settings;
};

export default InitializeSettings;
