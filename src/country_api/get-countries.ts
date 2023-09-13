import {
  wrapInResultObject,
  processError,
  ICountrySummary,
  convertToCountrySummary,
  IGetCountriesResult,
  sortCountrySummary,
  sortStrings,
} from "./get-countries-helpers";

const GET_ALL_COUNTRIES_SUMMARY_URL = new URL(
  "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags",
);

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

export function getUniqueRegions(regionObjects: { region: string }[]) {
  const regionStrings: string[] = regionObjects.map((object) => object.region);
  const uniqueRegions = [...new Set(regionStrings)];
  const sorted = sortStrings(uniqueRegions);
  return sorted;
}

export function filterByRegion(
  countries: { region: string }[],
  region: string,
): { region: string }[] {
  const matchingRegion = countries.filter(
    (country) => country.region === region,
  );
  return matchingRegion;
}
