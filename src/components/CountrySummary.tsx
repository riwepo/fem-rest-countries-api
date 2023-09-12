import Card from "./Card";

import { ICountrySummary } from "../country_api/get-countries-helpers";

interface CountrySummaryProps {
  country: ICountrySummary;
}

const CountrySummary: React.FC<CountrySummaryProps> = (props) => {
  return (
    <Card className="m-10 grid h-[24rem] w-[20rem] grid-rows-[1fr_1fr]">
      <img
        src={props.country.flag.toString()}
        alt="flag"
        className="h-[12rem] w-full object-cover"
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
            <span className="font-bold">Capital:</span> {props.country.capital}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CountrySummary;
