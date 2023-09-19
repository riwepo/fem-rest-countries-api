import Card from "./Card";

import { ReactComponent as MagnifyingGlass } from "../assets/icons8-magnifying-glass.svg";
interface SearchInputProps {
  onSearchChanged: (a: string) => void;
  className: string;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const keyDownHandler = (event: React.KeyboardEvent) => {
    if (event.code === "Enter") {
      const enteredValue = (event.target as HTMLInputElement).value;
      props.onSearchChanged(enteredValue);
    }
  };
  return (
    <Card
      className={`flex items-center justify-around gap-2 bg-clrElements p-2 text-clrText dark:bg-clrDarkElements dark:text-clrDarkText ${props.className}`}
    >
      <MagnifyingGlass
        className="fill-clrInput stroke-clrInput dark:fill-clrDarkInput dark:stroke-clrDarkInput"
        title="magnifying glass"
      />
      <input
        type="text"
        placeholder="Search for a country..."
        className="flex-1 bg-clrElements p-1 text-clrInput dark:bg-clrDarkElements dark:text-clrDarkInput"
        onKeyDown={keyDownHandler}
      />
    </Card>
  );
};

export default SearchInput;
