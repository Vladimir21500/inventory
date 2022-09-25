import { IPosition, ISize, ItemType } from "../types/items";
import { checkTargetCellData } from "./checkTargetCellData";
import { isEnaughtInventoryPlace } from "./isEnaughtPlace";
import { isFreeInventoryPlace } from "./isFreePlace";

export const validateTargetPlace = (size: ISize, targetPosition: IPosition, targetType: ItemType) => {
  if (checkTargetCellData(targetType, targetPosition)) {
    alert("cell is not empty");
    return false;
  }
  if (!isEnaughtInventoryPlace(size, targetPosition)) {
    alert("Not enought place");
    return false;
  }
  if (!isFreeInventoryPlace(size, targetPosition)) {
    alert("Not free place");
    return false;
  }
  return true;
};
