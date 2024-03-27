import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import menu from "./slice/menu";

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customizationReducer: customizationReducer,
  menu: menu,
});

export default rootReducer;
