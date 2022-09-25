import { store } from "../state";
import { IPosition, ItemType } from "../types/items";

export const checkTargetCellData = (targetType: ItemType, position: IPosition): boolean => {
  if (targetType === "bag") {
    return !!store.getState().containers.bagItems[position.i].data;
  }
  if (targetType === "player") {
    return !!store.getState().containers.playerItems[position.i].data;
  }
  if (targetType === "inventory") {
    const { i, j } = position;
    return !!store.getState().inventory.items[i][j].data;
  }
  return false;
};
