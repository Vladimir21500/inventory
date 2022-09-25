import React from "react";
import { checkTargetCellData } from "../../functions/checkTargetCellData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addItemToBag,
  addItemToPlayer,
  deleteItemFromBag,
  deleteItemFromPlayer,
} from "../../state/slicers/containersSlice";
import { setCurrentItem, resetCurrentItem } from "../../state/slicers/currentItemSlicer";
import { addItem, deleteItem } from "../../state/slicers/inventorySlice";
import { IItem, IPosition, ISize, ItemType } from "../../types/items";

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

    event.target.className = "cell light";
  };

  const dropHandler = (event: any, item: IItem) => {
    event.preventDefault();

    event.target.className = "cell";

    switch (currentItem.type) {
      case "inventory":
        if (checkTargetCellData(type, item.position)) {
          alert("cell is not empty");
          break;
        }
        if (type === "bag") dispatch(addItemToBag({ item: currentItem.item, targetposition: position }));

        if (type === "player")
          dispatch(addItemToPlayer({ item: currentItem.item, targetposition: position }));

        if (type === "inventory")
          dispatch(addItem({ item: currentItem.item, targetPosition: item.position }));

        dispatch(deleteItem(currentItem.item.position));
        break;
      case "player":
        if (checkTargetCellData(type, position)) {
          alert("cell is not empty");
          break;
        }
        if (type === "inventory") dispatch(addItem({ item: currentItem.item, targetposition: position }));

        if (type === "bag") dispatch(addItemToBag({ item: currentItem.item, targetposition: position }));

        if (type === "player")
          dispatch(addItemToPlayer({ item: currentItem.item, targetposition: position }));

        dispatch(deleteItemFromPlayer(currentItem.item.position));
        break;

      case "bag":
        if (checkTargetCellData(type, position)) {
          alert("cell is not empty");
          break;
        }
        if (type === "inventory") dispatch(addItem({ item: currentItem.item, targetposition: position }));

        if (type === "player")
          dispatch(addItemToPlayer({ item: currentItem.item, targetposition: position }));

        if (type === "bag") dispatch(addItemToBag({ item: currentItem.item, targetposition: position }));

        dispatch(deleteItemFromBag(currentItem.item.position));
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
    >
      {item.data === null ? "" : <span>{item.data}</span>}
    </div>
  );
};

export default Cell;
