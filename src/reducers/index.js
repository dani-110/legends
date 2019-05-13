import { combineReducers } from "redux";

import navigator from "./navigator";
import user from "./user";
import tournament from "./tournament";

export default combineReducers({
  route: navigator,
  user,
  tournament
});
