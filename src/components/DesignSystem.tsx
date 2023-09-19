// import React from ".react";
import CountrySummary from "./CountrySummary";
import CountrySummaryList from "./CountrySummaryList";
import Header from "./Header";
import SearchInput from "./SearchInput";
import FilterCombo from "./FilterCombo";

import { ICountrySummary, DisplayMode } from "../helpers/interfaces";
import DetailPage from "./DetailPage";
import { germanyDetail2 } from "../tests/countryObjects";

const DesignSystem: React.FC = () => {
  const australiaSummary: ICountrySummary = {
    cca3Code: "AUS",
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
    () => {
      search;
    }; // noop
  };
  const countryChangeHandler = (countryName: string) => {
    () => {
      countryName;
    }; // noop
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
      <Header
        progressMessage="hello there"
        selectedDisplayMode={DisplayMode.Light}
        onDisplayModeToggle={() => {}}
      />
      <SearchInput onSearchChanged={searchChangeHandler} className="" />
      <FilterCombo
        options={filtercomboOptions}
        onSelectionChanged={filterComboSelectionChangeHandler}
        className=""
      />
      <DetailPage
        country={germanyDetail2}
        onCountryChange={countryChangeHandler}
      />
    </div>
  );
};

export default DesignSystem;
