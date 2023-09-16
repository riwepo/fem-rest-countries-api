import { ICountrySummary, IParseResult } from "./interfaces";

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
  let parseCapitalEntry = new ParseResult("");
  const parseCapital = parseArray(restData, "capital");
  if (parseCapital.hasError()) {
    return parseCapital;
  }
  if ((parseCapital.value as []).length > 0) {
    parseCapitalEntry = parseFirstEntryOfArray(restData, "capital");
    if (parseCapitalEntry.hasError()) {
      return parseCapitalEntry;
    }
    if (typeof parseCapitalEntry.value !== "string") {
      return new ParseResult(
        null,
        "expected capital to be array containing a string",
      );
    }
  }

  // region is a string that must have a value
  const parseRegion = parseNonEmptyString(restData, "region");
  if (parseRegion.hasError()) {
    return parseRegion;
  }

  // population is a number that must have a value
  const parsePopulation = parseNumber(restData, "population");
  if (parsePopulation.hasError()) {
    return parsePopulation;
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

  return new ParseResult(value);
}

function parseNonEmptyString(data, propertyName: string) {
  if (typeof data[propertyName] !== "string" || data[propertyName] === "") {
    return new ParseResult(
      null,
      `expected non-empty string for property ${propertyName}`,
    );
  }
  return new ParseResult(data[propertyName]);
}

function parseObjectProperty(data, propertyName: string) {
  if (typeof data[propertyName] !== "object") {
    return new ParseResult(
      null,
      `expected object for property ${propertyName}`,
    );
  }
  return new ParseResult(data[propertyName]);
}

function parseArray(data, propertyName: string) {
  if (!Array.isArray(data[propertyName])) {
    return new ParseResult(null, `expected array for property ${propertyName}`);
  }
  return new ParseResult(data[propertyName]);
}

function parseFirstEntryOfArray(data, propertyName: string) {
  if (!Array.isArray(data[propertyName])) {
    return new ParseResult(null, `expected array for property ${propertyName}`);
  }
  if (data[propertyName].length === 0) {
    return new ParseResult(
      null,
      `expected non-empty array for property ${propertyName}`,
    );
  }
  return new ParseResult(data[propertyName][0]);
}

function parseNumber(data, propertyName: string) {
  if (typeof data[propertyName] !== "number") {
    return new ParseResult(
      null,
      `expected non-empty string for property ${propertyName}`,
    );
  }
  return new ParseResult(data[propertyName]);
}
