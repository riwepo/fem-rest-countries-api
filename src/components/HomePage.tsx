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
  getAllCountriesSummary: () => Promise<IGetCountriesResult>;
  getUniqueRegions: (regions: IRegion[]) => string[];
  filterByRegion: (countries: IRegion[], region: string) => IRegion[];
  filterBySearchTerm: (countries: IName[], searchTerm: string) => IName[];
  searchChangedHandler: (search: string) => void;
  filterSelectionChangedHandler: (search: string) => void;
  regions: string[];
  countries: ICountrySummary[];
}

const HomePage: React.FC<IHomePageProps> = (props) => {
  return (
    <>
      <div className="flex justify-between p-2">
        <SearchInput onSearchChanged={props.searchChangedHandler} />
        <FilterCombo
          options={props.regions}
          onSelectionChanged={props.filterSelectionChangedHandler}
        />
      </div>
      <CountrySummaryList countries={props.countries} />
    </>
  );
};

export default HomePage;
