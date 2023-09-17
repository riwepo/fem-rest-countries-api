// import React from "react";
import { describe, test, expect } from "vitest";

import {
  ICountrySummary,
  ICountryDetail,
  IGetCountriesResult,
} from "../helpers/interfaces.tsx";
import { filterByRegion } from "../helpers/filters.tsx";
import {
  getAllCountriesSummary,
  getUniqueRegions,
  getCountryDetail,
} from "../helpers/get-countries.ts";

const isInstanceOfCountrySummary = (data: ICountrySummary) => {
  // note capital is undefined for some countries e.g. Antarctica
  const result =
    typeof data.cca3Code === "string" &&
    typeof data.name === "string" &&
    (data.capital === undefined || typeof data.capital === "string") &&
    data.flag.toString().startsWith("http") &&
    typeof data.region === "string" &&
    typeof data.population === "number";
  if (!result) {
    () => {}; // noop
  }
  return result;
};

const isInstanceOfCountryDetail = (data: ICountryDetail) => {
  // note nativeName is undefined for some countries
  const result =
    isInstanceOfCountrySummary(data) &&
    typeof data.borderCountries === "object" &&
    typeof data.currencies === "object" &&
    typeof data.languages === "object" &&
    (data.nativeName === undefined || typeof data.nativeName === "string") &&
    typeof data.subRegion === "string" &&
    typeof data.topLevelDomain === "string";
  if (!result) {
    () => {}; // noop
  }
  return result;
};

describe("getAllCountriesSummary test suite", () => {
  test("getAllCountriesSummary returns expected", async () => {
    const result: IGetCountriesResult = await getAllCountriesSummary();
    expect(result.isOk).toBe(true);
    expect(result.value).not.toBeNull();
    expect(Array.isArray(result.value)).toBeTruthy();
    const results = result.value as ICountrySummary[];
    expect(
      results.every((country) => isInstanceOfCountrySummary(country)),
    ).toBe(true);
  });
});

describe("getUniqueRegions test suite", () => {
  test("strips region field from object", () => {
    const testData = [{ region: "region1" }];
    const result = getUniqueRegions(testData);
    expect(result).toEqual(["region1"]);
  });

  test("returns all values if they are unique", () => {
    const testData = [
      { region: "region1" },
      { region: "region2" },
      { region: "region3" },
    ];
    const result = getUniqueRegions(testData);
    expect(result).toEqual(["region1", "region2", "region3"]);
  });

  test("strips duplicate values", () => {
    const testData = [
      { region: "region1" },
      { region: "region1" },
      { region: "region2" },
      { region: "region2" },
      { region: "region2" },
      { region: "region3" },
      { region: "region3" },
      { region: "region3" },
      { region: "region3" },
    ];
    const result = getUniqueRegions(testData);
    expect(result).toEqual(["region1", "region2", "region3"]);
  });

  test("sorts alphabetically", () => {
    const testData = [
      { region: "regionC" },
      { region: "regionA" },
      { region: "regionB" },
    ];
    const result = getUniqueRegions(testData);
    expect(result).toEqual(["regionA", "regionB", "regionC"]);
  });
});

describe("filterByRegion test suite", () => {
  test("returns only matching region", () => {
    const testData = [
      { region: "region1" },
      { region: "region2" },
      { region: "region3" },
    ];
    const region = "region1";
    const result = filterByRegion(testData, region);
    expect(result).toEqual([{ region: "region1" }]);
  });
  test("works with complex objects", () => {
    const testData = [
      { country: "country1", region: "region1" },
      { country: "country2", region: "region2" },
      { country: "country3", region: "region3" },
    ];
    const region = "region1";
    const result = filterByRegion(testData, region);
    expect(result).toEqual([{ country: "country1", region: "region1" }]);
  });
  test("preserves order", () => {
    const testData = [
      { country: "country1", region: "region1" },
      { country: "country2", region: "region1" },
      { country: "country3", region: "region1" },
    ];
    const region = "region1";
    const result = filterByRegion(testData, region);
    expect(result).toEqual(testData);
  });
});

describe("getCountryDetail test suite", () => {
  test("getCountryDetail for Antarctica returns expected", async () => {
    const result: IGetCountriesResult = await getCountryDetail("ATA");
    expect(result.isOk).toBe(true);
    expect(result.value).not.toBeNull();
    const results = result.value as ICountryDetail;
    expect(isInstanceOfCountryDetail(results)).toBe(true);
  });
  test("getCountryDetail  for Germany returns expected", async () => {
    const result: IGetCountriesResult = await getCountryDetail("DEU");
    expect(result.isOk).toBe(true);
    expect(result.value).not.toBeNull();
    const results = result.value as ICountryDetail;
    expect(isInstanceOfCountryDetail(results)).toBe(true);
  });
});
