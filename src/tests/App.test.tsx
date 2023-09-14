// import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../App";

import {
  getAllCountriesSummary,
  filterByRegion,
  getUniqueRegions,
} from "../country_api/get-countries";

describe("App component test suite", () => {
  test("renders progress message", () => {
    render(
      <App
        getAllCountriesSummary={getAllCountriesSummary}
        filterByRegion={filterByRegion}
        getUniqueRegions={getUniqueRegions}
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
        filterByRegion={filterByRegion}
        getUniqueRegions={getUniqueRegions}
      />,
    );
    await new Promise((r) => setTimeout(r, 1));
    const progressElement = screen.getByText(errorMessage);
    expect(progressElement).toBeInTheDocument();
  });
});
