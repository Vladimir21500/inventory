import { store } from "../state";
import { IPosition, ISize } from "../types/items";

export const isEnaughtInventoryPlace = (size: ISize, targetPosition: IPosition): boolean => {
  const { i, j } = targetPosition;

  if (j < 0) return true;

  const { x, y } = size;
  const xLength = store.getState().inventory.items.length;
  const yLength = store.getState().inventory.items[i].length;

  if (i + x > xLength || j + y > yLength) {
    return false;
  }
  return true;
};
