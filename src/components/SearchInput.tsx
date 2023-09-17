import Card from "./Card";

// import icons8MagnifyingGlass from "../assets/icons8-magnifying-glass-50.png";
import { ReactComponent as MagnifyingGlass } from "../assets/icons8-magnifying-glass.svg";
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
    <Card className="flex w-[50rem] items-center justify-around gap-2 bg-white p-2 text-black dark:bg-black dark:text-white">
      <MagnifyingGlass className="fill-black stroke-black dark:fill-white dark:stroke-white" />
      <input
        type="text"
        placeholder="Search for a country..."
        className="flex-1 bg-inherit p-1"
        onKeyDown={keyDownHandler}
      />
    </Card>
  );
};

export default SearchInput;
