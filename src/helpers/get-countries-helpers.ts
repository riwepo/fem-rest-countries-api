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
  if (typeof restData !== "object")
    throw new Error(`expected object but received ${typeof restData}`);
  let errorCode = 0;
  if (!restData) errorCode = 1;
  if (!restData.cca3) errorCode = 2;
  if (!restData.name) errorCode = 3;
  if (!restData.name.common) errorCode = 4;
  if (!restData.capital) errorCode = 5;
  if (!restData.region) errorCode = 6;
  if (restData.population === null || restData.population === undefined)
    errorCode = 7;
  if (!restData.flags) errorCode = 8;
  if (!restData.flags.png) errorCode = 9;
  if (errorCode !== 0) {
    throw new Error(
      `unexpected country summary rest data with error code ${errorCode} ${JSON.stringify(
        restData,
      )}`,
    );
  }
}

export function checkCountryDetailRestData(restData: unknown): void {
  checkCountrySummaryRestData(restData);
  let errorCode = 0;
  if (!restData.subregion) errorCode = 1;
  if (!restData.languages) errorCode = 2;
  if (!restData.languages[Object.keys(restData.languages)[0]]) errorCode = 3;
  if (!restData.borders) errorCode = 4;
  if (!restData.name.nativeName) errorCode = 5;
  if (
    !restData.name.nativeName[Object.keys(restData.name.nativeName)[0]].common
  )
    errorCode = 6;
  if (!restData.tld) errorCode = 7;
  if (!restData.currencies) errorCode = 8;
  if (!restData.currencies[Object.keys(restData.currencies)[0]].name)
    errorCode = 9;
  if (errorCode !== 0) {
    throw new Error(
      `unexpected country detail rest data with error code ${errorCode} ${JSON.stringify(
        restData,
      )}`,
    );
  }
}

export function convertToCountrySummary(restData: unknown): ICountrySummary {
  checkCountrySummaryRestData(restData);
  const result: ICountrySummary = {
    cca3Code: restData.cca3,
    name: restData.name.common,
    capital: restData.capital[0],
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
  checkCountryDetailRestData(restData);
  const summary = convertToCountrySummary(restData);
  const currencies = convertCurrencies(restData.currencies);
  const detail = {
    ...summary,
    nativeName:
      restData.name.nativeName[Object.keys(restData.name.nativeName)[0].common],
    subRegion: restData.subregion,
    topLevelDomain: restData.tld[0],
    currencies: currencies,
    languages: restData.languages,
    borderCountries: restData.borders,
  };
  return detail;
}

export function convertCurrencies(restData): string[] {
  return Object.keys(restData).map((key) => restData[key].name);
}

export const REST_COUNTRIES_BASE_URL = new URL(
  "https://restcountries.com/v3.1",
);

export function getAllCountriesBaseUrl() {
  return new URL(REST_COUNTRIES_BASE_URL + "/all");
}

export function getCountryByCodeBaseUrl(cca3Code: string) {
  return new URL(REST_COUNTRIES_BASE_URL + `/alpha/${cca3Code}`);
}

export function addFieldsToUrl(baseUrl: URL, fields: string[]): URL {
  const joinedFields = fields.join(",");
  const urlWithFields = baseUrl + "?fields=" + joinedFields;
  return new URL(urlWithFields);
}

export const summaryFields = [
  "cca3",
  "name",
  "capital",
  "region",
  "population",
  "flags",
];
export const detailFields = [
  ...summaryFields,
  "subregion",
  "languages",
  "borders",
  "tld",
  "currencies",
];

export function getAllCountriesUrl() {
  const baseUrl = getAllCountriesBaseUrl();
  const url = addFieldsToUrl(baseUrl, summaryFields);
  return url;
}
export function getCountryByCodeUrl(cca3Code: string) {
  const baseUrl = getCountryByCodeBaseUrl(cca3Code);
  const url = addFieldsToUrl(baseUrl, detailFields);
  return url;
}
