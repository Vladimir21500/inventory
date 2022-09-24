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
import { IItem, ItemType } from "../../types/items";

import "./cell.scss";

interface ICell {
  id: string;
  data: string | null;
  type: ItemType;
}

const Cell: React.FC<ICell> = ({ id, data, type }) => {
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
        if (checkTargetCellData(type, id)) {
          alert("cell is not empty");
          break;
        }
        if (type === "bag") dispatch(addItemToBag({ item: currentItem.item, targetId: id }));

        if (type === "player") dispatch(addItemToPlayer({ item: currentItem.item, targetId: id }));

        if (type === "inventory") dispatch(addItem({ item: currentItem.item, targetId: id }));

        dispatch(deleteItem(currentItem.item.id));
        break;
      case "player":
        if (checkTargetCellData(type, id)) {
          alert("cell is not empty");
          break;
        }
        if (type === "inventory") dispatch(addItem({ item: currentItem.item, targetId: id }));

        if (type === "bag") dispatch(addItemToBag({ item: currentItem.item, targetId: id }));

        if (type === "player") dispatch(addItemToPlayer({ item: currentItem.item, targetId: id }));

        dispatch(deleteItemFromPlayer(currentItem.item.id));
        break;

      case "bag":
        if (checkTargetCellData(type, id)) {
          alert("cell is not empty");
          break;
        }
        if (type === "inventory") dispatch(addItem({ item: currentItem.item, targetId: id }));

        if (type === "player") dispatch(addItemToPlayer({ item: currentItem.item, targetId: id }));

        if (type === "bag") dispatch(addItemToBag({ item: currentItem.item, targetId: id }));

        dispatch(deleteItemFromBag(currentItem.item.id));
        break;
    }
    dispatch(resetCurrentItem());
  };

  return (
    <div
      className='cell'
      draggable
      onDragStart={(event) => dragStartHandler(event, { id, data }, type)}
      onDragLeave={(event) => dragLeaveHandler(event)}
      onDragOver={(event) => dragOverHandler(event)}
      onDrop={(event) => dropHandler(event, { id, data })}
      data-type={type}
    >
      {data === null ? "" : data}
    </div>
  );
};

export default Cell;
