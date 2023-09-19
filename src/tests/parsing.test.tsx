import { describe, test, expect } from "vitest";

import {
  parseCountrySummaryRestData,
  parseCountryDetailRestData,
} from "../helpers/parsing.tsx";

import {
  antarcticaSummaryRest,
  antarcticaDetailRest,
  antarcticaSummary,
  antarcticaDetail,
  germanySummaryRest,
  germanyDetailRest,
  germanySummary,
  germanyDetail,
} from "./countryObjects.tsx";

describe("parseCountrySummaryRestData test suite", () => {
  test("parseCountrySummaryRestData works with Antarctica", () => {
    const result = parseCountrySummaryRestData(antarcticaSummaryRest);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(false);
    expect(result.value).toEqual(antarcticaSummary);
  });
  test("parseCountrySummaryRestData works with Germany", () => {
    const result = parseCountrySummaryRestData(germanySummaryRest);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(false);
    expect(result.value).toEqual(germanySummary);
  });
  test("parseCountrySummaryRestData with missing cca3 gives error", () => {
    const noCca3 = JSON.parse(JSON.stringify(germanySummaryRest));
    noCca3.cca3 = "";

    const result = parseCountrySummaryRestData(noCca3);
    expect(result.hasError()).toBe(true);
    expect(result.hasWarnings()).toBe(false);
    expect(result.error).toEqual(
      "expected non-empty string for property 'cca3'",
    );
  });
  test("parseCountrySummaryRestData with bad name gives error", () => {
    const badName = JSON.parse(JSON.stringify(germanySummaryRest));
    badName.name = {
      commonxxx: "Germany",
    };

    const result = parseCountrySummaryRestData(badName);
    expect(result.hasError()).toBe(true);
    expect(result.hasWarnings()).toBe(false);
    expect(result.error).toEqual("expected string for property 'common'");
  });
  test("parseCountrySummaryRestData with missing region gives error", () => {
    const noRegion = JSON.parse(JSON.stringify(germanySummaryRest));
    noRegion.region = "";

    const result = parseCountrySummaryRestData(noRegion);
    expect(result.hasError()).toBe(true);
    expect(result.hasWarnings()).toBe(false);
    expect(result.error).toEqual(
      "expected non-empty string for property 'region'",
    );
  });
  test("parseCountrySummaryRestData with bad flags gives error", () => {
    const badFlags = JSON.parse(JSON.stringify(germanySummaryRest));
    badFlags.flags = {
      pngxxx: "https://flagcdn.com/w320/de.png",
    };

    const result = parseCountrySummaryRestData(badFlags);
    expect(result.hasError()).toBe(true);
    expect(result.hasWarnings()).toBe(false);
    expect(result.error).toEqual("expected string for property 'png'");
  });
  test("parseCountrySummaryRestData with bad capital gives warning", () => {
    const badCapital = JSON.parse(JSON.stringify(germanySummaryRest));
    badCapital.capital = "";

    const result = parseCountrySummaryRestData(badCapital);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(true);
    expect(result.warnings.length).toBe(1);
    expect(result.warnings[0]).toEqual("expected array for property 'capital'");
  });
  test("parseCountrySummaryRestData with missing population gives warning", () => {
    const badPopulation = JSON.parse(JSON.stringify(germanySummaryRest));
    badPopulation.population = undefined;

    const result = parseCountrySummaryRestData(badPopulation);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(true);
    expect(result.warnings.length).toBe(1);
    expect(result.warnings[0]).toEqual(
      "expected non-empty string for property 'population'",
    );
  });
});

describe("parseCountryDetailRestData test suite", () => {
  test("parseCountryDetailRestData works with Antarctica", () => {
    const result = parseCountryDetailRestData(antarcticaDetailRest);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(false);
    expect(result.value).toEqual(antarcticaDetail);
  });
  test("parseCountryDetailRestData works with Germany", () => {
    const result = parseCountryDetailRestData(germanyDetailRest);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(false);
    expect(result.value).toEqual(germanyDetail);
  });
  test("parseCountryDetailRestData with missing border countries gives warning", () => {
    const badBorders = JSON.parse(JSON.stringify(germanyDetailRest));
    badBorders.borders = undefined;
    const result = parseCountryDetailRestData(badBorders);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(true);
    expect(result.warnings.length).toBe(1);
    expect(result.warnings[0]).toBe("expected array for property 'borders'");
  });
  test("parseCountryDetailRestData with missing native name gives warning", () => {
    const badNativeName = JSON.parse(JSON.stringify(germanyDetailRest));
    badNativeName.name.nativeName = undefined;
    const result = parseCountryDetailRestData(badNativeName);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(true);
    expect(result.warnings.length).toBe(1);
    expect(result.warnings[0]).toBe(
      "expected object for property 'nativeName'",
    );
  });
  test("parseCountryDetailRestData with missing tld gives warning", () => {
    const badTopLevelDomain = JSON.parse(JSON.stringify(germanyDetailRest));
    badTopLevelDomain.tld = undefined;
    const result = parseCountryDetailRestData(badTopLevelDomain);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(true);
    expect(result.warnings.length).toBe(1);
    expect(result.warnings[0]).toBe("expected array for property 'tld'");
  });
  test("parseCountryDetailRestData with missing currencies gives warning", () => {
    const badCurrencies = JSON.parse(JSON.stringify(germanyDetailRest));
    badCurrencies.currencies = undefined;
    const result = parseCountryDetailRestData(badCurrencies);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(true);
    expect(result.warnings.length).toBe(1);
    expect(result.warnings[0]).toBe(
      "expected object for property 'currencies'",
    );
  });
  test("parseCountryDetailRestData with missing languages gives warning", () => {
    const badLanguages = JSON.parse(JSON.stringify(germanyDetailRest));
    badLanguages.languages = undefined;
    const result = parseCountryDetailRestData(badLanguages);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(true);
    expect(result.warnings.length).toBe(1);
    expect(result.warnings[0]).toBe("expected object for property 'languages'");
  });
  test("parseCountryDetailRestData with missing subregion gives warning", () => {
    const badSubregion = JSON.parse(JSON.stringify(germanyDetailRest));
    badSubregion.subregion = undefined;
    const result = parseCountryDetailRestData(badSubregion);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(true);
    expect(result.warnings.length).toBe(1);
    expect(result.warnings[0]).toBe("expected string for property 'subregion'");
  });
});
