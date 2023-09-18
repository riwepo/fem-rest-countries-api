import {
  IGetCountriesResult,
  ICountrySummary,
  ICca3CodeName,
  ICountryDetail,
  ICountryDetail2,
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

export function sortCountrySummary(data: ICountrySummary[]): ICountrySummary[] {
  return [...data].sort((a, b) => a.name.localeCompare(b.name));
}

export function sortStrings(data: string[]): string[] {
  return [...data].sort((a, b) => a.localeCompare(b));
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

export function getCca3CodeName(
  codeNames: ICca3CodeName[],
  cca3Code: string,
): ICca3CodeName {
  const filteredCodeNames = codeNames.filter(
    (codeName) => codeName.cca3Code === cca3Code,
  );
  if (filteredCodeNames.length !== 1) {
    throw new Error(
      `expected 1 matching entry for cca3Code '${cca3Code}' but found ${filteredCodeNames.length} `,
    );
  }
  return filteredCodeNames[0];
}

export function getCountyDetail2(
  codeNames: ICca3CodeName[],
  countryDetail: ICountryDetail,
): ICountryDetail2 {
  const borderCodeNames = countryDetail.borderCountries.map((borderCountry) =>
    getCca3CodeName(codeNames, borderCountry),
  );
  const result = {
    ...countryDetail,
    borderCountriesCodeNames: borderCodeNames,
  };
  return result;
}
