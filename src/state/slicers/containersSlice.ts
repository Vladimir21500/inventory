import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../types/items";

interface IContainersState {
  playerItems: IItem[];
  bagItems: IItem[];
}

const items = new Array(5).fill(null).map((item, index) => ({
  id: `${index}`,
  data: null,
}));

const initialState: IContainersState = {
  playerItems: items,
  bagItems: items,
};

export const containersSlice = createSlice({
  name: "containers",
  initialState,
  reducers: {
    addItemToBag: (state, action: PayloadAction<{ item: IItem; targetId: string }>) => {
      //! not use item.id
      const { item, targetId } = action.payload;
      if (state.bagItems.every((item) => item.data !== null)) {
        alert("player is full");
        return;
      }
      if (state.bagItems[+targetId].data) {
        alert("cell is not empty");
        return;
      }
      state.bagItems[+targetId].data = item.data;
    },
    addItemToPlayer: (state, action: PayloadAction<{ item: IItem; targetId: string }>) => {
      //! not use item.id
      const { item, targetId } = action.payload;
      if (state.playerItems.every((item) => item.data !== null)) {
        alert("player is full");
        return;
      }
      if (state.playerItems[+targetId].data) {
        alert("cell is not empty");
        return;
        //TODO fix problem with deleting after ^ this message
      } else {
        state.playerItems[+targetId].data = item.data;
      }
    },
    deleteItemFromBag: (state, action: PayloadAction<string>) => {
      state.bagItems[+action.payload].data = null;
    },
    deleteItemFromPlayer: (state, action: PayloadAction<string>) => {
      state.playerItems[+action.payload].data = null;
    },
  },
});

export const { addItemToBag, addItemToPlayer, deleteItemFromBag, deleteItemFromPlayer } =
  containersSlice.actions;

export default containersSlice.reducer;
