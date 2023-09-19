export interface IGetCountriesResult {
  isOk: boolean;
  value: object | [] | null;
  error: string | null;
}
export type ParseResultType = string | number | object | [] | null;

export interface IParseResult {
  hasError: () => boolean;
  hasWarnings: () => boolean;
  value: ParseResultType;
  error: string | null;
  warnings: string[];
}

export interface IRegion {
  region: string;
}

export interface IName {
  name: string;
}

export interface ICca3Code {
  cca3Code: string;
}

export interface ICca3CodeName extends ICca3Code, IName {}

export interface ICountrySummary extends IRegion, IName, ICca3Code {
  capital: string;
  population: number;
  flag: URL;
}

export interface ICountryDetail extends ICountrySummary {
  nativeName: string;
  subRegion: string;
  topLevelDomain: string;
  currencies: string[];
  languages: string[];
  borderCountries: string[];
}

export interface ICountryDetail2 extends ICountryDetail {
  borderCountriesCodeNames: ICca3CodeName[];
}

export enum DisplayMode {
  Light = 1,
  Dark,
}
