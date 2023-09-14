import CountrySummary from "./CountrySummary";

import { ICountrySummary } from "../helpers/interfaces";

interface ICountrySummaryListProps {
  countries: ICountrySummary[];
}

const CountrySummaryList: React.FC<ICountrySummaryListProps> = (props) => {
  return (
    <div className="grid grid-cols-4">
      {props.countries.map((country) => {
        return <CountrySummary key={country.name} country={country} />;
      })}
    </div>
  );
};

export default CountrySummaryList;
