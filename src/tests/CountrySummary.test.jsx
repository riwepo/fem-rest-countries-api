// import AddOn from "./AddOn";
// import { getAddOnByCode } from "../utils/addOns";
// import { getTimespanByCode } from "../utils/timespans";
// import StepContextProvider, { StepContext } from "../context/step-context";

// import { nullStepContext } from "../context/step-context.test";

import CountrySummary from "../components/CountrySummary";
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

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
    const nameelement = screen.getByText("Australia");
    expect(nameelement).toBeInTheDocument();
  });
});
