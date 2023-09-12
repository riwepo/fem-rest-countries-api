export interface IGetCountriesResult {
  isOk: boolean;
  value: object | null;
  error: string | null;
}

export interface ICountrySummary {
  name: string;
  capital: string;
  region: string;
  population: number;
  flag: URL;
}

// export function getUniqueRegions(regionObjects: { region: string }[]) {
//   const regionStrings: string[] = regionObjects.map((object) => object.region);
//   const uniqueRegions = [...new Set(regionStrings)];
//   return uniqueRegions;
// }

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

// typical shape of country summary rest data for reference
// Object {
//   "flags": Object {
//     "alt": "The flag of Suriname is composed of five horizontal bands of green, white, red, white and green in the ratio of 2:1:4:1:2. A large five-pointed yellow star is centered in the red band.",
//     "png": "https://flagcdn.com/w320/sr.png",
//     "svg": "https://flagcdn.com/sr.svg",
//   },
//   "name": Object {
//     "common": "Suriname",
//     "nativeName": Object {
//       "nld": Object {
//         "common": "Suriname",
//         "official": "Republiek Suriname",
//       },
//     },
//     "official": "Republic of Suriname",
//   },
//   "population": 586634,
//   "region": "Americas",
// },
