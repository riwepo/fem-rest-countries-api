import Card from "./Card";

import { useState } from "react";

import icons8ChevronDown from "../assets/icons8-chevron-down-24.png";
import icons8ChevronUp from "../assets/icons8-chevron-up-24.png";

interface FilterComboProps {
  options: string[];
  onSelectionChanged: (a: string) => void;
}

const FilterCombo: React.FC<FilterComboProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const clickHandler = () => {
    console.log("click");
    setIsOpen((current: boolean) => !current);
  };
  return (
    <Card className="relative inline-flex">
      <button
        className="flex items-center justify-around gap-2 p-2"
        onClick={clickHandler}
      >
        <p className="p-1">Filter by Region</p>
        {!isOpen && (
          <img src={icons8ChevronDown} alt="chevron down" className="w-8" />
        )}
        {isOpen && (
          <img src={icons8ChevronUp} alt="chevron up" className="w-8" />
        )}
      </button>
      {isOpen && (
        <Card className="absolute bottom-0 left-0 flex translate-y-[105%] transform flex-col gap-2 p-2">
          {props.options.map((option) => {
            return <p key={option}>{option}</p>;
          })}
        </Card>
      )}
    </Card>
  );
};

export default FilterCombo;
