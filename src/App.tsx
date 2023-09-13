import { useState, useEffect } from "react";

// import DesignSystem from "./components/DesignSystem";
import CountrySummaryList from "./components/CountrySummaryList";
import FilterCombo from "./components/FilterCombo";
import Header from "./components/Header";
import SearchInput from "./components/SearchInput";

import { ICountrySummary } from "./country_api/get-countries-helpers";
import { getAllCountriesSummary } from "./country_api/get-countries";

const filtercomboOptions = ["option1", "option2", "option3", "option4"];

const App: React.FC = () => {
  // return <DesignSystem />;
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
  const filterSelectionChangedHandler = (selectedRegion: string) => {
    console.log(selectedRegion);
  };
  return (
    <div>
      <Header />
      <div className="flex justify-between p-2">
        <SearchInput />
        <FilterCombo
          options={filtercomboOptions}
          onSelectionChanged={filterSelectionChangedHandler}
        />
      </div>
      <CountrySummaryList countries={allCountriesSummary} />
    </div>
  );
};

export default App;
