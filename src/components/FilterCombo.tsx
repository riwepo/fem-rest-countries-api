import { useState, useRef } from "react";

import Card from "./Card";

import useOnClickOutside from "../hooks/useOnClickOutside";

import { ReactComponent as ChevronDown } from "../assets/chevron-down-svgrepo-com.svg";
import { ReactComponent as ChevronUp } from "../assets/chevron-up-svgrepo-com.svg";
import { ReactComponent as Checkmark } from "../assets/checkmark-svgrepo-com.svg";

interface FilterComboProps {
  options: string[];
  onSelectionChanged: (a: string) => void;
}

const FilterCombo: React.FC<FilterComboProps> = (props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useOnClickOutside(modalRef, () => setIsOpen(false));
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
        className="flex items-center justify-around gap-2 bg-white p-2 text-black dark:bg-black dark:text-white"
        onClick={openCloseClickHandler}
      >
        <p className="p-1">Filter by Region</p>
        {!isOpen && (
          <ChevronDown className="h-8 w-8 stroke-black dark:stroke-white" />
        )}
        {isOpen && (
          <ChevronUp className="h-8 w-8 stroke-black dark:stroke-white" />
        )}
      </button>
      {isOpen && (
        <div ref={modalRef}>
          <Card className="absolute bottom-0 left-0 flex translate-y-[105%] transform flex-col gap-2 overflow-hidden bg-white p-2 text-black dark:bg-black dark:text-white">
            {props.options.map((option) => {
              return (
                <button
                  className="flex items-center gap-2"
                  key={option}
                  onClick={selectRegionClickHandler}
                  data-option={option}
                >
                  <Checkmark
                    className={`aspect-square h-4 w-4 stroke-black dark:stroke-white ${
                      selectedOption !== option && "invisible"
                    }`}
                  />
                  <p>{option}</p>
                </button>
              );
            })}
          </Card>
        </div>
      )}
    </Card>
  );
};

export default FilterCombo;
