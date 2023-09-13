// import React from "react";
import { describe, test, expect } from "vitest";

import { IGetCountriesResult } from "../country_api/get-countries-helpers.ts";
import {
  filterByRegion,
  getAllCountriesSummary,
  getUniqueRegions,
} from "../country_api/get-countries.ts";

describe("getAllCountriesSummary test suite", () => {
  test("get all countries summary", async () => {
    const result: IGetCountriesResult = await getAllCountriesSummary();
    expect(result.isOk).toBe(true);
    expect(result.value).not.toBeNull();
    expect(Array.isArray(result.value)).toBeTruthy();
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
