import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type TCartItem = {
  id: number;
  image: string;
  title: string;
  price: number;
  transport: string;
  days: number;
  count: number;
  place: number;
};

interface CartSliceState {
  totalPrice: number;
  items: TCartItem[];
}

const { totalPrice, items } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {

      state.items.push({
        ...action.payload,
        count: 1,
      });

      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem(state, action: PayloadAction<number>) {
      const findItemRemove = state.items.find(
        (obj) => obj.id === action.payload
      );
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice -= findItemRemove!.price;
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
