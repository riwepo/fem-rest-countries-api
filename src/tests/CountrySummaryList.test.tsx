// import React from "react";
import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CountrySummaryList from "../components/CountrySummaryList";

import { ICountrySummary } from "../helpers/interfaces";

describe("CountrySummaryList component test suite", () => {
  const australia: ICountrySummary = {
    name: "Australia",
    population: 666,
    region: "Oceanina",
    capital: "Canberra",
    flag: new URL("https://flagcdn.com/au.svg"),
  };
  const countries = [australia, australia, australia, australia, australia];
  test("renders 5 countries", () => {
    const clickHandler = vi.fn();
    render(
      <CountrySummaryList
        countries={countries}
        onCountryClicked={clickHandler}
      />,
    );
    const nameElements = screen.getAllByText("Australia");
    expect(nameElements.length).toBe(countries.length);
  });
  test("click calls callback", () => {
    const clickHandler = vi.fn();
    render(
      <CountrySummaryList
        countries={countries}
        onCountryClicked={clickHandler}
      />,
    );
    const buttonElements = screen.getAllByRole("button");
    fireEvent.click(buttonElements[0]);
    expect(clickHandler).toBeCalledWith(australia.name);
  });
});
