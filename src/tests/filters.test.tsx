// import React from "react";
import { describe, test, expect } from "vitest";

import { filterByRegion, filterBySearchTerm } from "../helpers/filters.tsx";

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

describe("filterBySearchTerm test suite", () => {
  test("returns matching names", () => {
    const testData = [
      { name: "fred smith" },
      { name: "joe blogs" },
      { name: "bill nerk" },
    ];
    const searchTerm = "fred smith";
    const result = filterBySearchTerm(testData, searchTerm);
    expect(result).toEqual([{ name: "fred smith" }]);
  });

  test("returns empty array if no match", () => {
    const testData = [
      { name: "fred smith" },
      { name: "joe blogs" },
      { name: "bill nerk" },
    ];
    const searchTerm = "xylophone";
    const result = filterBySearchTerm(testData, searchTerm);
    expect(result).toEqual([]);
  });

  test("doesn't depend on case", () => {
    const testData = [
      { name: "Fred Smith" },
      { name: "joe blogs" },
      { name: "bill nerk" },
    ];
    const searchTerm = "fred smith";
    const result = filterBySearchTerm(testData, searchTerm);
    expect(result).toEqual([{ name: "Fred Smith" }]);
  });

  test("works with partial match", () => {
    const testData = [
      { name: "fred smith" },
      { name: "joe blogs" },
      { name: "bill nerk" },
    ];
    const searchTerm = "d s";
    const result = filterBySearchTerm(testData, searchTerm);
    expect(result).toEqual([{ name: "fred smith" }]);
  });

  test("works with complex objects", () => {
    const testData = [
      { country: "country1", name: "fred smith" },
      { country: "country2", name: "joe blogs" },
      { country: "country3", name: "bill nerk" },
    ];
    const searchTerm = "fred";
    const result = filterBySearchTerm(testData, searchTerm);
    expect(result).toEqual([{ country: "country1", name: "fred smith" }]);
  });

  test("preserves order", () => {
    const testData = [
      { country: "country1", name: "name3" },
      { country: "country2", name: "name2" },
      { country: "country3", name: "name1" },
    ];
    const searchTerm = "name";
    const result = filterBySearchTerm(testData, searchTerm);
    expect(result).toEqual(testData);
  });

  test("empty search term returns all", () => {
    const testData = [
      { country: "country1", name: "name3" },
      { country: "country2", name: "name2" },
      { country: "country3", name: "name1" },
    ];
    const searchTerm = "";
    const result = filterBySearchTerm(testData, searchTerm);
    expect(result).toEqual(testData);
  });
});
