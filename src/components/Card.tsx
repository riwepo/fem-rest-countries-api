import { PropsWithChildren } from "react";

type CardProps = {
  className: string;
};

function Card(props: PropsWithChildren<CardProps>) {
  return (
    <div className={`rounded bg-white shadow shadow-black ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Card;
