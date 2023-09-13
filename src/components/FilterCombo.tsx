import Card from "./Card";

import icons8ChevronDown from "../assets/icons8-chevron-down-24.png";

interface FilterComboProps {
  options: string[];
  onSelectionChanged: (a: string) => void;
}

const FilterCombo: React.FC<FilterComboProps> = (props) => {
  return (
    <Card className="relative inline-flex">
      <button className="flex items-center justify-around gap-2 p-2">
        <p className="p-1">Filter by Region</p>
        <img src={icons8ChevronDown} alt="chevron down" className="w-8" />
      </button>
      <Card className="absolute bottom-0 left-0 flex translate-y-[105%] transform flex-col gap-2 p-2">
        {props.options.map((option) => {
          return <p>{option}</p>;
        })}
      </Card>
    </Card>
  );
};

export default FilterCombo;
