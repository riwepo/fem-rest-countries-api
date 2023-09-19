import Card from "./Card";

import { ICountrySummary } from "../helpers/interfaces";

interface CountrySummaryProps {
  country: ICountrySummary;
  onClick: (cca3Code: string) => void;
}

const CountrySummary: React.FC<CountrySummaryProps> = (props) => {
  const clickHandler = () => {
    props.onClick(props.country.cca3Code);
  };
  return (
    <Card className="grid h-[22rem] grid-rows-[1fr_1fr] bg-clrElements text-clrText dark:bg-clrDarkElements dark:text-clrDarkText">
      <button onClick={clickHandler}>
        <img
          src={props.country.flag.toString()}
          alt="flag"
          className="h-[12rem] w-full rounded-t-lg object-fill"
        />
        <div className="flex flex-col justify-center gap-3 p-2 ">
          <p className="text-lg font-bold ">{props.country.name}</p>
          <div>
            <p className="text-sm font-normal">
              <span className="font-bold">Population:</span>{" "}
              {props.country.population}
            </p>
            <p className="text-sm font-normal">
              <span className="font-bold">Region:</span> {props.country.region}
            </p>
            <p className="text-sm font-normal">
              <span className="font-bold">Capital:</span>{" "}
              {props.country.capital}
            </p>
          </div>
        </div>
      </button>
    </Card>
  );
};

export default CountrySummary;
