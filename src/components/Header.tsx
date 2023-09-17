import icons8MoonLight from "../assets/icons8-moon-light-48.png";
import icons8MoonDark from "../assets/icons8-moon-dark-48.png";

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
    <header className="flex items-center justify-between bg-white p-2 shadow shadow-black">
      <h1 className="text-lg font-bold">Where in the world?</h1>
      <p>{props.progressMessage}</p>
      <button
        className="flex items-center gap-1"
        onClick={darkModeClickHandler}
      >
        {!props.useDarkMode && (
          <img src={icons8MoonDark} alt="moon" className="w-4" />
        )}
        {props.useDarkMode && (
          <img src={icons8MoonLight} alt="moon" className="w-4" />
        )}
        <p className="text-normal font-semibold">
          {props.useDarkMode ? "Light mode" : "Dark mode"}
        </p>
      </button>
    </header>
  );
};
export default Header;
