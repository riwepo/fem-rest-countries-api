import { describe, test, expect } from "vitest";

import { ICountrySummary } from "../helpers/interfaces.tsx";

import {
  sortCountrySummary,
  sortStrings,
  getAllCountriesBaseUrl,
  getAllCountriesUrl,
  getCountryByCodeBaseUrl,
  getCountryByCodeUrl,
  addFieldsToUrl,
} from "../helpers/get-countries-helpers.ts";

describe("sortCountrySummary test suite", () => {
  const countryA: ICountrySummary = {
    cca3Code: "CRA",
    name: "countryA",
    capital: "capital",
    region: "region",
    population: 0,
    flag: new URL("https://some_flag.png"),
  };
  const countryB: ICountrySummary = {
    cca3Code: "CRB",
    name: "countryB",
    capital: "capital",
    region: "region",
    population: 0,
    flag: new URL("https://some_flag.png"),
  };
  const countryC: ICountrySummary = {
    cca3Code: "CRC",
    name: "countryC",
    capital: "capital",
    region: "region",
    population: 0,
    flag: new URL("https://some_flag.png"),
  };

  const unorderedArray = [countryB, countryA, countryC];

  test("sortCountrySummary puts in correct order", () => {
    const result = sortCountrySummary(unorderedArray);
    expect(result[0]).toBe(countryA);
    expect(result[1]).toBe(countryB);
    expect(result[2]).toBe(countryC);
  });
});

describe("sortStrings test suite", () => {
  const unorderedArray = ["regionC", "regionA", "regionB"];

  test("puts in correct order", () => {
    const result = sortStrings(unorderedArray);
    expect(result).toEqual(["regionA", "regionB", "regionC"]);
  });
});

describe("get urls test suite", () => {
  test("getAllCountriesBaseUrl returns expected", () => {
    const url = getAllCountriesBaseUrl();
    expect(url).toEqual(new URL("https://restcountries.com/v3.1/all"));
  });
  test("getCountryByCodeBaseUrl returns expected", () => {
    const url = getCountryByCodeBaseUrl("AUS");
    expect(url).toEqual(new URL("https://restcountries.com/v3.1/alpha/AUS"));
  });
  test("addFieldsToUrl returns expected", () => {
    const baseUrl = getAllCountriesBaseUrl();
    const fields = ["field1", "field2", "field3"];
    const url = addFieldsToUrl(baseUrl, fields);
    expect(url).toEqual(
      new URL("https://restcountries.com/v3.1/all?fields=field1,field2,field3"),
    );
  });

  test("getAllCountriesUrl returns expected", () => {
    const url = getAllCountriesUrl();
    expect(url).toEqual(
      new URL(
        "https://restcountries.com/v3.1/all?fields=cca3,name,capital,region,population,flags",
      ),
    );
  });
  test("getNamedCountryUrl returns expected", () => {
    const url = getCountryByCodeUrl("AUS");
    expect(url).toEqual(
      new URL(
        "https://restcountries.com/v3.1/alpha/AUS?fields=cca3,name,capital,region,population,flags,subregion,languages,borders,tld,currencies",
      ),
    );
  });
});
