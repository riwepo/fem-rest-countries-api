import { describe, test, expect } from "vitest";

import {
  parseCountrySummaryRestData,
  parseCountryDetailRestData,
} from "../helpers/parsing.tsx";

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

const antarcticaDetail = {
  flags: {
    png: "https://flagcdn.com/w320/aq.png",
  },
  name: { common: "Antarctica", nativeName: {} },
  tld: [".aq"],
  cca3: "ATA",
  currencies: {},
  capital: [],
  region: "Antarctic",
  subregion: "",
  languages: {},
  borders: [],
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

const germanyDetail = {
  flags: {
    png: "https://flagcdn.com/w320/de.png",
  },
  name: {
    common: "Germany",
    nativeName: {
      deu: { common: "Deutschland" },
    },
  },
  tld: [".de"],
  cca3: "DEU",
  currencies: { EUR: { name: "Euro", symbol: "€" } },
  capital: ["Berlin"],
  region: "Europe",
  subregion: "Western Europe",
  languages: { deu: "German" },
  borders: ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"],
  population: 83240525,
};

describe("parseCountrySummaryRestData test suite", () => {
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
  test("parseCountrySummaryRestData with missing cca3 gives error", () => {
    const noCca3 = JSON.parse(JSON.stringify(germanySummary));
    noCca3.cca3 = "";

    const result = parseCountrySummaryRestData(noCca3);
    expect(result.hasError()).toBe(true);
    expect(result.hasWarnings()).toBe(false);
    expect(result.error).toEqual(
      "expected non-empty string for property 'cca3'",
    );
  });
  test("parseCountrySummaryRestData with bad name gives error", () => {
    const badName = JSON.parse(JSON.stringify(germanySummary));
    badName.name = {
      commonxxx: "Germany",
    };

    const result = parseCountrySummaryRestData(badName);
    expect(result.hasError()).toBe(true);
    expect(result.hasWarnings()).toBe(false);
    expect(result.error).toEqual(
      "expected non-empty string for property 'common'",
    );
  });
  test("parseCountrySummaryRestData with missing region gives error", () => {
    const noRegion = JSON.parse(JSON.stringify(germanySummary));
    noRegion.region = "";

    const result = parseCountrySummaryRestData(noRegion);
    expect(result.hasError()).toBe(true);
    expect(result.hasWarnings()).toBe(false);
    expect(result.error).toEqual(
      "expected non-empty string for property 'region'",
    );
  });
  test("parseCountrySummaryRestData with bad flags gives error", () => {
    const badFlags = JSON.parse(JSON.stringify(germanySummary));
    badFlags.flags = {
      pngxxx: "https://flagcdn.com/w320/de.png",
    };

    const result = parseCountrySummaryRestData(badFlags);
    expect(result.hasError()).toBe(true);
    expect(result.hasWarnings()).toBe(false);
    expect(result.error).toEqual(
      "expected non-empty string for property 'png'",
    );
  });
  test("parseCountrySummaryRestData with bad capital gives warning", () => {
    const badCapital = JSON.parse(JSON.stringify(germanySummary));
    badCapital.capital = "";

    const result = parseCountrySummaryRestData(badCapital);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(true);
    expect(result.warnings.length).toBe(1);
    expect(result.warnings[0]).toEqual("expected array for property 'capital'");
  });
  test("parseCountrySummaryRestData with missing population gives warning", () => {
    const badPopulation = JSON.parse(JSON.stringify(germanySummary));
    badPopulation.population = undefined;

    const result = parseCountrySummaryRestData(badPopulation);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(true);
    expect(result.warnings.length).toBe(1);
    expect(result.warnings[0]).toEqual(
      "expected non-empty string for property 'population'",
    );
  });
});

describe("parseCountryDetailRestData test suite", () => {
  test("parseCountryDetailRestData works with Antarctica", () => {
    const result = parseCountryDetailRestData(antarcticaDetail);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(false);
    expect(result.value).toEqual({
      borderCountries: [],
      capital: "",
      cca3Code: "ATA",
      currencies: [],
      flag: new URL("https://flagcdn.com/w320/aq.png"),
      languages: [],
      name: "Antarctica",
      nativeName: "",
      population: 1000,
      region: "Antarctic",
      subRegion: "",
      topLevelDomain: ".aq",
    });
  });
  test("parseCountryDetailRestData works with Germany", () => {
    const result = parseCountryDetailRestData(germanyDetail);
    expect(result.hasError()).toBe(false);
    expect(result.hasWarnings()).toBe(false);
    expect(result.value).toEqual({
      borderCountries: [
        "AUT",
        "BEL",
        "CZE",
        "DNK",
        "FRA",
        "LUX",
        "NLD",
        "POL",
        "CHE",
      ],
      capital: "Berlin",
      cca3Code: "DEU",
      currencies: ["Euro"],
      flag: new URL("https://flagcdn.com/w320/de.png"),
      languages: ["German"],
      name: "Germany",
      nativeName: "Deutschland",
      population: 83240525,
      region: "Europe",
      subRegion: "Western Europe",
      topLevelDomain: ".de",
    });
  });
  // test("parseCountrySummaryRestData with missing cca3 gives error", () => {
  //   const noCca3 = JSON.parse(JSON.stringify(germanySummary));
  //   noCca3.cca3 = "";

  //   const result = parseCountrySummaryRestData(noCca3);
  //   expect(result.hasError()).toBe(true);
  //   expect(result.hasWarnings()).toBe(false);
  //   expect(result.error).toEqual(
  //     "expected non-empty string for property 'cca3'",
  //   );
  // });
  // test("parseCountrySummaryRestData with bad name gives error", () => {
  //   const badName = JSON.parse(JSON.stringify(germanySummary));
  //   badName.name = {
  //     commonxxx: "Germany",
  //   };

  //   const result = parseCountrySummaryRestData(badName);
  //   expect(result.hasError()).toBe(true);
  //   expect(result.hasWarnings()).toBe(false);
  //   expect(result.error).toEqual(
  //     "expected non-empty string for property 'common'",
  //   );
  // });
  // test("parseCountrySummaryRestData with missing region gives error", () => {
  //   const noRegion = JSON.parse(JSON.stringify(germanySummary));
  //   noRegion.region = "";

  //   const result = parseCountrySummaryRestData(noRegion);
  //   expect(result.hasError()).toBe(true);
  //   expect(result.hasWarnings()).toBe(false);
  //   expect(result.error).toEqual(
  //     "expected non-empty string for property 'region'",
  //   );
  // });
  // test("parseCountrySummaryRestData with bad flags gives error", () => {
  //   const badFlags = JSON.parse(JSON.stringify(germanySummary));
  //   badFlags.flags = {
  //     pngxxx: "https://flagcdn.com/w320/de.png",
  //   };

  //   const result = parseCountrySummaryRestData(badFlags);
  //   expect(result.hasError()).toBe(true);
  //   expect(result.hasWarnings()).toBe(false);
  //   expect(result.error).toEqual(
  //     "expected non-empty string for property 'png'",
  //   );
  // });
  // test("parseCountrySummaryRestData with bad capital gives warning", () => {
  //   const badCapital = JSON.parse(JSON.stringify(germanySummary));
  //   badCapital.capital = "";

  //   const result = parseCountrySummaryRestData(badCapital);
  //   expect(result.hasError()).toBe(false);
  //   expect(result.hasWarnings()).toBe(true);
  //   expect(result.warnings.length).toBe(1);
  //   expect(result.warnings[0]).toEqual("expected array for property 'capital'");
  // });
  // test("parseCountrySummaryRestData with missing population gives warning", () => {
  //   const badPopulation = JSON.parse(JSON.stringify(germanySummary));
  //   badPopulation.population = undefined;

  //   const result = parseCountrySummaryRestData(badPopulation);
  //   expect(result.hasError()).toBe(false);
  //   expect(result.hasWarnings()).toBe(true);
  //   expect(result.warnings.length).toBe(1);
  //   expect(result.warnings[0]).toEqual(
  //     "expected non-empty string for property 'population'",
  //   );
  // });
});
