import { TCartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.price + sum;
  }, 0);
};
