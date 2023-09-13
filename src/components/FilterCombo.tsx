import Card from "./Card";

import { useState } from "react";

import icons8ChevronDown from "../assets/icons8-chevron-down-24.png";
import icons8ChevronUp from "../assets/icons8-chevron-up-24.png";
import icons8Checkmark from "../assets/icons8-checkmark-24.png";

interface FilterComboProps {
  options: string[];
  onSelectionChanged: (a: string) => void;
}

const FilterCombo: React.FC<FilterComboProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const openCloseClickHandler = () => {
    setIsOpen((current: boolean) => !current);
  };
  const selectRegionClickHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const button = (event.target as HTMLElement).closest("button");
    const option = (button as HTMLButtonElement).dataset["option"];
    let currentOption: string;
    if (option === selectedOption) {
      currentOption = "";
    } else {
      currentOption = option as string;
    }
    setSelectedOption(currentOption);
    props.onSelectionChanged(currentOption);
  };
  return (
    <Card className="relative inline-flex">
      <button
        className="flex items-center justify-around gap-2 p-2"
        onClick={openCloseClickHandler}
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
            return (
              <button
                className="flex gap-2"
                key={option}
                onClick={selectRegionClickHandler}
                data-option={option}
              >
                <img
                  src={icons8Checkmark}
                  alt="checkmark"
                  className={`aspect-square w-4 ${
                    selectedOption !== option && "invisible"
                  }`}
                />
                <p>{option}</p>
              </button>
            );
          })}
        </Card>
      )}
    </Card>
  );
};

export default FilterCombo;
