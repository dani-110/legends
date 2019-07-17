import { take, put, call, fork } from "redux-saga/effects";
import { GET_ENTER_SCORE_DATA } from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
  getEnterScoreDataSuccess,
  getEnterScoreDataFailure
} from "../actions/EnterScore";
import {
  GET_ENTER_SCORE_DATA as GET_ENTER_SCORE_DATA_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

function alert(message, type = "error") {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getEnterScoreData() {
  while (true) {
    const { payload, responseCallback } = yield take(
      GET_ENTER_SCORE_DATA.REQUEST
    );
    try {
      const response = yield call(
        callRequest,
        GET_ENTER_SCORE_DATA_URL,
        {},
        payload,
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        responseCallback && responseCallback(response.data);
        yield put(getEnterScoreDataSuccess(response.data));
      } else {
        yield put(getEnterScoreDataFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getEnterScoreDataFailure());
      alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(getEnterScoreData);
}
