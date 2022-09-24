import React from "react";
import { useAppSelector } from "../../hooks/redux";
import Container from "../container/Container";

import "./bag.scss";

const Bag: React.FC<{}> = () => {
  const items = useAppSelector((state) => state.containers.bagItems);
  return (
    <div className='bag'>
      <h3 className='bag__title'>Bag</h3>
      <Container items={items} type='bag' />
    </div>
  );
};

export default Bag;
