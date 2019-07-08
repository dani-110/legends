import { fork } from "redux-saga/effects";
import user from "./user";
import init from "./init";
import tournament from "./tournament";
import news from "./news";

export default function* root() {
  yield fork(user);
  yield fork(tournament);
  yield fork(init);
  yield fork(news);
}
