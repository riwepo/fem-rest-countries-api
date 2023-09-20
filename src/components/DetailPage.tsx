import { ICountryDetail2 } from "../helpers/interfaces";
import { ReactComponent as ArrorLeft } from "../assets/arrow-left-svgrepo-com.svg";

interface IDetailPageProps {
  country: ICountryDetail2;
  onCountryChange: (countryName: string) => void;
}

const DetailPage: React.FC<IDetailPageProps> = (props) => {
  const backClickHandler = () => {
    props.onCountryChange("");
  };
  const borderClickHandler = (event: React.MouseEvent) => {
    const button = (event.target as HTMLElement).closest("button");
    const cca3Code = (button as HTMLButtonElement).dataset["cca3Code"];
    props.onCountryChange(cca3Code as string);
  };
  const currencies = props.country.currencies.join(",");
  const languages = props.country.languages.join(",");

  return (
    <div className="flex flex-col justify-between gap-8 p-4 align-middle text-clrText dark:text-clrDarkText">
      <button
        className="shadow-black m-2 self-start rounded bg-clrElements px-4 py-2 shadow-md dark:bg-clrDarkElements"
        onClick={backClickHandler}
      >
        <div className="flex flex-row items-center gap-2">
          <ArrorLeft
            className="h-4 w-4 stroke-clrText dark:stroke-clrDarkText"
            role="img"
            aria-label="arrow left"
          />
          Back
        </div>
      </button>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-20">
        <img
          src={props.country.flag.toString()}
          alt="flag"
          className=" w-full object-cover"
        />
        <div className="grid grid-cols-1  grid-rows-[auto_1fr_1fr_auto_auto] p-2 sm:grid-cols-2 sm:grid-rows-[auto_1fr_auto] sm:p-10">
          <h1 className="font-semi-bold col-span-2 col-start-1 row-start-1 pb-4 text-2xl">
            {props.country.name}
          </h1>
          <div className="col-start-1 row-start-2 flex flex-col pb-4">
            <p>
              <span className="font-semibold">Native Name:</span>{" "}
              {props.country.nativeName}
            </p>
            <p>
              <span className="font-semibold">Population:</span>{" "}
              {props.country.population}
            </p>
            <p>
              <span className="font-semibold">Region:</span>{" "}
              {props.country.region}
            </p>
            <p>
              <span className="font-semibold">Sub Region:</span>{" "}
              {props.country.subRegion}
            </p>
            <p>
              <span className="font-semibold">Capital:</span>{" "}
              {props.country.capital}
            </p>
          </div>
          <div className="row-start-3 flex flex-col sm:col-start-2 sm:row-start-2">
            <p>
              <span className="font-semibold">Top Level Domain:</span>{" "}
              {props.country.topLevelDomain}
            </p>
            <p>
              <span className="font-semibold">Currencies:</span> {currencies}
            </p>
            <p>
              <span className="font-semibold">Languages:</span> {languages}
            </p>
          </div>
          <div className="col-start-1 row-start-4 flex flex-col items-center gap-2 sm:col-span-2 sm:row-start-3 sm:flex-row">
            <p className="self-start sm:col-start-1 sm:row-start-3 sm:self-center">
              Border Countries:
            </p>
            <div className="row-start-3 flex flex-row flex-wrap">
              {props.country.borderCountriesCodeNames.map((codeName) => {
                return (
                  <button
                    key={codeName.cca3Code}
                    className="shadow-black m-2 rounded bg-clrElements px-4 py-2 shadow-md dark:bg-clrDarkElements"
                    data-cca3-code={codeName.cca3Code}
                    onClick={borderClickHandler}
                  >
                    {codeName.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
