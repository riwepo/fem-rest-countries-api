import { ReactComponent as MoonSvg } from "../assets/moon-svgrepo-com.svg";

export interface IHeaderProps {
  progressMessage: string;
  useDarkMode: boolean;
  onDarkModeChange: () => void;
}

const Header: React.FC<IHeaderProps> = (props) => {
  const darkModeClickHandler = () => {
    props.onDarkModeChange();
  };
  return (
    <header className="shadow-black flex items-center justify-between bg-clrElements p-2 text-clrText shadow dark:bg-clrDarkElements dark:text-clrDarkText">
      <h1 className="text-lg font-bold">Where in the world?</h1>
      <p>{props.progressMessage}</p>
      <button
        className="flex items-center gap-1"
        onClick={darkModeClickHandler}
      >
        <MoonSvg
          className="h-4 w-4 fill-clrText dark:fill-clrDarkText"
          title="moon"
        />
        <p className="text-normal font-semibold">
          {props.useDarkMode ? "Light mode" : "Dark mode"}
        </p>
      </button>
    </header>
  );
};
export default Header;
