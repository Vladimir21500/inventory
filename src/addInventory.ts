import { addItem } from "./state/slicers/inventorySlice";
import { store } from "./state";

export const addInventory = (boxId: string, x: number, y: number): boolean => {
  const [i, j] = boxId.split("-").map((el) => +el);
  if (i > 5 || j > 16) {
    console.log("incorrect boxId");
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
