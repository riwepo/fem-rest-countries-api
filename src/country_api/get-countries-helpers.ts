export interface IGetCountriesResult {
  isOk: boolean;
  value: object | [] | null;
  error: string | null;
}

export interface IRegion {
  region: string;
}

export interface ICountrySummary extends IRegion {
  name: string;
  capital: string;
  population: number;
  flag: URL;
}

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
