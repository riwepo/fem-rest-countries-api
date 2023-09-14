import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  getAllCountriesSummary,
  //getAllCountriesSummarySlowWithError,
  getUniqueRegions,
} from "./helpers/get-countries.ts";
import { filterByRegion, filterBySearchTerm } from "./helpers/filters.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App
      getAllCountriesSummary={getAllCountriesSummary}
      getUniqueRegions={getUniqueRegions}
      filterByRegion={filterByRegion}
      filterBySearchTerm={filterBySearchTerm}
    />
  </React.StrictMode>,
);
