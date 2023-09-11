// import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import CountrySummary from "../components/CountrySummary";

describe("country summary test suite", () => {
  test("renders img and alt", () => {
    render(
      <CountrySummary
        name="Australia"
        population={666}
        region="Oceanina"
        capital="Canberra"
        flagUrl='"https://flagcdn.com/au.svg"'
      />,
    );
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
