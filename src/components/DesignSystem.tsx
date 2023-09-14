// import React from ".react";
import CountrySummary from "./CountrySummary";
import CountrySummaryList from "./CountrySummaryList";
import Header from "./Header";
import SearchInput from "./SearchInput";
import FilterCombo from "./FilterCombo";

import { ICountrySummary } from "../helpers/interfaces";

const DesignSystem: React.FC = () => {
  const australia: ICountrySummary = {
    name: "Australia",
    population: 666,
    region: "Oceania",
    capital: "Canberra",
    flag: new URL("https://flagcdn.com/au.svg"),
  };
  const countries: ICountrySummary[] = [
    australia,
    australia,
    australia,
    australia,
    australia,
  ];
  const filtercomboOptions = ["option1", "option2", "option3", "option4"];
  const filterComboSelectionChangeHandler = (selection: string) => {
    console.log(selection);
  };
  const searchChangeHandler = (search: string) => {
    console.log(search);
  };
  return (
    <div>
      <CountrySummary country={australia} />
      <CountrySummaryList countries={countries} />
      <Header progressMessage="hello there" />
      <SearchInput onSearchChanged={searchChangeHandler} />
      <FilterCombo
        options={filtercomboOptions}
        onSelectionChanged={filterComboSelectionChangeHandler}
      />
    </div>
  );
};

export default DesignSystem;
