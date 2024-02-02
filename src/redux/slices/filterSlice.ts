import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Sort = {
  name: string;
  sortProperty: "rating" | "title" | "price";
};

interface FilterSliceState {
  categoryId: number;
  sort: Sort;
  activeCategory: string;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: "popularity",
    sortProperty: "rating",
  },
  activeCategory: "All",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setActiveCategory(state, action: PayloadAction<string>) {
      state.activeCategory = action.payload;
    },
  },
});

export const { setCategoryId, setActiveCategory } = filterSlice.actions;

export default filterSlice.reducer;
