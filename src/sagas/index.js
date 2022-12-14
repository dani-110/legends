import { fork } from "redux-saga/effects";
import general from "./general";
import user from "./user";
import init from "./init";
import tournament from "./tournament";
import news from "./news";
import liveMatches from "./liveMatches";
import enterScore from "./enterScore";
import scoreCard from "./scoreCard";
import playersDirectory from "./playersDirectory";
import notifications from "./notifications";
import sponsor from "./sponsor";

export default function* root() {
  yield fork(general);
  yield fork(user);
  yield fork(tournament);
  yield fork(init);
  yield fork(news);
  yield fork(liveMatches);
  yield fork(enterScore);
  yield fork(scoreCard);
  yield fork(playersDirectory);
  yield fork(notifications);
  yield fork(sponsor)
}
