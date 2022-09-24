import React from "react";
import { useAppSelector } from "../../hooks/redux";
import Container from "../container/Container";

import "./player.scss";

const Player: React.FC<{}> = () => {
  const items = useAppSelector((state) => state.containers.playerItems);

  return (
    <div className='player'>
      <h3 className='player__title'>Player</h3>
      <Container items={items} type='player' />
    </div>
  );
};

export default Player;
