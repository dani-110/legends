import { take, put, call, fork } from "redux-saga/effects";
import {
  GET_POTY_SCORE_NET,
  GET_POTY_SCORE_GROSS,
  GET_LIVE_DATA
} from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
  getPotyScoreNetSuccess,
  getPotyScoreNetFailure,
  getPotyScoreGrossSuccess,
  getPotyScoreGrossFailure,
  getLivedataSuccess,
  getLivedataFailure
} from "../actions/LiveMatchesActions";
import {
  GET_POTY_SCORE_NET as GET_POTY_SCORE_NET_URL,
  GET_POTY_SCORE_GROSS as GET_POTY_SCORE_GROSS_URL,
  GET_LIVE_DATA as GET_LIVE_DATA_URL,
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

function* getPotyScoreGross() {
  while (true) {
    const { responseCallback } = yield take(GET_POTY_SCORE_GROSS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_POTY_SCORE_GROSS_URL,
        {},
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(getPotyScoreGrossSuccess(response.data));
      } else {
        yield put(getPotyScoreGrossFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getPotyScoreGrossFailure());
      alert(err.message);
    }
  }
}

function* getLiveData() {
  while (true) {
    const { responseCallback } = yield take(GET_LIVE_DATA.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_LIVE_DATA_URL,
        {},
        "",
        {},
        ApiSauce
      );
      if (Util.isSuccessResponse(response)) {
        yield put(
          getLivedataSuccess(Util.getManipulatedLiveMatchesData(response.data))
        );
      } else {
        yield put(getLivedataFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getLivedataFailure());
      alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(getPotyScoreNet);
  yield fork(getPotyScoreGross);
  yield fork(getLiveData);
}
