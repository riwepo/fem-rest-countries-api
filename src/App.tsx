import { useState, useEffect } from "react";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
import DetailPage from "./components/DetailPage";

import {
  ICountrySummary,
  ICountryDetail,
  IGetCountriesResult,
  IRegion,
  IName,
  ICca3CodeName,
} from "./helpers/interfaces";

interface IAppProps {
  getAllCountriesSummary: () => Promise<IGetCountriesResult>;
  getCountryDetail: (
    nameCodes: ICca3CodeName[],
    cca3Code: string,
  ) => Promise<IGetCountriesResult>;
  getUniqueRegions: (regions: IRegion[]) => string[];
  filterByRegion: (regions: IRegion[], region: string) => IRegion[];
  filterBySearchTerm: (countries: IName[], searchTerm: string) => IName[];
}

const App: React.FC<IAppProps> = (props) => {
  const [useDarkMode, setUseDarkMode] = useState(false);
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
  const [selectedCountryCca3Code, setSelectedCountryCca3Code] =
    useState<string>("");
  const [selectedCountryDetail, setSelectedCountryDetail] =
    useState<ICountryDetail | null>(null);
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

  useEffect(() => {
    if (selectedCountryCca3Code === "") {
      setSelectedCountryDetail(null);
      return;
    }
    const fetchData = async () => {
      setProgressMessage("Fetching data...");
      const result = await props.getCountryDetail(
        allCountriesSummary,
        selectedCountryCca3Code,
      );
      if (result.isOk) {
        const _countryDetail = result.value as ICountryDetail;
        setSelectedCountryDetail(_countryDetail);
        setProgressMessage("");
      } else {
        setProgressMessage(result.error as string);
      }
    };
    fetchData();
  }, [selectedCountryCca3Code]);

  const filterSelectionChangedHandler = (region: string) => {
    setSelectedRegion(region);
    updateFilteredCountries(region, searchTerm);
  };
  const searchChangedHandler = (search: string) => {
    setSearchTerm(search);
    updateFilteredCountries(selectedRegion, search);
  };
  const countryChangeHandler = (cca3Code: string) => {
    setSelectedCountryCca3Code(cca3Code);
  };

  const onDarkModeChangeHandler = () => {
    setUseDarkMode((current) => !current);
  };
  return (
    <div className={useDarkMode ? "dark" : undefined}>
      <div className="bg-clrBg font-nunito text-base font-normal dark:bg-clrDarkBg">
        <Header
          progressMessage={progressMessage}
          useDarkMode={useDarkMode}
          onDarkModeChange={onDarkModeChangeHandler}
        />
        {selectedCountryDetail === null && (
          <HomePage
            countries={filteredCountriesSummary}
            regions={regions}
            getAllCountriesSummary={props.getAllCountriesSummary}
            getUniqueRegions={props.getUniqueRegions}
            filterByRegion={props.filterByRegion}
            filterBySearchTerm={props.filterBySearchTerm}
            searchChangedHandler={searchChangedHandler}
            filterSelectionChangedHandler={filterSelectionChangedHandler}
            countryClickHandler={countryChangeHandler}
          />
        )}
        {selectedCountryDetail !== null && (
          <DetailPage
            country={selectedCountryDetail}
            onCountryChange={countryChangeHandler}
          />
        )}
      </div>
    </div>
  );
};

export default App;
