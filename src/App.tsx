import Inventory from "./components/inventory/Inventory";
import Player from "./components/player/Player";
import Bag from "./components/bag/Bag";
import AddItem from "./components/addItem/AddItem";

import "./styles/app.scss";

function App() {
  return (
    <div className='page'>
      <AddItem />
      <main className='page__content'>
        <Player />
        <Inventory />
        <Bag />
      </main>
    </div>
  );
}

export default App;
