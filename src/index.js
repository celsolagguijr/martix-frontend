import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";
import App from "./App";

//persist reducers
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

//redux store
import { Provider } from "react-redux";
import { store } from "./redux/store";

let persistor = persistStore(store);

// import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  // </React.StrictMode>
  document.getElementById("root"),
);

// reportWebVitals();
