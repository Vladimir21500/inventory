import React from "react";
import { validateTargetPlace } from "../../functions/validateTargetPlace";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addItemToBag,
  addItemToPlayer,
  deleteItemFromBag,
  deleteItemFromPlayer,
} from "../../state/slicers/containersSlice";
import { setCurrentItem, resetCurrentItem } from "../../state/slicers/currentItemSlicer";
import { addItem, deleteItem } from "../../state/slicers/inventorySlice";
import { IItem, ItemType } from "../../types/items";

import "./cell.scss";

interface ICell {
  item: IItem;
  type: ItemType;
}

const Cell: React.FC<ICell> = ({ item, type }) => {
  const dispatch = useAppDispatch();
  const currentItem = useAppSelector((state) => state.currentItem);

  const dragStartHandler = (event: any, item: IItem, type: ItemType) => {
    if (!item.data) {
      alert("You can`t take empty cell");
      event.preventDefault();
    } else {
      dispatch(setCurrentItem({ item, type }));
    }
  };

  const dragLeaveHandler = (event: any) => {
    event.target.className = "cell";
  };

  const dragOverHandler = (event: any) => {
    event.preventDefault();
    // const { x, y } = item.size;
    // if (event.target.dataset.position) {
    //   debugger;
    //   const [i, j] = event.target.dataset.position.split("-").map((el) => +el);
    //   for (let iIndex = i; iIndex < i + y; iIndex++) {
    //     for (let jIndex = j; jIndex < j + x; jIndex++) {
    //       document.querySelector(`[data-position="${iIndex}-${jIndex}"]`)?.classList.add("light");
    //     }
    //   }
    // }
    //! add hover for all block

    event.target.className = "cell light";
  };

  const dropHandler = (event: any, item: IItem) => {
    event.preventDefault();

    event.target.className = "cell";

    switch (currentItem.type) {
      case "inventory":
        if (!validateTargetPlace(currentItem.item.size, item.position, type)) break;

        dispatch(deleteItem(currentItem.item.position));

        if (type === "bag") dispatch(addItemToBag({ item: currentItem.item, targetPosition: item.position }));

        if (type === "player")
          dispatch(addItemToPlayer({ item: currentItem.item, targetPosition: item.position }));

        if (type === "inventory")
          dispatch(addItem({ item: currentItem.item, targetPosition: item.position }));

        break;
      case "player":
        if (!validateTargetPlace(currentItem.item.size, item.position, type)) break;

        dispatch(deleteItemFromPlayer(currentItem.item.position));

        if (type === "inventory")
          dispatch(addItem({ item: currentItem.item, targetPosition: item.position }));

        if (type === "bag") dispatch(addItemToBag({ item: currentItem.item, targetPosition: item.position }));

        if (type === "player")
          dispatch(addItemToPlayer({ item: currentItem.item, targetPosition: item.position }));

        break;

      case "bag":
        if (!validateTargetPlace(currentItem.item.size, item.position, type)) break;

        dispatch(deleteItemFromBag(currentItem.item.position));

        if (type === "inventory")
          dispatch(addItem({ item: currentItem.item, targetPosition: item.position }));

        if (type === "player")
          dispatch(addItemToPlayer({ item: currentItem.item, targetPosition: item.position }));

        if (type === "bag") dispatch(addItemToBag({ item: currentItem.item, targetPosition: item.position }));

        break;
    }
    dispatch(resetCurrentItem());
  };

  return (
    <div
      className='cell'
      draggable
      onDragStart={(event) => dragStartHandler(event, item, type)}
      onDragLeave={(event) => dragLeaveHandler(event)}
      onDragOver={(event) => dragOverHandler(event)}
      onDrop={(event) => dropHandler(event, item)}
      data-type={type}
      data-position={`${item.position.i}-${item.position.j}`}
    >
      {item.data === null ? "" : <span>{item.data}</span>}
    </div>
  );
};

export default Cell;
