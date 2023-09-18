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
  const comboRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useOnClickOutside(comboRef, () => setIsOpen(false));
  const [selectedOption, setSelectedOption] = useState<string>("");
  const openCloseClickHandler = () => {
    setIsOpen((current) => !current);
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
    <Card className="relative inline-flex bg-clrDarkElements">
      {/* note the comboRef contains both the popup and the combo part */}
      <div ref={comboRef}>
        <button
          className="flex items-center justify-around gap-2 rounded-md bg-clrElements p-2 text-clrText dark:bg-clrDarkElements dark:text-clrDarkText"
          onClick={openCloseClickHandler}
        >
          <p className="p-1">Filter by Region</p>
          {!isOpen && (
            <ChevronDown
              className="h-8 w-8 stroke-clrText dark:stroke-clrDarkText"
              title="chevron down"
            />
          )}
          {isOpen && (
            <ChevronUp
              className="h-8 w-8 stroke-clrText dark:stroke-clrDarkText"
              title="chevron up"
            />
          )}
        </button>
        {isOpen && (
          <Card className="absolute bottom-0 left-0 flex translate-y-[105%] transform flex-col gap-2 overflow-hidden bg-clrElements p-2 text-clrText dark:bg-clrDarkElements dark:text-clrDarkText">
            {props.options.map((option) => {
              return (
                <button
                  className="flex items-center gap-2"
                  key={option}
                  onClick={selectRegionClickHandler}
                  data-option={option}
                >
                  <Checkmark
                    className={`aspect-square h-4 w-4 stroke-clrText dark:stroke-clrDarkText ${
                      selectedOption !== option && "invisible"
                    }`}
                    title="checkmark"
                  />
                  <p>{option}</p>
                </button>
              );
            })}
          </Card>
        )}
      </div>
    </Card>
  );
};

export default FilterCombo;
