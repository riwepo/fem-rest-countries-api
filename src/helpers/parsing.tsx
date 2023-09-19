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

export function parseCountrySummaryRestData(restData: unknown): IParseResult {
  let warnings: string[] = [];

  if (typeof restData !== "object")
    return new ParseResult(
      null,
      `expected object but received ${typeof restData}`,
    );

  // cca3 is a string that must have a value
  const parseCca3 = parseString(restData, "cca3", false);
  if (parseCca3.hasError()) {
    return parseCca3;
  }

  // name is an object that must have a 'common' property
  const parseName = parseObjectProperty(restData, "name");
  if (parseName.hasError()) {
    return parseName;
  }
  const restDataWithName = restData as { name: unknown };
  const parseCommonName = parseString(restDataWithName.name, "common", false);
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
  const parseRegion = parseString(restData, "region", false);
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
  const restDataWithFlags = restData as { flags: unknown };
  const parseFlagPng = parseString(restDataWithFlags.flags, "png", false);
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

export function parseCountryDetailRestData(restData: unknown): IParseResult {
  const summaryResult = parseCountrySummaryRestData(restData);
  if (summaryResult.hasError()) {
    return summaryResult;
  }

  let warnings: string[] = [...summaryResult.warnings];

  // border countries is an array
  // it is allowed to be empty
  // if it is there all entries must be a string
  // if it fails we issue a warning
  let parseBorders2 = new ParseResult([]);
  const parseBorders1 = parseArrayProperty(restData, "borders");
  if (parseBorders1.hasError()) {
    warnings = [...warnings, parseBorders1.error];
  } else {
    if ((parseBorders1.value as []).length > 0) {
      parseBorders2 = parseStringArray(restData, "borders");
      if (parseBorders2.hasError()) {
        warnings = [...warnings, parseBorders2.error];
        parseBorders2 = new ParseResult([]);
      }
    }
  }

  // currencies is an object
  // it is allowed to be empty
  // if it is not empty, each property in the object must have a 'name' field
  // if it fails we issue a warning
  let parseCurrencies2 = new ParseResult([]);
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
        parseCurrencies2 = new ParseResult([]);
      }
    }
  }

  // language is an object
  // it is allowed to be empty
  // if it is not empty, we take the value of the first property
  // we expect this value to be a string
  // if it fails we issue a warning
  let parseLanguages2 = new ParseResult([]);
  const parseLanguages1 = parseObjectProperty(restData, "languages");
  if (parseLanguages1.hasError()) {
    warnings = [...warnings, parseLanguages1.error];
  } else {
    if (Object.keys(parseLanguages1.value as object).length > 0) {
      parseLanguages2 = parseEachPropertyOfObject(restData, "languages");
      if (parseLanguages2.hasError()) {
        warnings = [...warnings, parseLanguages2.error];
        parseLanguages2 = new ParseResult([""]);
      } else if (
        !(parseLanguages2.value as []).every((item) => typeof item === "string")
      ) {
        warnings = [
          ...warnings,
          `expected all values of properties of object 'languages' to be strings`,
        ];
        parseLanguages2 = new ParseResult([]);
      }
    }
  }

  // native name is an object
  // it is allowed to be empty
  // if it is not empty, we take the value of the first property
  // we expect this value to be an object with a property 'common'
  // 'common' must be a string
  // if it fails we issue a warning
  let parseNativeName3 = new ParseResult("");
  const restDataWithName = restData as { name: object };
  const parseNativeName1 = parseObjectProperty(
    restDataWithName.name,
    "nativeName",
  );
  if (parseNativeName1.hasError()) {
    warnings = [...warnings, parseNativeName1.error];
  } else {
    if (Object.keys(parseNativeName1.value as object).length > 0) {
      const parseNativeName2 = parseFirstPropertyOfObject(
        restDataWithName.name,
        "nativeName",
      );
      if (parseNativeName2.hasError()) {
        warnings = [...warnings, parseNativeName2.error];
      } else {
        parseNativeName3 = parseString(parseNativeName2.value, "common", false);
        if (parseNativeName3.hasError()) {
          warnings = [...warnings, parseNativeName3.error];
          parseNativeName3 = new ParseResult("");
        }
      }
    }
  }

  // subregion is a string
  // it is allowed to be empty
  // if it fails we issue a warning
  const parseSubregion = parseString(restData, "subregion", true);
  if (parseSubregion.hasError()) {
    warnings = [...warnings, parseSubregion.error];
  }

  // top level domain is an array
  // it is not allowed to be empty
  // we take the first entry
  // it must be a string
  // if it fails we issue a warning
  let parseTopLevelDomain2 = new ParseResult("");
  const parseTopLevelDomain1 = parseArrayProperty(restData, "tld");
  if (parseTopLevelDomain1.hasError()) {
    warnings = [...warnings, parseTopLevelDomain1.error];
  } else {
    if ((parseTopLevelDomain1.value as []).length > 0) {
      parseTopLevelDomain2 = parseFirstEntryOfArray(restData, "tld");
      if (parseTopLevelDomain2.hasError()) {
        warnings = [...warnings, parseTopLevelDomain2.error];
        parseTopLevelDomain2 = new ParseResult("");
      } else {
        if (typeof parseTopLevelDomain2.value !== "string") {
          warnings = [...warnings, "expected tld to be string"];
          parseTopLevelDomain2 = new ParseResult("");
        }
      }
    }
  }

  const value: ICountryDetail = {
    ...(summaryResult.value as ICountrySummary),
    nativeName: parseNativeName3.value as string,
    subRegion: parseSubregion.value as string,
    topLevelDomain: parseTopLevelDomain2.value as string,
    currencies: parseCurrencies2.value as string[],
    languages: parseLanguages2.value as string[],
    borderCountries: parseBorders2.value as string[],
  };

  return new ParseResult(value, "", warnings);
}

