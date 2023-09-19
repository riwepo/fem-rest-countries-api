import CountrySummary from "./CountrySummary";

import { ICountrySummary } from "../helpers/interfaces";

interface ICountrySummaryListProps {
  countries: ICountrySummary[];
  onCountryClicked: (countryName: string) => void;
}

const CountrySummaryList: React.FC<ICountrySummaryListProps> = (props) => {
  const clickHandler = (cca3Code: string) => {
    props.onCountryClicked(cca3Code);
  };
  return (
    <div className="grid grid-cols-4 justify-items-center gap-0 gap-y-12 border-2 p-4">
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
