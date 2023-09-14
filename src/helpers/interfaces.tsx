export interface IGetCountriesResult {
  isOk: boolean;
  value: object | [] | null;
  error: string | null;
}

export interface IRegion {
  region: string;
}

export interface IName {
  name: string;
}

export interface ICountrySummary extends IRegion, IName {
  capital: string;
  population: number;
  flag: URL;
}
