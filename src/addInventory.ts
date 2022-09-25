import { addItem } from "./state/slicers/inventorySlice";
import { store } from "./state";
import { validateTargetPlace } from "./functions/validateTargetPlace";

export const addInventory = (boxId: string, x: number, y: number): boolean => {
  const [i, j] = boxId.split("-").map((el) => +el);
  if (i > 5 || j > 16) {
    console.log("incorrect boxId");
    return false;
  }
  if (x > 5 || y > 16) {
    console.log("too large size");
    return false;
  }
  if (!validateTargetPlace({ x, y }, { i, j }, "inventory")) {
    return false;
  }
  store.dispatch(
    addItem({
      item: { id: "FrCons", data: "console thing", size: { x, y }, position: { i, j } },
      targetPosition: { i, j },
    })
  );
  return true;
};