// eslint-disable-next-line
function parseString(data: any, propertyName: string, canBeEmpty: boolean) {
  if (typeof data[propertyName] !== "string") {
    return new ParseResult(
      null,
      `expected string for property '${propertyName}'`,
    );
  }

  if (!canBeEmpty && data[propertyName] === "") {
    return new ParseResult(
      null,
      `expected non-empty string for property '${propertyName}'`,
    );
  }

  return new ParseResult(data[propertyName] as string);
}

// eslint-disable-next-line
function parseObjectProperty(data: any, propertyName: string) {
  if (typeof data[propertyName] !== "object") {
    return new ParseResult(
      null,
      `expected object for property '${propertyName}'`,
    );
  }
  return new ParseResult(data[propertyName] as object);
}

// eslint-disable-next-line
function parseArrayProperty(data: any, propertyName: string) {
  if (!Array.isArray(data[propertyName])) {
    return new ParseResult(
      null,
      `expected array for property '${propertyName}'`,
    );
  }
  return new ParseResult(data[propertyName] as []);
}

type NonEmptyArray<T> = [T, ...T[]];

// eslint-disable-next-line
function parseFirstEntryOfArray(data: any, propertyName: string) {
  const theArray: [] = data[propertyName];
  if (theArray.length === 0) {
    return new ParseResult(
      null,
      `expected non-empty array for property '${propertyName}'`,
    );
  }
  const value = // eslint-disable-next-line
  (theArray as unknown as NonEmptyArray<any>)[0] as unknown as ParseResult;
  return new ParseResult(value);
}

// eslint-disable-next-line
function parseEachPropertyOfObject(data: any, propertyName: string) {
  const keys = Object.keys(data[propertyName]);
  const values = keys.map((key) => data[propertyName][key]);
  return new ParseResult(values);
}

// eslint-disable-next-line
function parseFirstPropertyOfObject(data: any, propertyName: string) {
  const keys = Object.keys(data[propertyName]);
  const value = data[propertyName][keys[0]];
  return new ParseResult(value);
}

// eslint-disable-next-line
function parseStringArray(data: any, propertyName: string) {
  const result = (data[propertyName] as []).map((entry) => {
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
  // eslint-disable-next-line
  data: any,
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

// eslint-disable-next-line
function parseNumber(data: any, propertyName: string) {
  if (typeof data[propertyName] !== "number") {
    return new ParseResult(
      null,
      `expected non-empty string for property '${propertyName}'`,
    );
  }
  return new ParseResult(data[propertyName]);
}
