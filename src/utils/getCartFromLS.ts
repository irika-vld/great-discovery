import { calcTotalPrice } from "./calcTotalPrice";
import { TCartItem } from "../redux/slices/cartSlice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as TCartItem[],
    totalPrice,
  };
};
