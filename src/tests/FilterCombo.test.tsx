// import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import FilterCombo from "../components/FilterCombo";

describe("FilterCombo component test suite", () => {
  test("renders text and img", () => {
    render(<FilterCombo />);
    const pElement = screen.getByText("Filter by Region");
    expect(pElement).toBeInTheDocument();
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
  });
});
