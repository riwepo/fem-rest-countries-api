// import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CountrySummary from "../components/CountrySummary";

import { ICountrySummary } from "../country_api/get-countries-helpers";

describe("country summary test suite", () => {
  const australia: ICountrySummary = {
    name: "Australia",
    population: 666,
    region: "Oceania",
    capital: "Canberra",
    flag: "https://flagcdn.com/au.svg",
  };
  test("renders img, name, 3 labels, 3 label values", () => {
    render(<CountrySummary country={australia} />);
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    const nameElement = screen.getByText("Australia");
    expect(nameElement).toBeInTheDocument();
    const populationLabelElement = screen.getByText("Population:");
    expect(populationLabelElement).toBeInTheDocument();
    const populationValueElement = screen.getByText("666");
    expect(populationValueElement).toBeInTheDocument();
    const regionValueElement = screen.getByText("Oceania");
    expect(regionValueElement).toBeInTheDocument();
    const capitalValueElement = screen.getByText("Canberra");
    expect(capitalValueElement).toBeInTheDocument();
  });
});
