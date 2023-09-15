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
  if (!restData.name) errorCode = 2;
  if (!restData.name.common) errorCode = 3;
  if (!restData.capital) errorCode = 4;
  if (!restData.region) errorCode = 5;
  if (restData.population === null || restData.population === undefined)
    errorCode = 6;
  if (!restData.flags) errorCode = 7;
  if (!restData.flags.png) errorCode = 8;
  if (errorCode !== 0) {
    throw new Error(
      `unexpected country summary rest data with error code ${errorCode} ${JSON.stringify(
        restData,
      )}`,
    );
  }
}

export function checkCountryDetailRestData(restData: unknown): void {
  // we expect an array with 1 entry
  if (!Array.isArray(restData))
    throw new Error(`expected array but received ${typeof restData}`);
  if (restData.length !== 1)
    throw new Error(
      `expected array with 1 entry but received ${restData.length}`,
    );
  const restDataItem = restData[0];

  checkCountrySummaryRestData(restDataItem);
  let errorCode = 0;
  if (!restDataItem.subregion) errorCode = 1;
  if (!restDataItem.languages) errorCode = 2;
  if (!restDataItem.languages[Object.keys(restDataItem.languages)[0]])
    errorCode = 3;
  if (!restDataItem.borders) errorCode = 4;
  if (!restDataItem.name.nativeName) errorCode = 5;
  if (
    !restDataItem.name.nativeName[Object.keys(restDataItem.name.nativeName)[0]]
      .common
  )
    errorCode = 6;
  if (!restDataItem.tld) errorCode = 7;
  if (!restDataItem.currencies) errorCode = 8;
  if (!restDataItem.currencies[Object.keys(restDataItem.currencies)[0]].name)
    errorCode = 9;
  if (errorCode !== 0) {
    throw new Error(
      `unexpected country detail rest data with error code ${errorCode} ${JSON.stringify(
        restDataItem,
      )}`,
    );
  }
}

export function convertToCountrySummary(restData: unknown): ICountrySummary {
  checkCountrySummaryRestData(restData);
  const result: ICountrySummary = {
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
  const restDataItem = restData[0];
  const summary = convertToCountrySummary(restDataItem);
  const detail = {
    ...summary,
    nativeName:
      restDataItem.name.nativeName[
        Object.keys(restDataItem.name.nativeName)[0].common
      ],
    subRegion: restDataItem.subregion,
    topLevelDomain: restDataItem.tld[0],
    currencies: restDataItem.currencies,
    languages: restDataItem.languages,
    borderCountries: restDataItem.borders,
  };
  return detail;
}

export const REST_COUNTRIES_BASE_URL = new URL(
  "https://restcountries.com/v3.1",
);

export function getAllCountriesBaseUrl() {
  return new URL(REST_COUNTRIES_BASE_URL + "/all");
}

export function getNamedCountryBaseUrl(name: string) {
  return new URL(REST_COUNTRIES_BASE_URL + `/name/${name}`);
}

export function addFieldsToUrl(baseUrl: URL, fields: string[]): URL {
  const joinedFields = fields.join(",");
  const urlWithFields = baseUrl + "?fields=" + joinedFields;
  return new URL(urlWithFields);
}

export const summaryFields = [
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
export function getNamedCountryUrl(country: string) {
  const baseUrl = getNamedCountryBaseUrl(country);
  const url = addFieldsToUrl(baseUrl, detailFields);
  return url;
}
