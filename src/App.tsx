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
} from "./helpers/get-countries-helpers";

interface IAppProps {
  getAllCountriesSummary: () => Promise<IGetCountriesResult>;
  getUniqueRegions: (regions: IRegion[]) => string[];
  filterByRegion: (countries: IRegion[], region: string) => IRegion[];
  filterBySearchTerm: (
    countries: ICountrySummary[],
    searchTerm: string,
  ) => ICountrySummary[];
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
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const updateFilteredCountries = (region: string, searchTerm: string) => {
    let filtered = allCountriesSummary;
    if (region !== "") {
      filtered = props.filterByRegion(
        allCountriesSummary,
        region,
      ) as ICountrySummary[];
    }
    if (searchTerm !== "") {
      filtered = props.filterByRegion(filtered, searchTerm);
    }
    setFilteredCountriesSummary(filtered);
  };

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

  const filterSelectionChangedHandler = (region: string) => {
    setSelectedRegion(region);
    updateFilteredCountries(region, searchTerm);
  };
  const searchChangedHandler = (search: string) => {
    setSearchTerm(search);
    updateFilteredCountries(selectedRegion, search);
  };
  return (
    <div>
      <Header progressMessage={progressMessage} />
      <div className="flex justify-between p-2">
        <SearchInput onSearchChanged={searchChangedHandler} />
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
