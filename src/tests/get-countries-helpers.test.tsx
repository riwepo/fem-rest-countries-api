// import React from "react";
import { describe, test, expect } from "vitest";

import {
  ICountrySummary,
  checkCountrySummaryRestData,
  convertToCountrySummary,
  sortCountrySummary,
  sortStrings,
  // getUniqueRegions,
  //wrapInResultObject,
} from "../country_api/get-countries-helpers.ts";

describe("check country summary rest data test suite", () => {
  const validCountrySummaryRestData = {
    flags: { png: "https://flagcdn.com/w320/gf.png" },
    name: { common: "French Guiana" },
    population: 254541,
    capital: "Cayenne",
    region: "Americas",
  };

  test("checkCountrySummaryRestData with valid data doesn't throw", () => {
    expect(() =>
      checkCountrySummaryRestData(validCountrySummaryRestData),
    ).not.toThrow();
  });

  const noFlagPng = JSON.parse(JSON.stringify(validCountrySummaryRestData));
  noFlagPng.flags.png = null;

  test("checkCountrySummaryRestData with no flag png throws error", () => {
    expect(() => checkCountrySummaryRestData(noFlag)).toThrow();
  });

  const noFlag = JSON.parse(JSON.stringify(validCountrySummaryRestData));
  noFlag.flags = null;

  test("checkCountrySummaryRestData with no flag throws error", () => {
    expect(() => checkCountrySummaryRestData(noFlag)).toThrow();
  });

  const noNameCommon = JSON.parse(JSON.stringify(validCountrySummaryRestData));
  noNameCommon.name.common = null;

  test("checkCountrySummaryRestData with no name common throws error", () => {
    expect(() => checkCountrySummaryRestData(noNameCommon)).toThrow();
  });

  const noName = JSON.parse(JSON.stringify(validCountrySummaryRestData));
  noName.name = null;

  test("checkCountrySummaryRestData with no name throws error", () => {
    expect(() => checkCountrySummaryRestData(noName)).toThrow();
  });

  const noPopulation = JSON.parse(JSON.stringify(validCountrySummaryRestData));
  noPopulation.population = null;

  test("checkCountrySummaryRestData with no population throws error", () => {
    expect(() => checkCountrySummaryRestData(noPopulation)).toThrow();
  });

  const noRegion = JSON.parse(JSON.stringify(validCountrySummaryRestData));
  noRegion.region = null;

  test("checkCountrySummaryRestData with no region throws error", () => {
    expect(() => checkCountrySummaryRestData(noRegion)).toThrow();
  });

  test("checkCountrySummaryRestData with null data throws error", () => {
    expect(() => checkCountrySummaryRestData(null)).toThrow();
  });
});

describe("convert to country summary rest data test suite", () => {
  const validCountrySummaryRestData = {
    flags: { png: "https://flagcdn.com/w320/gf.png" },
    capital: "Cayene",
    name: { common: "French Guiana" },
    population: 254541,
    region: "Americas",
  };

  test("convertToCountrySummary with valid data", () => {
    const result = convertToCountrySummary(validCountrySummaryRestData);
    expect(result.name).toBe("French Guiana");
    expect(result.capital).toBe("Cayene");
    expect(result.region).toBe("Americas");
    expect(result.population).toBe(254541);
    expect(result.flag).toBe("https://flagcdn.com/w320/gf.png");
  });
});

describe("sortCountrySummary test suite", () => {
  const countryA: ICountrySummary = {
    name: "countryA",
    capital: "capital",
    region: "region",
    population: 0,
    flag: new URL("https://some_flag.png"),
  };
  const countryB: ICountrySummary = {
    name: "countryB",
    capital: "capital",
    region: "region",
    population: 0,
    flag: new URL("https://some_flag.png"),
  };
  const countryC: ICountrySummary = {
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
