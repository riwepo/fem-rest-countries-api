import Card from "./Card";

function CountrySummary(props: {
  name: string;
  population: number;
  region: string;
  capital: string;
  flagUrl: string;
}) {
  return (
    <Card>
      <summary className="flex flex-col  justify-center">
        <div className="flex flex-col justify-center">
          <img src={props.flagUrl} />
          <div className="flex flex-col justify-center ">
            <p className="text-xl font-semibold text-yellow-500">
              {props.name}
            </p>
            <p>Population: {props.population}</p>
            <p>Region: {props.region}</p>
            <p>Capital: {props.capital}</p>
          </div>
        </div>
      </summary>
    </Card>
  );
}

export default CountrySummary;
