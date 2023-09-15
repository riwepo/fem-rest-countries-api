import { ICountryDetail } from "../helpers/interfaces";

interface IDetailPageProps {
  country: ICountryDetail;
  onCountryChange: (countryName: string) => void;
}

const DetailPage: React.FC<IDetailPageProps> = (props) => {
  const backClickHandler = () => {
    props.onCountryChange("");
  };
  return (
    <div className="flex flex-col justify-between p-10 align-middle">
      <button
        className="m-2 self-start rounded bg-white p-2"
        onClick={backClickHandler}
      >
        Back
      </button>
      <div className="flex flex-row ">
        <img
          src={props.country.flag.toString()}
          alt="flag"
          className="h-[12rem] w-full object-cover"
        />
        <div className="grid grid-cols-2 grid-rows-3">
          <h1 className="col-span-3 col-start-1 row-start-1">
            {props.country.name}
          </h1>
          <div className="row-start-2 flex flex-col">
            <p>Native Name: {props.country.name}</p>
            <p>Population: {props.country.population}</p>
            <p>Region: {props.country.region}</p>
            <p>Sub region: {props.country.subRegion}</p>
            <p>Capital: {props.country.capital}</p>
          </div>
          <div className="row-start-2 flex flex-col">
            <p>Top Level domain: {props.country.topLevelDomain}</p>
            <p>Currencies: {props.country.currencies}</p>
            <p>Languages: {props.country.languages}</p>
          </div>
          <div className="col-span-3 col-start-1 row-start-3 flex flex-row">
            <p>Border</p>
            <div className="row-start-3 flex flex-row">
              <button>B1</button>
              <button>B1</button>
              <button>B1</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
