import React from "react";

import "./styles/app.scss";

import Container from "./components/container/Container";
import Inventory from "./components/inventory/Inventory";
import Player from "./components/player/Player";
import Bag from "./components/bag/Bag";
import Intro from "./components/intro/Intro";

function App() {
  return (
    <div className='page'>
      <Intro />

      <main className='page__content'>
        <Player />
        <Inventory />
        <Bag />
      </main>
    </div>
  );
}

export default App;
