import { take, put, call, fork } from "redux-saga/effects";
import _ from "lodash";
import { GET_PLAYERS_DIRECTORY } from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
  getPlayersDirectoryFailure,
  getPlayersDirectorySuccess
} from "../actions/PlayersDirectoryActions";
import {
  GET_PLAYERS_DIRECTORY as GET_PLAYERS_DIRECTORY_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

function alert(message, type = "error") {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getplayersdirectory() {

  while (true) {
    const { responseCallback } = yield take(GET_PLAYERS_DIRECTORY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PLAYERS_DIRECTORY_URL,
        {},
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(getPlayersDirectorySuccess(response.data));
        if (responseCallback) responseCallback(response);
      } else {
        yield put(getPlayersDirectoryFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getPlayersDirectoryFailure());
      alert(err.message);
    }
  }
}
export default function* root() {
  yield fork(getplayersdirectory);
}
