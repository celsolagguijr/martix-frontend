import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "./auth";
import subjectReducer from "./subjects";
// import lessonsReducer from "./lessons";

const reducers = combineReducers({
  subject: subjectReducer,
  auth: authReducer,
  // lessons: lessonsReducer,
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
