import { describe, test, expect } from "vitest";

import { ICountrySummary } from "../helpers/interfaces.tsx";

import {
  checkCountrySummaryRestData,
  checkCountryDetailRestData,
  convertToCountrySummary,
  // convertToCountryDetail,
  sortCountrySummary,
  sortStrings,
  getAllCountriesBaseUrl,
  getAllCountriesUrl,
  getNamedCountryBaseUrl,
  getNamedCountryUrl,
  addFieldsToUrl,
} from "../helpers/get-countries-helpers.ts";

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

const validCountrySummaryRestData = {
  flags: { png: "https://flagcdn.com/w320/gf.png" },
  capital: ["Cayene"],
  name: { common: "French Guiana" },
  population: 254541,
  region: "Americas",
};
describe("convert to country summary rest data test suite", () => {
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

const validCountryDetailRestData = {
  ...validCountrySummaryRestData,
  name: {
    common: "French Guiana",
    nativeName: { something: { common: "fred" } },
  },
  subregion: "sub region",
  languages: { something: "first language" },
  borders: ["border1", "border2"],
  tld: ["tld1"],
  currencies: {
    something: { name: "currency name", symbol: "currency symbol" },
  },
};
describe("check country detail rest data test suite", () => {
  test("checkCountryDetailRestData with valid data doesn't throw", () => {
    expect(() =>
      checkCountryDetailRestData(validCountryDetailRestData),
    ).not.toThrow();
  });

  test("checkCountryDetailRestData throws if doesn't receive array", () => {
    expect(() => checkCountryDetailRestData("dodgy data")).toThrow();
  });

  test("checkCountryDetailRestData throws if doesn't receive array with one entry", () => {
    expect(() =>
      checkCountryDetailRestData([
        validCountryDetailRestData,
        validCountryDetailRestData,
      ]),
    ).toThrow();
  });

  const noNativeName = JSON.parse(JSON.stringify(validCountryDetailRestData));
  noNativeName.name.nativeName = null;

  test("checkCountryDetailRestData with no native name throws error", () => {
    expect(() => checkCountryDetailRestData(noNativeName)).toThrow();
  });

  const noNativeNameFirstProperty = JSON.parse(
    JSON.stringify(validCountryDetailRestData),
  );
  noNativeNameFirstProperty.name.nativeName.something = null;

  test("checkCountryDetailRestData with no native name first property  throws error", () => {
    expect(() =>
      checkCountryDetailRestData(noNativeNameFirstProperty),
    ).toThrow();
  });

  const noNativeNameFirstPropertyCommon = JSON.parse(
    JSON.stringify(validCountryDetailRestData),
  );
  noNativeNameFirstPropertyCommon.name.nativeName.something.common = null;

  test("checkCountryDetailRestData with no native name first property common throws error", () => {
    expect(() =>
      checkCountryDetailRestData(noNativeNameFirstPropertyCommon),
    ).toThrow();
  });

  const noSubregion = JSON.parse(JSON.stringify(validCountryDetailRestData));
  noSubregion.subregion = null;

  test("checkCountryDetailRestData with no subregion throws error", () => {
    expect(() => checkCountryDetailRestData(noSubregion)).toThrow();
  });

  const noLanguages = JSON.parse(JSON.stringify(validCountryDetailRestData));
  noLanguages.languages = null;

  test("checkCountryDetailRestData with no languages throws error", () => {
    expect(() => checkCountryDetailRestData(noLanguages)).toThrow();
  });

  const noLanguagesFirstProperty = JSON.parse(
    JSON.stringify(validCountryDetailRestData),
  );
  noLanguagesFirstProperty.languages.something = null;

  test("checkCountryDetailRestData with no languages first property throws error", () => {
    expect(() =>
      checkCountryDetailRestData(noLanguagesFirstProperty),
    ).toThrow();
  });

  const noBorders = JSON.parse(JSON.stringify(validCountryDetailRestData));
  noBorders.borders = null;

  test("checkCountryDetailRestData with no borders throws error", () => {
    expect(() => checkCountryDetailRestData(noBorders)).toThrow();
  });

  const noTld = JSON.parse(JSON.stringify(validCountryDetailRestData));
  noTld.tld = null;

  test("checkCountryDetailRestData with no tld throws error", () => {
    expect(() => checkCountryDetailRestData(noTld)).toThrow();
  });

  const noCurrencies = JSON.parse(JSON.stringify(validCountryDetailRestData));
  noCurrencies.currencies = null;

  test("checkCountryDetailRestData with no currencies throws error", () => {
    expect(() => checkCountryDetailRestData(noCurrencies)).toThrow();
  });

  const noCurrenciesFirstProperty = JSON.parse(
    JSON.stringify(validCountryDetailRestData),
  );
  noCurrenciesFirstProperty.currencies.something = null;

  test("checkCountryDetailRestData with no currencies first property throws error", () => {
    expect(() =>
      checkCountryDetailRestData(noCurrenciesFirstProperty),
    ).toThrow();
  });

  const noCurrenciesFirstPropertyName = JSON.parse(
    JSON.stringify(validCountryDetailRestData),
  );
  noCurrenciesFirstPropertyName.currencies.something.name = null;

  test("checkCountryDetailRestData with no currencies first property name throws error", () => {
    expect(() =>
      checkCountryDetailRestData(noCurrenciesFirstPropertyName),
    ).toThrow();
  });
});

describe("get urls test suite", () => {
  test("getAllCountriesUrl returns expected", () => {
    const url = getAllCountriesBaseUrl();
    expect(url).toEqual(new URL("https://restcountries.com/v3.1/all"));
  });
  test("getNamedCountryBaseUrl returns expected", () => {
    const url = getNamedCountryBaseUrl("australia");
    expect(url).toEqual(
      new URL("https://restcountries.com/v3.1/name/australia"),
    );
  });
  test("addFieldsToUrl returns expected", () => {
    const baseUrl = getAllCountriesBaseUrl();
    const fields = ["field1", "field2", "field3"];
    const url = addFieldsToUrl(baseUrl, fields);
    expect(url).toEqual(
      new URL("https://restcountries.com/v3.1/all?fields=field1,field2,field3"),
    );
  });
  test("getAllCountriesUrl returns expected", () => {
    const url = getAllCountriesUrl();
    expect(url).toEqual(
      new URL(
        "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags",
      ),
    );
  });
  test("getNamedCountryUrl returns expected", () => {
    const url = getNamedCountryUrl("australia");
    expect(url).toEqual(
      new URL(
        "https://restcountries.com/v3.1/name/australia?fields=name,capital,region,population,flags,subregion,languages,borders,tld,currencies",
      ),
    );
  });
});
