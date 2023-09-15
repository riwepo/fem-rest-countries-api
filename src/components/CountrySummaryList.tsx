import CountrySummary from "./CountrySummary";

import { ICountrySummary } from "../helpers/interfaces";

interface ICountrySummaryListProps {
  countries: ICountrySummary[];
  onCountryClicked: (a: string) => void;
}

const CountrySummaryList: React.FC<ICountrySummaryListProps> = (props) => {
  const clickHandler = (name: string) => {
    props.onCountryClicked(name);
  };
  return (
    <div className="grid grid-cols-4">
      {props.countries.map((country) => {
        return (
          <CountrySummary
            key={country.name}
            country={country}
            onClick={clickHandler}
          />
        );
      })}
    </div>
  );
};

export default CountrySummaryList;
