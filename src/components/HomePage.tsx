import {
  ICountrySummary,
  IGetCountriesResult,
  IRegion,
  IName,
} from "../helpers/interfaces";

import SearchInput from "./SearchInput";
import FilterCombo from "./FilterCombo";
import CountrySummaryList from "./CountrySummaryList";

interface IHomePageProps {
  regions: string[];
  countries: ICountrySummary[];
  getAllCountriesSummary: () => Promise<IGetCountriesResult>;
  getUniqueRegions: (regions: IRegion[]) => string[];
  filterByRegion: (countries: IRegion[], region: string) => IRegion[];
  filterBySearchTerm: (countries: IName[], searchTerm: string) => IName[];
  searchChangedHandler: (search: string) => void;
  filterSelectionChangedHandler: (search: string) => void;
  countryClickHandler: (cca3Code: string) => void;
}

const HomePage: React.FC<IHomePageProps> = (props) => {
  return (
    <main>
      <div className="flex flex-col justify-center gap-2 p-2 sm:flex-row sm:justify-between">
        <SearchInput
          onSearchChanged={props.searchChangedHandler}
          className="max-w-[40rem] grow"
        />
        <FilterCombo
          className="shrink-0 self-start"
          options={props.regions}
          onSelectionChanged={props.filterSelectionChangedHandler}
        />
      </div>
      <CountrySummaryList
        countries={props.countries}
        onCountryClicked={props.countryClickHandler}
      />
    </main>
  );
};

export default HomePage;
