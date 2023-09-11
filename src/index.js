import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import RecipeSearch from "./Routes/RecipeSearch";
import Trains from "./Routes/Trains";
// import RecipeEdit from "./Routes/RecipeEdit";
import Materials from "./Routes/Materials";
import RecipeProcedure from "./Routes/RecipeProcedure";
import ErrorLog from "./Routes/ErrorLog";
import ReportCIP from "./Routes/ReportCIP";
import SampleCIPReport from "./Routes/SampleCIPReport";
import Home from "./Home";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

import { getProcedureData } from "./Requests/RecipeProcedure";

async function procedureLoader({ params }) {
  const procedureData = await getProcedureData(params.RID, params.Version);
  return { procedureData };
}

// Routes for frontend navigation
// TODO: Create an error route
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "recipes",
        element: <RecipeSearch />,
      },
      {
        path: "trains",
        element: <Trains />,
      },
      //   {
      //     path: "recipes/:RID/:Version/edit",
      //     element: <RecipeEdit />,
      //   },
      {
        path: "materials",
        element: <Materials />,
      },
      {
        path: "procedure",
        element: <RecipeProcedure />,
        loader: () => {
          return {
            procedureData: {
              procedure: null,
              requiredProcessClasses: null,
              RID: null,
              Version: null,
            },
          };
        },
      },
      {
        path: "procedure/:RID/:Version",
        element: <RecipeProcedure />,
        loader: procedureLoader,
      },
      {
        path: "errorLog",
        element: <ErrorLog />,
      },
      {
        path: "reportCIP",
        element: <ReportCIP />,
      },
      {
        path: "sampleCIPReport",
        element: <SampleCIPReport />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
