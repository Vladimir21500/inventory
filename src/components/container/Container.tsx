import React from "react";
import Cell from "../cell/Cell";
import { IItem, ItemType } from "../../types/items";

import "./container.scss";

interface IContainer {
  items: IItem[];
  type: ItemType;
}

const Container: React.FC<IContainer> = ({ items, type }) => {
  return (
    <div className='container'>
      {items.map((item) => {
        const key = Math.random();
        return <Cell key={key} item={item} type={type} />;
      })}
    </div>
  );
};

export default Container;
