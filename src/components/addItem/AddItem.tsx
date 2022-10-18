import React, { useState } from "react";
import { validateTargetPlace } from "../../functions/validateTargetPlace";
import { useAppDispatch } from "../../hooks/redux";
import { addItem } from "../../state/slicers/inventorySlice";
import { IFormData } from "../../types/items";

import "./addItem.scss";

const AddItem: React.FC<{}> = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<IFormData>({
    iIndex: 0,
    jIndex: 0,
    xSize: 1,
    ySize: 1,
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const iIndex = +formData.iIndex;
    const jIndex = +formData.jIndex;
    const xSize = +formData.xSize;
    const ySize = +formData.ySize;

    if (iIndex > 5 || jIndex > 16) {
      console.log("incorrect boxId");
      alert("incorrect boxId");
      return false;
    }
    if (xSize > 5 || ySize > 16) {
      console.log("too large size");
      alert("too large size");
      return false;
    }
    if (!validateTargetPlace({ x: xSize, y: ySize }, { i: iIndex, j: jIndex }, "inventory")) {
      return false;
    }
    dispatch(
      addItem({
        item: {
          id: "FrForm",
          data: "form thing",
          size: { x: xSize, y: ySize },
          position: { i: iIndex, j: jIndex },
        },
        targetPosition: { i: iIndex, j: jIndex },
      })
    );
  };
  const { iIndex, jIndex, xSize, ySize } = formData;

  return (
    <>
      <h3 className='add-item__title'>Add Item</h3>
      <div className='add-item'>
        <form onSubmit={submitHandler} className='add-item__form'>
          <div className='add-item__field'>
            <label>i-Index</label>
            <input onChange={changeHandler} type='number' name='iIndex' value={iIndex} />
          </div>
          <div className='add-item__field'>
            <label>j-Index</label>
            <input onChange={changeHandler} type='number' name='jIndex' value={jIndex} />
          </div>
          <div className='add-item__field'>
            <label>x-Size</label>
            <input onChange={changeHandler} type='number' name='xSize' value={xSize} />
          </div>
          <div className='add-item__field'>
            <label>y-Size</label>
            <input onChange={changeHandler} type='number' name='ySize' value={ySize} />
          </div>

          <button className='add-item__submit-btn'>Add +</button>
        </form>
      </div>
    </>
  );
};

export default AddItem;
