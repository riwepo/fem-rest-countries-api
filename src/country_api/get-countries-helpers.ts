export function getUniqueRegions(regionObjects: { region: string }[]) {
  const regionStrings: string[] = regionObjects.map((object) => object.region);
  const uniqueRegions = [...new Set(regionStrings)];
  return uniqueRegions;
}

export function wrapInResultObject(value) {
  const result = { isOk: true, value: value };
  return result;
}
