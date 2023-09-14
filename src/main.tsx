import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  filterByRegion,
  getAllCountriesSummary,
  //getAllCountriesSummarySlowWithError,
  getUniqueRegions,
} from "./country_api/get-countries";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App
      getAllCountriesSummary={getAllCountriesSummary}
      filterByRegion={filterByRegion}
      getUniqueRegions={getUniqueRegions}
    />
  </React.StrictMode>,
);
