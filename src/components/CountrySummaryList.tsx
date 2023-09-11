import CountrySummary from "./CountrySummary";
import ICountrySummary from "./ICountrySummary";

interface CountrySummaryListProps {
  countries: ICountrySummary[];
}

const CountrySummaryList: React.FC<CountrySummaryListProps> = (props) => {
  return (
    <div className="flex">
      {props.countries.map((country) => {
        return <CountrySummary country={country} />;
      })}
    </div>
  );
};

export default CountrySummaryList;
