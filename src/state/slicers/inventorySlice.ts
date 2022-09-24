import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../types/items";

type ColumnType = IItem[];

interface IInventoryState {
  items: ColumnType[];
}

const cols = new Array(6).fill(null);
const row = new Array(17).fill(null);
const items = cols.map((col, i) => {
  return row.map((item, j) => ({
    id: `${i}-${j}`,
    data: null,
  }));
});

//* test data for example

// items[0][5].data = "thing";
// items[2][10].data = "thing";
// items[4][5].data = "thing";
// items[5][5].data = "thing";

const initialState: IInventoryState = {
  items,
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ item: IItem; targetId: string }>) => {
      const [i, j] = action.payload.targetId.split("-");
      if (state.items[+i][+j].data) {
        alert("cell is not empty");
      } else {
        state.items[+i][+j].data = action.payload.item.data;
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      const [i, j] = action.payload.split("-");
      state.items[+i][+j].data = null;
    },
  },
});

export const { addItem, deleteItem } = inventorySlice.actions;

export default inventorySlice.reducer;
