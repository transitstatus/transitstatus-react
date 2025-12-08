import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error.jsx";
import LoadingPage from "./loading";
import { DataManager } from "./dataManager.js";

console.log(`DM-N: ${window.dataManager}`)
const dataManager = new DataManager();
window.dataManager = dataManager;

const Index = React.lazy(() => import("./paths/index/index.jsx"));
const About = React.lazy(() => import("./paths/index/about.jsx"));
const Settings = React.lazy(() => import("./paths/index/settings.jsx"));
const Privacy = React.lazy(() => import("./paths/index/privacy.jsx"));
const ChangeLog = React.lazy(() => import("./paths/index/changelog.jsx"));
const API = React.lazy(() => import("./paths/index/api.jsx"));
const Agency = React.lazy(() => import("./paths/agency/agency.jsx"));
const AllTrains = React.lazy(() => import("./paths/agency/allTrains.jsx"));
const Line = React.lazy(() => import("./paths/agency/line.jsx"));
const LineQS = React.lazy(() => import("./paths/agency/lineQS.jsx"));
const Station = React.lazy(() => import("./paths/agency/station.jsx"));
const StationDisplay = React.lazy(() => import("./paths/agency/stationDisplay.jsx"));
const Trip = React.lazy(() => import("./paths/agency/trip.jsx"));
const Map = React.lazy(() => import("./paths/agency/map.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:agency",
    element: <Agency />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:agency/map",
    element: <Map />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:agency/track/all",
    element: <AllTrains/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:agency/track/:tripID",
    element: <Trip />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:agency/stops/:stopID",
    element: <Station />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:agency/stops/display/:stopID",
    element: <StationDisplay />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:agency/:urlLineName",
    element: <Line />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:agency/:lineName/qs",
    element: <LineQS />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/places/:places",
    element: <>Places Page</>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/changelog",
    element: <ChangeLog />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/api",
    element: <API />,
    errorElement: <ErrorPage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

const existingURL = new URL(document.location);
const queryParameters = Object.fromEntries(existingURL.searchParams);

let needToRefreshNow = false;

if (queryParameters.addSettings) {
  const currentSettings = JSON.parse(localStorage.getItem('transitstatus_v1_settings') ?? '{}');
  queryParameters.addSettings
    .split(';')
    .filter((s) => s.length > 0)
    .map((settingRaw) => settingRaw.split(':'))
    .forEach((settingArray) => {
      if (settingArray.length != 2) console.log('Something is wrong with settingArray', settingArray);
      else currentSettings[settingArray[0]] = JSON.parse(settingArray[1]); // not the fastest, but auto converts types for me
    });
  delete queryParameters['addSettings'];
  needToRefreshNow = true;
  localStorage.setItem('transitstatus_v1_settings', JSON.stringify(currentSettings));
}

if (queryParameters.addFavoriteAgency) {
  const currentFavoriteAgencies = JSON.parse(localStorage.getItem('favorites-transitstatus-v1-agencies') ?? '{}');
  queryParameters.addFavoriteAgency
    .split(';')
    .filter((s) => s.length > 0)
    .forEach((agencyKey) => {
      currentFavoriteAgencies[agencyKey] = agencyKey;
    });
  delete queryParameters['addFavoriteAgency'];
  needToRefreshNow = true;
  localStorage.setItem('favorites-transitstatus-v1-agencies', JSON.stringify(currentFavoriteAgencies));
}

if (needToRefreshNow) {
  const originAndPathName = existingURL.origin + existingURL.pathname;
  const optionalQuestionMark = Object.keys(queryParameters).length > 0 ? '?' : '';
  const newQueryParameters = new URLSearchParams(queryParameters).toString();
  location.replace(`${originAndPathName}${optionalQuestionMark}${newQueryParameters}`)
}

dataManager.checkDataStatusAndUpdate()
  .then(() => {
    root.render(
      <React.Suspense fallback={<LoadingPage />}>
        <RouterProvider router={router} />
      </React.Suspense>
    );
  })
