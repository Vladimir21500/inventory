import { store } from "../state";
import { IPosition, ISize } from "../types/items";

export const isFreeInventoryPlace = (size: ISize, targetPosition: IPosition): boolean => {
  const { i, j } = targetPosition;

  if (j < 0) return true;

  const { x, y } = size;
  const items = store.getState().inventory.items;
  for (let iIndex = i; iIndex < i + y; iIndex++) {
    for (let jIndex = j; jIndex < j + x; jIndex++) {
      if (items[iIndex][jIndex].data !== null) return false;
    }
  }
  return true;
};
