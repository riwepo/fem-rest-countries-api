import { ICountryDetail } from "../helpers/interfaces";
import { ReactComponent as ArrorLeft } from "../assets/arrow-left-svgrepo-com.svg";

interface IDetailPageProps {
  country: ICountryDetail;
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
    <div className="text-clrText dark:text-clrDarkText flex flex-col justify-between gap-20 p-10 align-middle">
      <button
        className="bg-clrElements dark:bg-clrDarkElements shadow-black m-2 self-start rounded px-4 py-2 shadow-md"
        onClick={backClickHandler}
      >
        <div className="flex flex-row items-center gap-2">
          <ArrorLeft className="stroke-clrText dark:stroke-clrDarkText h-4 w-4" />
          Back
        </div>
      </button>
      <div className="grid grid-cols-2 gap-20">
        <img
          src={props.country.flag.toString()}
          alt="flag"
          className=" w-full object-cover"
        />
        <div className="grid grid-cols-2 grid-rows-[auto_1fr_auto] p-10">
          <h1 className="font-semi-bold col-span-3 col-start-1 row-start-1 text-2xl">
            {props.country.name}
          </h1>
          <div className="row-start-2 flex flex-col">
            <p>
              <span className="font-semibold">Native Name:</span>{" "}
              {props.country.name}
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
          <div className="row-start-2 flex flex-col">
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
          <div className="col-span-3 col-start-1 row-start-3 flex flex-row items-center gap-2">
            <p className="align-middle">Border Countries:</p>
            <div className="row-start-3 flex flex-row flex-wrap">
              {props.country.borderCountries.map((country) => {
                return (
                  <button
                    key={country}
                    className="bg-clrElements shadow-black dark:bg-clrDarkElements m-2 rounded px-4 py-2 shadow-md"
                    data-cca3-code={country}
                    onClick={borderClickHandler}
                  >
                    {country}
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
