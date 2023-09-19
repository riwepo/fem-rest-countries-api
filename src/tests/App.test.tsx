// import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../App";

import { filterByRegion, filterBySearchTerm } from "../helpers/filters";

import {
  getAllCountriesSummary,
  getCountryDetail,
  getUniqueRegions,
} from "../helpers/get-countries";

describe("App component test suite", () => {
  test("renders progress message", () => {
    render(
      <App
        getAllCountriesSummary={getAllCountriesSummary}
        getUniqueRegions={getUniqueRegions}
        getCountryDetail={getCountryDetail}
        filterByRegion={filterByRegion}
        filterBySearchTerm={filterBySearchTerm}
      />,
    );
    const progressElement = screen.getByText("Fetching data...");
    expect(progressElement).toBeInTheDocument();
  });

  test("renders error message", async () => {
    const errorMessage = "errorMessage";
    const mockGetAllCountriesSummary = vi.fn(() => {
      return Promise.resolve({ isOk: false, value: null, error: errorMessage });
    });
    render(
      <App
        getAllCountriesSummary={mockGetAllCountriesSummary}
        getUniqueRegions={getUniqueRegions}
        getCountryDetail={getCountryDetail}
        filterByRegion={filterByRegion}
        filterBySearchTerm={filterBySearchTerm}
      />,
    );
    await new Promise((r) => setTimeout(r, 1));
    const progressElement = screen.getByText(errorMessage);
    expect(progressElement).toBeInTheDocument();
  });
});
