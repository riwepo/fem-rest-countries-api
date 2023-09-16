import { ICountrySummary, ICountryDetail, IParseResult } from "./interfaces";

class ParseResult implements IParseResult {
  constructor(
    value: string | number | object | [] | null,
    error: string = "",
    warnings: string[] = [],
  ) {
    this.value = value;
    this.error = error;
    this.warnings = warnings;
  }
  error: string;
  warnings: string[];
  value: string | number | object | [] | null;
  hasError() {
    return this.error !== "";
  }
  hasWarnings() {
    return this.warnings.length > 0;
  }
}

export function parseCountrySummaryRestData(restData): IParseResult {
  let warnings: string[] = [];

  if (typeof restData !== "object")
    return new ParseResult(
      null,
      `expected object but received ${typeof restData}`,
    );

  // cca3 is a string that must have a value
  const parseCca3 = parseNonEmptyString(restData, "cca3");
  if (parseCca3.hasError()) {
    return parseCca3;
  }

  // name is an object that must have a 'common' property
  const parseName = parseObjectProperty(restData, "name");
  if (parseName.hasError()) {
    return parseName;
  }
  const parseCommonName = parseNonEmptyString(restData.name, "common");
  if (parseCommonName.hasError()) {
    return parseCommonName;
  }

  // capital is an array
  // it is allowed to be empty
  // if it is there we take first entry, it must be a string
  // if it fails we issue a warning
  let parseCapitalEntry = new ParseResult("");
  const parseCapital = parseArrayProperty(restData, "capital");
  if (parseCapital.hasError()) {
    warnings = [...warnings, parseCapital.error];
  } else {
    if ((parseCapital.value as []).length > 0) {
      parseCapitalEntry = parseFirstEntryOfArray(restData, "capital");
      if (parseCapitalEntry.hasError()) {
        warnings = [...warnings, parseCapital.error];
      }
      if (typeof parseCapitalEntry.value !== "string") {
        warnings = [
          ...warnings,
          "expected capital to be array containing a string",
        ];
      }
    }
  }

  // region is a string that must have a value
  const parseRegion = parseNonEmptyString(restData, "region");
  if (parseRegion.hasError()) {
    return parseRegion;
  }

  // population is a number that must have a value
  // if it fails we issue a warning
  let parsePopulation = parseNumber(restData, "population");
  if (parsePopulation.hasError()) {
    warnings = [...warnings, parsePopulation.error];
    parsePopulation = new ParseResult(0);
  }

  // flags is an object that must have a 'png' property
  const parseFlags = parseObjectProperty(restData, "flags");
  if (parseFlags.hasError()) {
    return parseFlags;
  }
  const parseFlagPng = parseNonEmptyString(restData.flags, "png");
  if (parseFlagPng.hasError()) {
    return parseFlagPng;
  }

  const value: ICountrySummary = {
    cca3Code: parseCca3.value as string,
    name: parseCommonName.value as string,
    capital: parseCapitalEntry.value as string,
    region: parseRegion.value as string,
    population: parsePopulation.value as number,
    flag: new URL(parseFlagPng.value as string),
  };

  return new ParseResult(value, "", warnings);
}

export function parseCountryDetailRestData(restData): IParseResult {
  const summaryResult = parseCountrySummaryRestData(restData);
  if (summaryResult.hasError()) {
    return summaryResult;
  }

  let warnings: string[] = [...summaryResult.warnings];

  // border countries is an array
  // it is allowed to be empty
  // if it is there all entries must be a string
  // if it fails we issue a warning
  let parseBorders2 = new ParseResult([""]);
  const parseBorders1 = parseArrayProperty(restData, "borders");
  if (parseBorders1.hasError()) {
    warnings = [...warnings, parseBorders1.error];
  } else {
    if ((parseBorders1.value as []).length > 0) {
      parseBorders2 = parseStringArray(restData, "borders");
      if (parseBorders2.hasError()) {
        warnings = [...warnings, parseBorders2.error];
        parseBorders2 = new ParseResult([""]);
      }
    }
  }

  // currencies is an object
  // it is allowed to be empty
  // if it is not empty, each property in the object must have a 'name' field
  // if it fails we issue a warning
  let parseCurrencies2 = new ParseResult([""]);
  const parseCurrencies1 = parseObjectProperty(restData, "currencies");
  if (parseCurrencies1.hasError()) {
    warnings = [...warnings, parseCurrencies1.error];
  } else {
    if (Object.keys(parseCurrencies1.value as object).length > 0) {
      parseCurrencies2 = parseObjectsWithChildProperty(
        restData,
        "currencies",
        "name",
      );
      if (parseCurrencies2.hasError()) {
        warnings = [...warnings, parseCurrencies2.error];
        parseCurrencies2 = new ParseResult([""]);
      }
    }
  }

  const value: ICountryDetail = {
    ...(summaryResult.value as ICountrySummary),
    nativeName: "error",
    subRegion: "error",
    topLevelDomain: "error",
    currencies: parseCurrencies2.value as string[],
    languages: ["error"],
    borderCountries: parseBorders2.value as string[],
  };

  return new ParseResult(value, "", warnings);
}

function parseNonEmptyString(data, propertyName: string) {
  if (typeof data[propertyName] !== "string" || data[propertyName] === "") {
    return new ParseResult(
      null,
      `expected non-empty string for property '${propertyName}'`,
    );
  }
  return new ParseResult(data[propertyName]);
}

function parseObjectProperty(data, propertyName: string) {
  if (typeof data[propertyName] !== "object") {
    return new ParseResult(
      null,
      `expected object for property '${propertyName}'`,
    );
  }
  return new ParseResult(data[propertyName]);
}

function parseArrayProperty(data, propertyName: string) {
  if (!Array.isArray(data[propertyName])) {
    return new ParseResult(
      null,
      `expected array for property '${propertyName}'`,
    );
  }
  return new ParseResult(data[propertyName]);
}

function parseFirstEntryOfArray(data, propertyName: string) {
  if (!Array.isArray(data[propertyName])) {
    return new ParseResult(
      null,
      `expected array for property '${propertyName}'`,
    );
  }
  if (data[propertyName].length === 0) {
    return new ParseResult(
      null,
      `expected non-empty array for property '${propertyName}'`,
    );
  }
  return new ParseResult(data[propertyName][0]);
}

function parseStringArray(data, propertyName: string) {
  const result = data[propertyName].map((entry) => {
    if (typeof entry !== "string") {
      return new ParseResult(
        null,
        `expected all entries in property ${propertyName} to be strings`,
      );
    }
    return entry;
  });
  return new ParseResult(result);
}

function parseObjectsWithChildProperty(
  data,
  propertyName: string,
  childPropertyName: string,
) {
  const result = Object.keys(data[propertyName]).map((key) => {
    const childObject = data[propertyName][key];
    const childObjectKeys = Object.keys(childObject);
    if (!childObjectKeys.includes(childPropertyName)) {
      return new ParseResult(
        null,
        `expected all child objects of property ${propertyName} to have property ${childPropertyName}`,
      );
    }
    return childObject[childPropertyName];
  });
  return new ParseResult(result);
}

function parseNumber(data, propertyName: string) {
  if (typeof data[propertyName] !== "number") {
    return new ParseResult(
      null,
      `expected non-empty string for property '${propertyName}'`,
    );
  }
  return new ParseResult(data[propertyName]);
}
