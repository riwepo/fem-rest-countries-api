// import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CountrySummary from "../components/CountrySummary";
import ICountrySummary from "../components/ICountrySummary";

describe("country summary test suite", () => {
  const australia: ICountrySummary = {
    name: "Australia",
    population: 666,
    region: "Oceanina",
    capital: "Canberra",
    flagUrl: "https://flagcdn.com/au.svg",
  };
  test("renders img and alt", () => {
    render(<CountrySummary country={australia} />);
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    const nameElement = screen.getByText("Australia");
    expect(nameElement).toBeInTheDocument();
    const populationLabelElement = screen.getByText("Population:");
    expect(populationLabelElement).toBeInTheDocument();
    const regionLabelElement = screen.getByText("Region:");
    expect(regionLabelElement).toBeInTheDocument();
    const capitalLabelElement = screen.getByText("Capital:");
    expect(capitalLabelElement).toBeInTheDocument();
  });
});
