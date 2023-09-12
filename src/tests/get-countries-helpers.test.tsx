// import React from "react";
import { describe, test, expect } from "vitest";

import {
  ICountrySummary,
  checkCountrySummaryRestData,
  convertToCountrySummary,
  sortCountrySummary,
  // getUniqueRegions,
  //wrapInResultObject,
} from "../country_api/get-countries-helpers.ts";

// describe("to do test suite", () => {
//   test("wrap in result object", () => {
//     const testObject = { value: "some value" };
//     const result = wrapInResultObject(testObject);
//     expect(result).toBeInstanceOf(Object);
//     expect(result).toHaveProperty("isOk");
//     expect(result).toHaveProperty("value");
//     expect(result).toHaveProperty("error");
//     expect(result.isOk).toBe(true);
//     expect(result.value).toBe(testObject);
//   });

//   test("getUniqueRegions strips region field from object", () => {
//     const testData = [{ region: "region1" }];
//     const result = getUniqueRegions(testData);
//     expect(result).toEqual(["region1"]);
//   });

//   test("getUniqueRegions returns all values if they are unique", () => {
//     const testData = [
//       { region: "region1" },
//       { region: "region2" },
//       { region: "region3" },
//     ];
//     const result = getUniqueRegions(testData);
//     expect(result).toEqual(["region1", "region2", "region3"]);
//   });

//   test("getUniqueRegions strips duplicate values", () => {
//     const testData = [
//       { region: "region1" },
//       { region: "region1" },
//       { region: "region2" },
//       { region: "region2" },
//       { region: "region2" },
//       { region: "region3" },
//       { region: "region3" },
//       { region: "region3" },
//       { region: "region3" },
//     ];
//     const result = getUniqueRegions(testData);
//     expect(result).toEqual(["region1", "region2", "region3"]);
//   });
// });

describe("check country summary rest data test suite", () => {
  // typical shape of data for reference
  // Object {
  //   "flags": Object {
  //     "alt": "",
  //     "png": "https://flagcdn.com/w320/gf.png",
  //     "svg": "https://flagcdn.com/gf.svg",
  //   },
  //   "name": Object {
  //     "common": "French Guiana",
  //     "nativeName": Object {
  //       "fra": Object {
  //         "common": "Guyane française",
  //         "official": "Guyane",
  //       },
  //     },
  //     "official": "Guiana",
  //   },
  //   "population": 254541,
  //   "region": "Americas",
  // },

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
