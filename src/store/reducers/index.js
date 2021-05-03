import { combineReducers } from "redux";
import register from "./RegisterReducer";

const rootReducer = combineReducers({
  register,
});

export default rootReducer;