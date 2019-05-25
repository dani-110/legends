import { combineReducers } from "redux";

import navigator from "./navigator";
import user from "./user";
import tournament from "./tournament";
import news from "./news";
import general from "./general";
import liveMatches from "./liveMatches";
import notification from "./notification";
import liveScore from "./liveScore";

export default combineReducers({
  route: navigator,
  user,
  tournament,
  news,
  general,
  liveMatches,
  notification,
  liveScore
});
