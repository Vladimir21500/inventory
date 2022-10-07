import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state/index";
import { addInventory } from "./addInventory";

declare global {
  interface Window {
    addInventory: (boxId: string, x: number, y: number) => void;
  }
}

window.addInventory = addInventory;

//! change for adding to portfolio
// 1. add form for adding things
// 2. add possibility to add photo
// 3. add hover for targetPlace
//

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
