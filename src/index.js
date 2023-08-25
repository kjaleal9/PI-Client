import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import RecipeSearch from "./Routes/RecipeSearch";
// import RecipeEdit from "./Routes/RecipeEdit";
// import Materials from "./Routes/Materials";
// import RecipeProcedure from "./Routes/RecipeProcedure";
// import ErrorLog from "./Routes/ErrorLog";
// import ReportCIP from "./Routes/ReportCIP";

// Routes for frontend navigation
// TODO: Create an error route
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "recipes",
        element: <RecipeSearch />,
      },
    //   {
    //     path: "recipes/:RID/:Version/edit",
    //     element: <RecipeEdit />,
    //   },
    //   {
    //     path: "materials",
    //     element: <Materials />,
    //   },
    //   {
    //     path: "procedure",
    //     element: <RecipeProcedure />,
    //   },
    //   {
    //     path: "errorLog",
    //     element: <ErrorLog />,
    //   },
    //   {
    //     path: "reportCIP",
    //     element: <ReportCIP />,
    //   },
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