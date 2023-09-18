import { PropsWithChildren } from "react";

type CardProps = {
  className: string;
};

function Card(props: PropsWithChildren<CardProps>) {
  return (
    <div
      className={`shadow-black rounded-lg bg-white shadow ${props.className}`}
    >
      {props.children}
    </div>
  );
}

export default Card;
