// import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CountrySummaryList from "../components/CountrySummaryList";

describe.skip("CountrySummaryList component test suite", () => {
  // const australia: ICountrySummary = {
  //   name: "Australia",
  //   population: 666,
  //   region: "Oceanina",
  //   capital: "Canberra",
  //   flagUrl: "https://flagcdn.com/au.svg",
  // };
  // const countries = [australia, australia, australia, australia, australia];
  test("renders 5 countries", () => {
    // render(<CountrySummaryList countries={countries} />);
    render(<CountrySummaryList />);
    const nameElements = screen.getAllByText("Australia");
    expect(nameElements.length).toBe(countries.length);
  });
});
