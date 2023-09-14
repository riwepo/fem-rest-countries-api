import { useState, useEffect } from "react";

import Header from "./components/Header";

import {
  ICountrySummary,
  IGetCountriesResult,
  IRegion,
  IName,
} from "./helpers/interfaces";
import HomePage from "./components/HomePage";

interface IAppProps {
  getAllCountriesSummary: () => Promise<IGetCountriesResult>;
  getUniqueRegions: (regions: IRegion[]) => string[];
  filterByRegion: (countries: IRegion[], region: string) => IRegion[];
  filterBySearchTerm: (countries: IName[], searchTerm: string) => IName[];
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
      filtered = props.filterBySearchTerm(
        filtered,
        searchTerm,
      ) as ICountrySummary[];
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
      <HomePage
        countries={filteredCountriesSummary}
        regions={regions}
        getAllCountriesSummary={props.getAllCountriesSummary}
        getUniqueRegions={props.getUniqueRegions}
        filterByRegion={props.filterByRegion}
        filterBySearchTerm={props.filterBySearchTerm}
        searchChangedHandler={searchChangedHandler}
        filterSelectionChangedHandler={filterSelectionChangedHandler}
      />
    </div>
  );
};

export default App;
