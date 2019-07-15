import { take, put, call, fork } from "redux-saga/effects";
import { GET_POTY_SCORE_NET } from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
  getPotyScoreNetSuccess,
  getPotyScoreNetFailure
} from "../actions/LiveMatchesActions";
import {
  GET_POTY_SCORE_NET as GET_POTY_SCORE_NET_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

function alert(message, type = "error") {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getPotyScoreNet() {
  while (true) {
    const { responseCallback } = yield take(GET_POTY_SCORE_NET.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_POTY_SCORE_NET_URL,
        {},
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(getPotyScoreNetSuccess(response.data));
      } else {
        yield put(getPotyScoreNetFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getPotyScoreNetFailure());
      alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(getPotyScoreNet);
}
