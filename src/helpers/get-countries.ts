import {
  IGetCountriesResult,
  ICountrySummary,
  ICountryDetail,
  IParseResult,
  ICca3CodeName,
} from "./interfaces";

import {
  wrapInResultObject,
  processError,
  sortCountrySummary,
  sortStrings,
  getAllCountriesUrl,
  getCountryByCodeUrl,
  getCountyDetail2,
} from "./get-countries-helpers";

import {
  parseCountrySummaryRestData,
  parseCountryDetailRestData,
} from "./parsing";

export async function getAllCountriesSummary(): Promise<IGetCountriesResult> {
  let result;
  try {
    const url = getAllCountriesUrl();
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `restcountries request failed with error: ${response.status}`,
      );
    }
    const getAllCountriesSummaryResult = await response.json();

    const countrySummaries: ICountrySummary[] =
      getAllCountriesSummaryResult.map((restData: unknown) => {
        const parseResult = parseCountrySummaryRestData(restData);
        if (parseResult.hasError()) {
          throw new Error(
            `parsing of restcountries data failed with error '${parseResult.error}'`,
          );
        }
        if (parseResult.hasWarnings()) {
          parseResult.warnings.map((warn) => console.log(warn));
        }
        const countrySummary = parseResult.value as ICountrySummary;
        return countrySummary;
      });

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
  codeNames: ICca3CodeName[],
  code: string,
): Promise<IGetCountriesResult> {
  let result;
  try {
    const url = getCountryByCodeUrl(code);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `restcountries request failed with error: ${response.status}`,
      );
    }
    const getCountryDetailResult = await response.json();
    const parseResult: IParseResult = parseCountryDetailRestData(
      getCountryDetailResult,
    );
    if (parseResult.hasError()) {
      throw new Error(
        `parsing of restcountries data failed with error '${parseResult.error}'`,
      );
    }
    if (parseResult.hasWarnings()) {
      parseResult.warnings.map((warn) => console.log(warn));
    }
    const countryDetail: ICountryDetail = parseResult.value as ICountryDetail;
    const countryDetail2 = getCountyDetail2(codeNames, countryDetail);

    const result = wrapInResultObject(countryDetail2);
    return result;
  } catch (error: unknown) {
    result = processError(error);
    return result;
  }
}
