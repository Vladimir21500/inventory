import { combineReducers, configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./slicers/inventorySlice";
import containersReducer from "./slicers/containersSlice";
import currentItemReducer from "./slicers/currentItemSlicer";

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    containers: containersReducer,
    currentItem: currentItemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
