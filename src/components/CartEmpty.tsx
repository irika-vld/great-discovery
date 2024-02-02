import React from "react";
import { Link } from "react-router-dom";

export const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          The cart is empty
        </h2>
        <p style={{marginBottom: '40px', marginTop: '40px'}}>
          Probably you haven`t chosen a tour yet.
          <br />
          To choose a tour go to the main page.
        </p>
        <Link to="/" className="button button--black">
          <span>Choose tour</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
