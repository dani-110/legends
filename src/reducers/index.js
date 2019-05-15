import { combineReducers } from "redux";

import navigator from "./navigator";
import user from "./user";
import tournament from "./tournament";
import news from "./news";
import general from "./general";

export default combineReducers({
  route: navigator,
  user,
  tournament,
  news,
  general
});
