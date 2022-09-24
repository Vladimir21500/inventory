import React from "react";
import { useAppSelector } from "../../hooks/redux";
import Cell from "../cell/Cell";

import "./inventory.scss";

const Inventory: React.FC<{}> = () => {
  const items = useAppSelector((state) => state.inventory.items);

  return (
    <div className='inventory'>
      <h1 className='inventory__title'>Inventory</h1>
      <div className='inventory__box'>
        {items.map((col) => col.map((item) => <Cell key={item.id} {...item} type='inventory' />))}
      </div>
    </div>
  );
};

export default Inventory;
