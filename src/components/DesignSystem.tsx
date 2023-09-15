// import React from ".react";
import CountrySummary from "./CountrySummary";
import CountrySummaryList from "./CountrySummaryList";
import Header from "./Header";
import SearchInput from "./SearchInput";
import FilterCombo from "./FilterCombo";

import { ICountrySummary, ICountryDetail } from "../helpers/interfaces";
import DetailPage from "./DetailPage";

const DesignSystem: React.FC = () => {
  const australiaSummary: ICountrySummary = {
    name: "Australia",
    population: 666,
    region: "Oceania",
    capital: "Canberra",
    flag: new URL("https://flagcdn.com/au.svg"),
  };
  const countrySummaries: ICountrySummary[] = [
    australiaSummary,
    australiaSummary,
    australiaSummary,
    australiaSummary,
    australiaSummary,
  ];
  const filtercomboOptions = ["option1", "option2", "option3", "option4"];
  const filterComboSelectionChangeHandler = (selection: string) => {
    console.log(selection);
  };
  const searchChangeHandler = (search: string) => {
    console.log(search);
  };
  const australiaDetail: ICountryDetail = {
    ...australiaSummary,
    nativeName: "straya",
    subRegion: "Australasia",
    topLevelDomain: "AU",
    currencies: ["AUD"],
    languages: ["english"],
    borderCountries: [],
  };
  const countryChangeHandler = (countryName: string) => {
    console.log(countryName);
  };
  return (
    <div>
      <CountrySummary
        country={australiaSummary}
        onClick={countryChangeHandler}
      />
      <CountrySummaryList
        countries={countrySummaries}
        onCountryClicked={countryChangeHandler}
      />
      <Header progressMessage="hello there" />
      <SearchInput onSearchChanged={searchChangeHandler} />
      <FilterCombo
        options={filtercomboOptions}
        onSelectionChanged={filterComboSelectionChangeHandler}
      />
      <DetailPage
        country={australiaDetail}
        onCountryChange={countryChangeHandler}
      />
    </div>
  );
};

export default DesignSystem;
