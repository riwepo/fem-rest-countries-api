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
    <div className="sml:grid-cols-[1fr_1fr_1fr_1fr] grid grid-cols-[1fr] justify-center justify-items-stretch gap-2 gap-y-12 p-2 md:gap-4 md:p-4 xl:gap-20 xl:p-10">
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
