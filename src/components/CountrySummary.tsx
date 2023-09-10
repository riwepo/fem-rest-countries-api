import Card from "./Card";

function CountrySummary(props: {
  name: string;
  population: number;
  region: string;
  capital: string;
  flagUrl: string;
}) {
  return (
    <Card className="m-10 grid h-[24rem] w-[20rem] grid-rows-[1fr_1fr]">
      <img
        src={props.flagUrl}
        alt="flag"
        className="h-[12rem] w-full object-cover"
      />
      <div className="flex flex-col justify-center gap-3 p-2 ">
        <p className="text-lg font-bold ">{props.name}</p>
        <div>
          <p className="text-sm font-normal">
            <span className="font-bold">Population:</span> {props.population}
          </p>
          <p className="text-sm font-normal">
            <span className="font-bold">Region:</span> {props.region}
          </p>
          <p className="text-sm font-normal">
            <span className="font-bold">Capital:</span> {props.capital}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default CountrySummary;
