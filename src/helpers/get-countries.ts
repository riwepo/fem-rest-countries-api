import {
  IGetCountriesResult,
  ICountrySummary,
  ICountryDetail,
} from "./interfaces";
import {
  wrapInResultObject,
  processError,
  convertToCountrySummary,
  convertToCountryDetail,
  sortCountrySummary,
  sortStrings,
} from "./get-countries-helpers";

const GET_ALL_COUNTRIES_SUMMARY_URL = new URL(
  "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags",
);

function getCountryDetailUrl(name: string) {
  const result = `https://restcountries.com/v3.1/name/${name}`;
  return result;
}

export async function getAllCountriesSummary(): Promise<IGetCountriesResult> {
  let result;
  try {
    const response = await fetch(GET_ALL_COUNTRIES_SUMMARY_URL);
    if (!response.ok) {
      throw new Error(
        `restcountries request failed with error: ${response.status}`,
      );
    }
    const getAllCountriesSummaryResult = await response.json();
    const countrySummaries: ICountrySummary[] =
      getAllCountriesSummaryResult.map((restData: unknown) =>
        convertToCountrySummary(restData),
      );
    const sorted = sortCountrySummary(countrySummaries);
    const result = wrapInResultObject(sorted);
    return result;
  } catch (error: unknown) {
    result = processError(error);
    return result;
  }
}

export async function getAllCountriesSummarySlowWithError(): Promise<IGetCountriesResult> {
  await new Promise((r) => setTimeout(r, 2000));
  const errorResult = Promise.resolve({
    isOk: false,
    error: "some error",
    value: null,
  });
  return errorResult;
}

export function getUniqueRegions(regionObjects: { region: string }[]) {
  const regionStrings: string[] = regionObjects.map((object) => object.region);
  const uniqueRegions = [...new Set(regionStrings)];
  const sorted = sortStrings(uniqueRegions);
  return sorted;
}

export async function getCountryDetail(
  name: string,
): Promise<IGetCountriesResult> {
  let result;
  try {
    const url = getCountryDetailUrl(name);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `restcountries request failed with error: ${response.status}`,
      );
    }
    const getCountryDetailResult = await response.json();
    const countryDetail: ICountryDetail = convertToCountryDetail(
      getCountryDetailResult,
    );
    const result = wrapInResultObject(countryDetail);
    return result;
  } catch (error: unknown) {
    result = processError(error);
    return result;
  }
}
