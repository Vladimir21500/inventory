import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IItem, IPosition } from "../../types/items";

interface IContainersState {
  playerItems: IItem[];
  bagItems: IItem[];
}

const items = new Array(5).fill(null).map((item, index) => ({
  id: `${index}`,
  data: null,
  size: { x: 1, y: 1 },
  position: { i: index, j: -1 },
}));

const initialState: IContainersState = {
  playerItems: items,
  bagItems: items,
};

export const containersSlice = createSlice({
  name: "containers",
  initialState,
  reducers: {
    addItemToBag: (state, action: PayloadAction<{ item: IItem; targetPosition: IPosition }>) => {
      const { item, targetPosition } = action.payload;

      state.bagItems[targetPosition.i] = { ...item, position: { i: targetPosition.i, j: -1 } };
    },
    addItemToPlayer: (state, action: PayloadAction<{ item: IItem; targetPosition: IPosition }>) => {
      const { item, targetPosition } = action.payload;

      state.playerItems[targetPosition.i] = { ...item, position: { i: targetPosition.i, j: -1 } };
    },
    deleteItemFromBag: (state, action: PayloadAction<IPosition>) => {
      const index = action.payload.i;
      state.bagItems[index] = {
        id: `${index}`,
        data: null,
        size: { x: 1, y: 1 },
        position: { i: index, j: -1 },
      };
    },
    deleteItemFromPlayer: (state, action: PayloadAction<IPosition>) => {
      const index = action.payload.i;
      state.playerItems[index] = {
        id: `${index}`,
        data: null,
        size: { x: 1, y: 1 },
        position: { i: index, j: -1 },
      };
    },
  },
});

export const { addItemToBag, addItemToPlayer, deleteItemFromBag, deleteItemFromPlayer } =
  containersSlice.actions;

export default containersSlice.reducer;
