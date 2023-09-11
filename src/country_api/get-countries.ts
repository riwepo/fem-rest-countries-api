import { getUniqueRegions, wrapInResultObject } from "./get-countries-helpers";

// sample URL to get all regions
// https://restcountries.com/v3.1/all?fields=region

// calls restcounteies API and gets all regions
// returns value or error wrapped in an object
export async function getAllRegions() {
  const url = new URL("https://restcountries.com/v3.1/all?fields=region");
  const result = getCountries(url);
  return result;
}

// calls restcountries API at given URL
// returns value or error wrapped in an object
export async function getCountries(url: URL) {
  let result;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `restcountries request failed with error: ${response.status}`,
      );
    }
    const getCountriesResult = await response.json();
    const uniqueRegions = getUniqueRegions(getCountriesResult);
    const result = wrapInResultObject(uniqueRegions);
    return result;
  } catch (error) {
    result = { isOk: false, error: error.message };
    return result;
  }
}
