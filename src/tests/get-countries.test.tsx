// import React from "react";
import { describe, test, expect } from "vitest";

import { IGetCountriesResult } from "../country_api/get-countries-helpers.ts";
import {
  getAllCountriesSummary,
  // getAllRegions,
} from "../country_api/get-countries.ts";

describe("get countries summary test suite", () => {
  test("get all countries summary", async () => {
    const result: IGetCountriesResult = await getAllCountriesSummary();
    expect(result.isOk).toBe(true);
    expect(result.value).not.toBeNull();
    expect(Array.isArray(result.value)).toBeTruthy();
  });
});
