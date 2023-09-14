import { ICountryDetail } from "../helpers/interfaces";

interface IDetailPageProps {
  country: ICountryDetail;
}

const DetailPage: React.FC<IDetailPageProps> = (props) => {
  return (
    <div>
      <h1>detail page</h1>
      <p>{props.country.nativeName}</p>
    </div>
  );
};

export default DetailPage;
