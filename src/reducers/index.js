import { combineReducers } from "redux";

import navigator from "./navigator";
import user from "./user";
import tournament from "./tournament";
import news from "./news";
import general from "./general";
import liveMatches from "./liveMatches";
import notification from "./notification";
import scoreCard from "./scoreCard";
import liveScore from "./liveScore";
import enterScore from "./enterScore";
import playersDirectory from "./playersDirectory";
import sponsor from './sponsor';

export default combineReducers({
  route: navigator,
  user,
  tournament,
  news,
  general,
  liveMatches,
  notification,
  scoreCard,
  liveScore,
  enterScore,
  playersDirectory,
  sponsor
});
