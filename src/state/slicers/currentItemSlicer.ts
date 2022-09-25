import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IItem, ItemType } from "../../types/items";

interface ICurrentItem {
  item: IItem;
  type: ItemType;
}

interface IInitialState {
  item: IItem;
  type: ItemType;
}

const initialState: IInitialState = {
  item: { id: "null", data: null, position: { i: -1, j: -1 }, size: { x: 0, y: 0 } },
  type: "inventory",
};

export const currentItemSlice = createSlice({
  name: "currentItem",
  initialState,
  reducers: {
    setCurrentItem: (state, action: PayloadAction<ICurrentItem>) => {
      state.item = action.payload.item;
      state.type = action.payload.type;
    },
    resetCurrentItem: (state) => {
      state.item = { id: "null", data: null, position: { i: -1, j: -1 }, size: { x: 0, y: 0 } };
      state.type = "inventory";
    },
  },
});

export const { setCurrentItem, resetCurrentItem } = currentItemSlice.actions;

export default currentItemSlice.reducer;
