import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error.jsx";
import LoadingPage from "./loading";

const Index = React.lazy(() => import("./paths/index/index.jsx"));
const About = React.lazy(() => import("./paths/index/about.jsx"));
const Settings = React.lazy(() => import("./paths/index/settings.jsx"));
const Privacy = React.lazy(() => import("./paths/index/privacy.jsx"));
const Agency = React.lazy(() => import("./paths/agency/agency.jsx"));
const Line = React.lazy(() => import("./paths/agency/line.jsx"));
const Station = React.lazy(() => import("./paths/agency/station.jsx"));
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
    path: "/:agency/:lineName",
    element: <Line />,
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.Suspense fallback={<LoadingPage />}>
    <RouterProvider router={router} />
  </React.Suspense>
);
