import {
  ICountrySummary,
  ICountryDetail,
  ICountryDetail2,
} from "../helpers/interfaces";

export const antarcticaSummaryRest = {
  flags: {
    png: "https://flagcdn.com/w320/aq.png",
  },
  name: { common: "Antarctica", nativeName: {} },
  cca3: "ATA",
  capital: [],
  region: "Antarctic",
  population: 1000,
};

export const antarcticaDetailRest = {
  flags: {
    png: "https://flagcdn.com/w320/aq.png",
  },
  name: { common: "Antarctica", nativeName: {} },
  tld: [".aq"],
  cca3: "ATA",
  currencies: {},
  capital: [],
  region: "Antarctic",
  subregion: "",
  languages: {},
  borders: [],
  population: 1000,
};

export const antarcticaSummary: ICountrySummary = {
  capital: "",
  cca3Code: "ATA",
  flag: new URL("https://flagcdn.com/w320/aq.png"),
  name: "Antarctica",
  population: 1000,
  region: "Antarctic",
};

export const antarcticaDetail: ICountryDetail = {
  ...antarcticaSummary,
  borderCountries: [],
  currencies: [],
  languages: [],
  nativeName: "",
  subRegion: "",
  topLevelDomain: ".aq",
};

export const antarcticaDetail2: ICountryDetail2 = {
  ...antarcticaDetail,
  borderCountriesCodeNames: [],
};

export const germanySummaryRest = {
  flags: {
    png: "https://flagcdn.com/w320/de.png",
  },
  name: {
    common: "Germany",
  },
  cca3: "DEU",
  capital: ["Berlin"],
  region: "Europe",
  population: 83240525,
};

export const germanyDetailRest = {
  flags: {
    png: "https://flagcdn.com/w320/de.png",
  },
  name: {
    common: "Germany",
    nativeName: {
      deu: { common: "Deutschland" },
    },
  },
  tld: [".de"],
  cca3: "DEU",
  currencies: { EUR: { name: "Euro", symbol: "€" } },
  capital: ["Berlin"],
  region: "Europe",
  subregion: "Western Europe",
  languages: { deu: "German" },
  borders: ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"],
  population: 83240525,
};

export const germanySummary: ICountrySummary = {
  capital: "Berlin",
  cca3Code: "DEU",
  flag: new URL("https://flagcdn.com/w320/de.png"),
  name: "Germany",
  population: 83240525,
  region: "Europe",
};

export const germanyDetail: ICountryDetail = {
  ...germanySummary,
  borderCountries: [
    "AUT",
    "BEL",
    "CZE",
    "DNK",
    "FRA",
    "LUX",
    "NLD",
    "POL",
    "CHE",
  ],
  currencies: ["Euro"],
  languages: ["German"],
  nativeName: "Deutschland",
  subRegion: "Western Europe",
  topLevelDomain: ".de",
};

export const germanyDetail2: ICountryDetail2 = {
  ...germanyDetail,
  borderCountriesCodeNames: [
    { cca3Code: "AUT", name: "Austria" },
    { cca3Code: "BEL", name: "Belgium" },
    { cca3Code: "CZE", name: "Czeoslovakia" },
    { cca3Code: "DNK", name: "Denmark" },
    { cca3Code: "FRA", name: "France" },
    { cca3Code: "LUX", name: "Luxembourg" },
    { cca3Code: "NLD", name: "Neverlands" },
    { cca3Code: "POL", name: "Poland" },
    { cca3Code: "CHE", name: "Chechnia" },
  ],
};
