import { IRegion, IName } from "./interfaces";

export function filterByRegion(
  countries: IRegion[],
  region: string,
): IRegion[] {
  const matchingRegions = countries.filter(
    (country) => country.region === region,
  );
  return matchingRegions;
}

export function filterBySearchTerm(
  countries: IName[],
  searchTerm: string,
): IName[] {
  const matchingNames = countries.filter((name) =>
    name.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return matchingNames;
}
