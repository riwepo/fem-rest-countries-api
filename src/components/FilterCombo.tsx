import Card from "./Card";

import icons8ChevronDown from "../assets/icons8-chevron-down-24.png";

function FilterCombo() {
  return (
    <Card className="inline-flex items-center justify-around gap-2 p-2">
      <p className="p-1">Filter by Region</p>
      <img src={icons8ChevronDown} alt="chevron down" className="w-8" />
    </Card>
  );
}

export default FilterCombo;
