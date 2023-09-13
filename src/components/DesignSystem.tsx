// import React from ".react";
// import CountrySummary from "./CountrySummary";
// import CountrySummaryList from "./CountrySummaryList";
// import ICountrySummary from "./ICountrySummary";
// import Header from "./Header";
// import SearchInput from "./SearchInput";
import FilterCombo from "./FilterCombo";

const DesignSystem: React.FC = () => {
  // const australia: ICountrySummary = {
  //   name: "Australia",
  //   population: 666,
  //   region: "Oceania",
  //   capital: "Canberra",
  //   flagUrl: "https://flagcdn.com/au.svg",
  // };
  // const countries: ICountrySummary[] = [
  //   australia,
  //   australia,
  //   australia,
  //   australia,
  //   australia,
  // ];
  const filtercomboOptions = ["option1", "option2", "option3", "option4"];
  const filterComboSelectionChangeHandler = (selection: string) => {
    console.log(selection);
  };
  return (
    <div>
      {/* <CountrySummary country={australia} /> */}
      {/* <CountrySummaryList/> */}
      {/* <Header /> */}
      {/* <SearchInput /> */}
      <FilterCombo
        options={filtercomboOptions}
        onSelectionChanged={filterComboSelectionChangeHandler}
      />
    </div>
  );
};

export default DesignSystem;
