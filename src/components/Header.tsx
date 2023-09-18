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
    <header className="flex items-center justify-between bg-white p-2 text-black shadow shadow-black dark:bg-black dark:text-white">
      <h1 className="text-lg font-bold">Where in the world?</h1>
      <p>{props.progressMessage}</p>
      <button
        className="flex items-center gap-1"
        onClick={darkModeClickHandler}
      >
        <MoonSvg className="h-4 w-4 fill-black dark:fill-white" />
        <p className="text-normal font-semibold">
          {props.useDarkMode ? "Light mode" : "Dark mode"}
        </p>
      </button>
    </header>
  );
};
export default Header;
