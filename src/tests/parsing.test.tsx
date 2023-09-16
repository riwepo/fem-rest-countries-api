import { describe, test, expect } from "vitest";

import { parseCountrySummaryRestData } from "../helpers/parsing.tsx";

const antarcticaSummary = {
  flags: {
    png: "https://flagcdn.com/w320/aq.png",
  },
  name: { common: "Antarctica" },
  cca3: "ATA",
  capital: [],
  region: "Antarctic",
  population: 1000,
};

const germanySummary = {
  flags: {
    png: "https://flagcdn.com/w320/de.png",
  },
  name: {
    common: "Germany",
  },
  cca3: "DEU",
  capital: ["Berlin"],
  region: "Europe",
  population: 83240525,
};

describe("parse rest data test suite", () => {
  test("parseCountrySummaryRestData works with Antarctica", () => {
    const result = parseCountrySummaryRestData(antarcticaSummary);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(false);
    expect(result.value).toEqual({
      capital: "",
      cca3Code: "ATA",
      flag: new URL("https://flagcdn.com/w320/aq.png"),
      name: "Antarctica",
      population: 1000,
      region: "Antarctic",
    });
  });
  test("parseCountrySummaryRestData works with Germany", () => {
    const result = parseCountrySummaryRestData(germanySummary);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(false);
    expect(result.value).toEqual({
      capital: "Berlin",
      cca3Code: "DEU",
      flag: new URL("https://flagcdn.com/w320/de.png"),
      name: "Germany",
      population: 83240525,
      region: "Europe",
    });
  });
});
