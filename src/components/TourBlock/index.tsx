import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TCartItem, addItem } from "../../redux/slices/cartSlice";

type TourBlockProps = {
  id: number;
  image: string;
  title: string;
  days: number[];
  transport: string[];
  valueByAllTypes: any;
};

const TourBlock: React.FC<TourBlockProps> = ({
  id,
  image,
  title,
  days,
  transport,
  valueByAllTypes = [],
}) => {
  const dispatch = useDispatch();

  const [activeTransport, setActiveTransport] = React.useState(
    transport[0]
  );
  const [activeDays, setActiveDays] = React.useState(days[0]);
  const [activeCost, setActiveCost] = React.useState(0);
  const [inCart, setInCart] = React.useState(false);

  React.useEffect(() => {
    setActiveCost(
      valueByAllTypes.find(
        (el: any) => el.type === activeTransport && el.days === activeDays
      ).price
    );
  }, [activeDays, activeTransport, valueByAllTypes]);

  const clickAdd = () => {
    const getRandom: (min: number, max: number) => number = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const item: TCartItem = {
      id: Date.now(),
      image,
      title,
      price: activeCost,
      transport: activeTransport,
      days: activeDays,
      count: 0,
      place: getRandom(1, 30),
    };
    dispatch(addItem(item));
    setInCart(true);
    setTimeout(() => setInCart(false), 1000);
  };

  return (
    <div className="tour-block">
      <Link to={`/info/${id}`}>
        <div>
          <img className="tour-block__image" src={image} alt="Tour" />
          <h4 className="tour-block__title">{title}</h4>
        </div>
      </Link>
      <div className="tour-block__selector">
        <ul>
          {transport.map((transport) => (
            <li
              key={transport}
              onClick={() => {
                setActiveTransport(transport);
              }}
              className={activeTransport === transport ? "active" : "null"}
            >
              {transport}
            </li>
          ))}
        </ul>
        <ul>
          {days.map((amount) => (
            <li
              key={amount}
              onClick={() => {
                setActiveDays(amount);
              }}
              className={activeDays === amount ? "active" : "null"}
            >
              {amount} days
            </li>
          ))}
        </ul>
      </div>
      <p className="tour-block__info">
        for 1 person (there are no children's tickets available)
      </p>
      <div className="tour-block__bottom">
        <div className="tour-block__price">{activeCost} RUB</div>
        <button
          onClick={clickAdd}
          className={
            inCart
              ? "button button--outline button--addGreen"
              : "button button--outline button--add"
          }
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>{inCart ? "In cart" : "Add"}</span>
        </button>
      </div>
    </div>
  );
};

export default TourBlock;
