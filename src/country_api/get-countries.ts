import {
  //getUniqueRegions,
  wrapInResultObject,
  //IGetCountriesResult,
  processError,
  ICountrySummary,
  convertToCountrySummary,
  IGetCountriesResult,
  sortCountrySummary,
} from "./get-countries-helpers";

// sample URL to get all regions
// https://restcountries.com/v3.1/all?fields=region

// // calls restcounteies API and gets all regions
// // returns value or error wrapped in an object
// export async function getAllRegions(): Promise<IGetCountriesResult> {
//   const url = new URL("https://restcountries.com/v3.1/all?fields=region");
//   const result = getCountries(url);
//   return result;
// }

// // calls restcountries API at given URL
// // returns value or error wrapped in an object
// export async function getCountries(url: URL): Promise<IGetCountriesResult> {
//   let result;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(
//         `restcountries request failed with error: ${response.status}`,
//       );
//     }
//     const getCountriesResult = await response.json();
//     const uniqueRegions = getUniqueRegions(getCountriesResult);
//     const result = wrapInResultObject(uniqueRegions);
//     return result;
//   } catch (error) {
//     result = processError(error);
//     return result;
//   }
// }q

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
