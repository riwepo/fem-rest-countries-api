// import React from "react";
import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CountrySummary from "../components/CountrySummary";

import { ICountrySummary } from "../helpers/interfaces";

describe("CountrySummary component test suite", () => {
  const australia: ICountrySummary = {
    cca3Code: "AUS",
    name: "Australia",
    population: 666,
    region: "Oceania",
    capital: "Canberra",
    flag: new URL("https://flagcdn.com/au.svg"),
  };
  test("renders img, name, 3 labels, 3 label values", () => {
    const clickHandler = vi.fn();
    render(<CountrySummary country={australia} onClick={clickHandler} />);
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

  test("click calls callback", () => {
    const clickHandler = vi.fn();
    render(<CountrySummary country={australia} onClick={clickHandler} />);
    const imgElement = screen.getByRole("img");
    fireEvent.click(imgElement);
    expect(clickHandler).toBeCalledWith(australia.cca3Code);
  });
});
