import { take, put, call, fork } from "redux-saga/effects";
import _ from "lodash";
import { GET_NEWS } from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import { getNewsFailure, getNewsSuccess } from "../actions/NewsActions";
import { GET_NEWS as GET_NEWS_URL, callRequest } from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

function alert(message, type = "error") {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getpoty() {
  while (true) {
    const { payload } = yield take(GET_NEWS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_NEWS_URL,
        {},
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(getNewsSuccess(response.data));
      } else {
        yield put(getNewsFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getNewsFailure());
      alert(err.message);
    }
  }
}
export default function* root() {
  yield fork(getpoty);
}
