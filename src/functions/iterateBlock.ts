import { store } from "../state";
import { addItem } from "../state/slicers/inventorySlice";
import { IPosition, ISize } from "../types/items";

// export const iterateBlock = (targetId: IPosition, size: ISize, data: string, id: string): void => {
//   const {i, j} = targetId;
//   const {x, y} = size;
//   for (let iIndex = i; iIndex < i + y; iIndex++) {
//     for (let jIndex = j; jIndex < j + x; jIndex++) {
//       store.dispatch(addItem( {} , targetPosition: ));
//     }
//   }
// };
