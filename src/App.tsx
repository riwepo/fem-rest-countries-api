import CountrySummaryList from "./components/CountrySummaryList";
// import DesignSystem from "./components/DesignSystem";
import FilterCombo from "./components/FilterCombo";
import Header from "./components/Header";
import SearchInput from "./components/SearchInput";

const filtercomboOptions = ["option1", "option2", "option3", "option4"];

const App: React.FC = () => {
  // return <DesignSystem />;
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
      <CountrySummaryList />
    </div>
  );
};

export default App;
