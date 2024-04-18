import { configureStore } from "@reduxjs/toolkit";
import menu from "./slice/menu";
import customizationReducer from "./customizationReducer";

const store = configureStore({
  reducer: {
    menu: menu,
    customizationReducer: customizationReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
