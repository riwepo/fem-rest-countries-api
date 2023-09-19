// import React from "react";
import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import DetailPage from "../components/DetailPage";

import { germanyDetail2 } from "../tests/countryObjects";

describe("DetailPage component test suite", () => {
  test("renders detail", () => {
    render(<DetailPage country={germanyDetail2} onCountryChange={() => {}} />);
    const flagImageElement = screen.getByAltText("flag");
    expect(flagImageElement).toBeInTheDocument();
    const nameElement = screen.getByText(germanyDetail2.name);
    expect(nameElement).toBeInTheDocument();
    const nativeNameElement = screen.getByText(germanyDetail2.nativeName);
    expect(nativeNameElement).toBeInTheDocument();
    const populationElement = screen.getByText(germanyDetail2.population);
    expect(populationElement).toBeInTheDocument();
    const regionElement = screen.getByText(germanyDetail2.region);
    expect(regionElement).toBeInTheDocument();
    const subRegionElement = screen.getByText(germanyDetail2.subRegion);
    expect(subRegionElement).toBeInTheDocument();
    const capitalElement = screen.getByText(germanyDetail2.capital);
    expect(capitalElement).toBeInTheDocument();
    const topLevelDomainElement = screen.getByText(
      germanyDetail2.topLevelDomain,
    );
    expect(topLevelDomainElement).toBeInTheDocument();
    const currenciesElement = screen.getByText(
      germanyDetail2.currencies.join(","),
    );
    expect(currenciesElement).toBeInTheDocument();
    const languagesElement = screen.getByText(
      germanyDetail2.languages.join(","),
    );
    expect(languagesElement).toBeInTheDocument();
    const backButtonElement = screen.getByText("Back");
    expect(backButtonElement).toBeInTheDocument();
    const backButtonArrowSvgElement = screen.getByTitle("arrow left");
    expect(backButtonArrowSvgElement).toBeInTheDocument();
    germanyDetail2.borderCountriesCodeNames.map((codeName) => {
      const buttonElement = screen.getByText(codeName.name);
      expect(buttonElement).toBeInTheDocument();
    });
  });
  test("clicking back calls callback with empty string", () => {
    const onCountryChangeHandler = vi.fn();
    render(
      <DetailPage
        country={germanyDetail2}
        onCountryChange={onCountryChangeHandler}
      />,
    );
    const backButtonElement = screen.getByText("Back");
    fireEvent.click(backButtonElement);
    expect(onCountryChangeHandler).toBeCalledWith("");
  });
  test("clicking border button calls callback with border country code", () => {
    const onCountryChangeHandler = vi.fn();
    render(
      <DetailPage
        country={germanyDetail2}
        onCountryChange={onCountryChangeHandler}
      />,
    );
    germanyDetail2.borderCountriesCodeNames.map((codeName) => {
      const buttonElement = screen.getByText(codeName.name);
      fireEvent.click(buttonElement);
      expect(onCountryChangeHandler).toBeCalledWith(codeName.cca3Code);
    });
  });
});
