//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider as ReduxStore } from "react-redux";
import store from "./redux/store";

createRoot(document.getElementById("root")!).render(
  //<StrictMode>
  <ReduxStore store={store}>
    <App />
  </ReduxStore>
  //</StrictMode>
);
