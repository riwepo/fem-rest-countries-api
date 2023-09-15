import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  getAllCountriesSummary,
  //getAllCountriesSummarySlowWithError,
  getCountryDetail,
  getUniqueRegions,
} from "./helpers/get-countries.ts";
import { filterByRegion, filterBySearchTerm } from "./helpers/filters.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App
      getAllCountriesSummary={getAllCountriesSummary}
      getCountryDetail={getCountryDetail}
      getUniqueRegions={getUniqueRegions}
      filterByRegion={filterByRegion}
      filterBySearchTerm={filterBySearchTerm}
    />
  </React.StrictMode>,
);
