import { take, put, call, fork } from "redux-saga/effects";
import _ from "lodash";
import { TOURNAMENT_POTY } from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import { getPotyTournamentSuccess } from "../actions/TournamentActions";
import {
  TOURNAMENT_POTY as TOURNAMENT_POTY_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

function alert(message, type = "error") {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getpoty() {
  while (true) {
    const { payload, responseCallback } = yield take(TOURNAMENT_POTY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        TOURNAMENT_POTY_URL,
        payload,
        "20",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (_.isArray(response)) {
        yield put(getPotyTournamentSuccess(response));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert("Something went wrong");
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}
export default function* root() {
  yield fork(getpoty);
}
