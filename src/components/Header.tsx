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
    <header className="text-clrText bg-clrElements shadow-black dark:bg-clrDarkElements dark:text-clrDarkText  flex items-center justify-between p-2 shadow">
      <h1 className="text-lg font-bold">Where in the world?</h1>
      <p>{props.progressMessage}</p>
      <button
        className="flex items-center gap-1"
        onClick={darkModeClickHandler}
      >
        <MoonSvg className="fill-clrText dark:fill-clrDarkText h-4 w-4" />
        <p className="text-normal font-semibold">
          {props.useDarkMode ? "Light mode" : "Dark mode"}
        </p>
      </button>
    </header>
  );
};
export default Header;
