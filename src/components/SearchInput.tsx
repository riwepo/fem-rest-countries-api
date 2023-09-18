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
    <Card className="bg-clrElements text-clrText dark:bg-clrDarkElements dark:text-clrDarkText flex w-[50rem] items-center justify-around gap-2 p-2">
      <MagnifyingGlass className="fill-clrInput stroke-clrInput dark:fill-clrDarkInput dark:stroke-clrDarkInput" />
      <input
        type="text"
        placeholder="Search for a country..."
        className="bg-clrElements dark:bg-clrDarkElements text-clrInput dark:text-clrDarkInput flex-1 p-1"
        onKeyDown={keyDownHandler}
      />
    </Card>
  );
};

export default SearchInput;
