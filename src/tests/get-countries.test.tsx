// import React from "react";
import { describe, test, expect } from "vitest";

import { getAllRegions } from "../country_api/get-countries.ts";

describe("get countries test suite", () => {
  test("get all regions", async () => {
    const result = await getAllRegions();
    expect(result.isOk).toBe(true);
    expect(result.value).toEqual([
      "Asia",
      "Oceania",
      "Europe",
      "Africa",
      "Americas",
      "Antarctic",
    ]);
  });
});
