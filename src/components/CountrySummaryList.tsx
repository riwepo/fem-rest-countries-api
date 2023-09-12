import { useEffect, useState } from "react";

import CountrySummary from "./CountrySummary";

import { ICountrySummary } from "../country_api/get-countries-helpers";
import { getAllCountriesSummary } from "../country_api/get-countries";

// interface CountrySummaryListProps {
//   countries: ICountrySummary[];
// }

// const CountrySummaryList: React.FC<CountrySummaryListProps> = (props) => {
const CountrySummaryList: React.FC = () => {
  const [allCountriesSummary, setAllCountriesSummary] = useState<
    ICountrySummary[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCountriesSummary();
      if (result.isOk) {
        setAllCountriesSummary(result.value as ICountrySummary[]);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-4">
      {allCountriesSummary.map((country) => {
        return <CountrySummary key={country.name} country={country} />;
      })}
    </div>
  );
};

export default CountrySummaryList;
