// import React from "react";
import { describe, test, expect } from "vitest";

import {
  getUniqueRegions,
  wrapInResultObject,
} from "../country_api/get-countries-helpers.ts";

describe("get countries helpers test suite", () => {
  test("wrap in result object", () => {
    const testValue = "test value";
    const result = wrapInResultObject(testValue);
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty("isOk");
    expect(result).toHaveProperty("value");
    expect(result.isOk).toBe(true);
    expect(result.value).toBe(testValue);
  });

  test("getUniqueRegions strips region field from object", () => {
    const testData = [{ region: "region1" }];
    const result = getUniqueRegions(testData);
    expect(result).toEqual(["region1"]);
  });

  test("getUniqueRegions returns all values if they are unique", () => {
    const testData = [
      { region: "region1" },
      { region: "region2" },
      { region: "region3" },
    ];
    const result = getUniqueRegions(testData);
    expect(result).toEqual(["region1", "region2", "region3"]);
  });

  test("getUniqueRegions strips duplicate values", () => {
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
});
