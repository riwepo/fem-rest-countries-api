import { useState, useEffect } from "react";

// import DesignSystem from "./components/DesignSystem";
import CountrySummaryList from "./components/CountrySummaryList";
import FilterCombo from "./components/FilterCombo";
import Header from "./components/Header";
import SearchInput from "./components/SearchInput";

import { ICountrySummary } from "./country_api/get-countries-helpers";
import {
  filterByRegion,
  getAllCountriesSummary,
  getUniqueRegions,
} from "./country_api/get-countries";

const App: React.FC = () => {
  // return <DesignSystem />;
  const [allCountriesSummary, setAllCountriesSummary] = useState<
    ICountrySummary[]
  >([]);
  const [filteredCountriesSummary, setFilteredCountriesSummary] = useState<
    ICountrySummary[]
  >([]);
  const [regions, setRegions] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCountriesSummary();
      if (result.isOk) {
        const _allCountriesSummary = result.value as ICountrySummary[];
        setAllCountriesSummary(_allCountriesSummary);
        setFilteredCountriesSummary(_allCountriesSummary);
        const _regions = getUniqueRegions(_allCountriesSummary);
        setRegions(_regions);
      }
    };
    fetchData();
  }, []);
  const filterSelectionChangedHandler = (selectedRegion: string) => {
    let _filteredCountriesSummary: ICountrySummary[];
    if (selectedRegion === "") {
      _filteredCountriesSummary = allCountriesSummary;
    } else {
      _filteredCountriesSummary = filterByRegion(
        allCountriesSummary,
        selectedRegion,
      ) as ICountrySummary[];
    }
    setFilteredCountriesSummary(_filteredCountriesSummary);
  };
  return (
    <div>
      <Header />
      <div className="flex justify-between p-2">
        <SearchInput />
        <FilterCombo
          options={regions}
          onSelectionChanged={filterSelectionChangedHandler}
        />
      </div>
      <CountrySummaryList countries={filteredCountriesSummary} />
    </div>
  );
};

export default App;
