import {
  IGetCountriesResult,
  ICountrySummary,
  ICountryDetail,
} from "./interfaces";

export function wrapInResultObject(value: object | null): IGetCountriesResult {
  const result: IGetCountriesResult = { isOk: true, value: value, error: null };
  return result;
}

export function processError(error: unknown): IGetCountriesResult {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "unknown error type";
  }
  const result = { isOk: false, error: message, value: null };
  return result;
}

export function checkCountrySummaryRestData(restData: unknown): void {
  if (
    !restData ||
    !restData?.name?.common ||
    !restData?.capital ||
    !restData?.region ||
    restData.population === null ||
    restData.population === undefined ||
    !restData.flags.png
  ) {
    throw new Error(`unexpected country summary rest data ${restData}`);
  }
}

export function checkCountryDetailRestData(restData: unknown): void {
  if (
    !restData ||
    !restData?.name?.common ||
    !restData?.capital ||
    !restData?.region ||
    restData.population === null ||
    restData.population === undefined ||
    !restData.flags.png
  ) {
    throw new Error(`unexpected country detail rest data ${restData}`);
  }
}

export function convertToCountrySummary(restData: unknown): ICountrySummary {
  checkCountrySummaryRestData(restData);
  const result: ICountrySummary = {
    name: restData.name.common,
    capital: restData.capital,
    region: restData.region,
    population: restData.population,
    flag: restData.flags.png,
  };
  return result;
}

export function sortCountrySummary(data: ICountrySummary[]): ICountrySummary[] {
  return [...data].sort((a, b) => a.name.localeCompare(b.name));
}

export function sortStrings(data: string[]): string[] {
  return [...data].sort((a, b) => a.localeCompare(b));
}

export function convertToCountryDetail(restData: unknown): ICountryDetail {
  checkCountrySummaryRestData(restData);
  const result: ICountryDetail = {
    name: restData.name.common,
    capital: restData.capital,
    region: restData.region,
    population: restData.population,
    flag: restData.flags.png,
    nativeName: "error",
    subRegion: "error",
    topLevelDomain: "error",
    currencies: ["error"],
    languages: ["error"],
    borderCountries: ["error"],
  };
  return result;
}

export const REST_COUNTRIES_BASE_URL = new URL(
  "https://restcountries.com/v3.1",
);

export function getAllCountriesBaseUrl() {
  return new URL(REST_COUNTRIES_BASE_URL + "/all");
}

export function getNamedCountryBaseUrl(name: string) {
  return new URL(REST_COUNTRIES_BASE_URL + `/${name}`);
}

export function addFieldsToUrl(baseUrl: URL, fields: string[]): URL {
  const joinedFields = fields.join(",");
  const urlWithFields = baseUrl + "?fields=" + joinedFields;
  return new URL(urlWithFields);
}

export function getAllCountriesUrl() {
  const baseUrl = getAllCountriesBaseUrl();
  const fields = ["name", "capital", "region", "population", "flags"];
  const url = addFieldsToUrl(baseUrl, fields);
  return url;
}
export function getNamedCountryUrl(country: string) {
  const baseUrl = getNamedCountryBaseUrl(country);
  const fields = [
    "name",
    "capital",
    "region",
    "population",
    "flags",
    "subregion",
    "languages",
    "borders",
  ];
  const url = addFieldsToUrl(baseUrl, fields);
  return url;
}
