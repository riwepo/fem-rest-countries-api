// import icons8MoonLight from "../assets/icons8-moon-light-48.png";
import icons8MoonDark from "../assets/icons8-moon-dark-48.png";

export interface IHeaderProps {
  progressMessage: string;
}

const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <header className="flex items-center justify-between bg-white p-2 shadow shadow-black">
      <h1 className="text-lg font-bold">Where in the world?</h1>
      <p>{props.progressMessage}</p>
      <button className="flex items-center gap-1 ">
        <img src={icons8MoonDark} alt="moon" className="w-4" />
        <p className="text-normal font-semibold">Dark mode</p>
      </button>
    </header>
  );
};
export default Header;
