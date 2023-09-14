import Card from "./Card";

import icons8MagnifyingGlass from "../assets/icons8-magnifying-glass-50.png";

interface SearchInputProps {
  onSearchChanged: (a: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const keyDownHandler = (event: React.KeyboardEvent) => {
    if (event.code === "Enter") {
      const enteredValue = (event.target as HTMLInputElement).value;
      props.onSearchChanged(enteredValue);
    }
  };
  return (
    <Card className="flex w-[50rem] items-center justify-around gap-2 p-2">
      <img src={icons8MagnifyingGlass} alt="magnifying glass" className="w-8" />
      <input
        type="text"
        placeholder="Search for a country..."
        className="flex-1 p-1"
        onKeyDown={keyDownHandler}
      />
    </Card>
  );
};

export default SearchInput;
