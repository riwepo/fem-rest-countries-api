import Card from "./Card";

import { ReactComponent as MagnifyingGlass } from "../assets/magnifying-glass-svgrepo-com.svg";
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
        className="h-4 w-4 fill-clrInput stroke-clrInput dark:fill-clrDarkInput dark:stroke-clrDarkInput"
        aria-label="magnifying glass"
      />
      <input
        type="text"
        placeholder="Search for a country..."
        className="flex-1 bg-clrElements p-1 text-clrText dark:bg-clrDarkElements dark:text-clrDarkText"
        onKeyDown={keyDownHandler}
      />
    </Card>
  );
};

export default SearchInput;
