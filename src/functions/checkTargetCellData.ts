import { store } from "../state";
import { ItemType } from "../types/items";

export const checkTargetCellData = (targetType: ItemType, targetId: string): boolean => {
  if (targetType === "bag") {
    return !!store.getState().containers.bagItems[+targetId].data;
  }
  if (targetType === "player") {
    return !!store.getState().containers.playerItems[+targetId].data;
  }
  if (targetType === "inventory") {
    const [x, y] = targetId.split("-").map((el) => +el);
    return !!store.getState().inventory.items[x][y].data;
  }
  return false;
};
