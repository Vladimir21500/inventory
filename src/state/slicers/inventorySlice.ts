import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IItem, IPosition } from "../../types/items";

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
    position: { i, j },
    size: { x: 1, y: 1 },
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
    addItem: (state, action: PayloadAction<{ item: IItem; targetPosition: IPosition }>) => {
      const { i, j } = action.payload.targetPosition;
      const item = action.payload.item;
      const { x, y } = item.size;

      if (x + y === 2) {
        state.items[i][j] = item;
      } else {
        for (let iIndex = i; iIndex < i + y; iIndex++) {
          for (let jIndex = j; jIndex < j + x; jIndex++) {
            state.items[iIndex][jIndex] = { ...item, position: { i, j } };
          }
        }
      }
    },
    deleteItem: (state, action: PayloadAction<IPosition>) => {
      const { i, j } = action.payload;
      const { x, y } = state.items[i][j].size;
      if (x + y === 2) {
        state.items[i][j] = {
          id: `${i}-${j}`,
          data: null,
          position: { i, j },
          size: { x: 1, y: 1 },
        };
      } else {
        for (let iIndex = i; iIndex < i + y; iIndex++) {
          for (let jIndex = j; jIndex < j + x; jIndex++) {
            state.items[iIndex][jIndex] = {
              id: `${iIndex}-${jIndex}`,
              data: null,
              position: { i: iIndex, j: jIndex },
              size: { x: 1, y: 1 },
            };
          }
        }
      }
    },
  },
});

export const { addItem, deleteItem } = inventorySlice.actions;

export default inventorySlice.reducer;
