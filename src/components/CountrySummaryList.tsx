import CountrySummary from "./CountrySummary";
import ICountrySummary from "./ICountrySummary";

interface CountrySummaryListProps {
  countries: ICountrySummary[];
}

const CountrySummaryList: React.FC<CountrySummaryListProps> = (props) => {
  return (
    <div className="grid grid-cols-4">
      {props.countries.map((country) => {
        return <CountrySummary key={country.name} country={country} />;
      })}
    </div>
  );
};

export default CountrySummaryList;
