import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
// import counterReducer from "./counter";
// import articleReducer from "./articles";

const reducers = combineReducers({
  // counter: counterReducer,
  // article: articleReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer, // you can direct all reducers here
  middleware: [thunk],
});
