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
  names: IName[],
  searchTerm: string,
): IName[] {
  const matchingNames = names.filter((name) =>
    name.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return matchingNames;
}
