import { useState, useEffect } from "react";

// import DesignSystem from "./components/DesignSystem";
import CountrySummaryList from "./components/CountrySummaryList";
import FilterCombo from "./components/FilterCombo";
import Header from "./components/Header";
import SearchInput from "./components/SearchInput";

import {
  ICountrySummary,
  IGetCountriesResult,
  IRegion,
} from "./country_api/get-countries-helpers";

interface IAppProps {
  getAllCountriesSummary: () => Promise<IGetCountriesResult>;
  filterByRegion: (countries: IRegion[], region: string) => IRegion[];
  getUniqueRegions: (regions: IRegion[]) => string[];
}

const App: React.FC<IAppProps> = (props) => {
  // return <DesignSystem />;
  const [allCountriesSummary, setAllCountriesSummary] = useState<
    ICountrySummary[]
  >([]);
  const [filteredCountriesSummary, setFilteredCountriesSummary] = useState<
    ICountrySummary[]
  >([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [progressMessage, setProgressMessage] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      setProgressMessage("Fetching data...");
      const result = await props.getAllCountriesSummary();
      if (result.isOk) {
        const _allCountriesSummary = result.value as ICountrySummary[];
        setAllCountriesSummary(_allCountriesSummary);
        setFilteredCountriesSummary(_allCountriesSummary);
        const _regions = props.getUniqueRegions(_allCountriesSummary);
        setRegions(_regions);
        setProgressMessage("");
      } else {
        setProgressMessage(result.error as string);
      }
    };
    fetchData();
  }, []);
  const filterSelectionChangedHandler = (selectedRegion: string) => {
    let _filteredCountriesSummary: ICountrySummary[];
    if (selectedRegion === "") {
      _filteredCountriesSummary = allCountriesSummary;
    } else {
      _filteredCountriesSummary = props.filterByRegion(
        allCountriesSummary,
        selectedRegion,
      ) as ICountrySummary[];
    }
    setFilteredCountriesSummary(_filteredCountriesSummary);
  };
  return (
    <div>
      <Header progressMessage={progressMessage} />
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
