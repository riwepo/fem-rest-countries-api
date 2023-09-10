// import React from ".react";
import CountrySummary from "./CountrySummary";

function DesignSystem() {
  return (
    <div>
      <CountrySummary
        name="Australia"
        population={25000000}
        region="Oceania"
        capital="Canberra"
        flagUrl="https://flagcdn.com/au.svg"
      />
    </div>
  );
}

export default DesignSystem;
