// import React from ".react";
// import CountrySummary from "./CountrySummary";
import CountrySummaryList from "./CountrySummaryList";
import ICountrySummary from "./ICountrySummary";

const DesignSystem: React.FC = () => {
  const australia: ICountrySummary = {
    name: "Australia",
    population: 666,
    region: "Oceania",
    capital: "Canberra",
    flagUrl: "https://flagcdn.com/au.svg",
  };
  const countries: ICountrySummary[] = [
    australia,
    australia,
    australia,
    australia,
    australia,
  ];
  return (
    <div>
      {/* <CountrySummary country={australia} /> */}
      <CountrySummaryList countries={countries} />
    </div>
  );
};

export default DesignSystem;
