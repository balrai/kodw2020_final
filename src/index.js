import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

ReactDOM.render(
  // <React.StrictMode>
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
