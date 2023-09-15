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
    <div>
      <h1>detail page</h1>
      <p>{props.country.nativeName}</p>
      <button onClick={backClickHandler}>Back</button>
    </div>
  );
};

export default DetailPage;
