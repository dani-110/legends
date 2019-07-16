import { take, put, call, fork } from "redux-saga/effects";
import { GET_DASHBOARD_DATA } from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
  getDashboardDataSuccess,
  getDashboardDataFailure
} from "../actions/GeneralActions";
import {
  GET_DASHBOARD_DATA as GET_DASHBOARD_DATA_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

function alert(message, type = "error") {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getDashboardData() {
  while (true) {
    const { responseCallback } = yield take(GET_DASHBOARD_DATA.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_DASHBOARD_DATA_URL,
        {},
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(getDashboardDataSuccess(response.data));
      } else {
        yield put(getDashboardDataFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getDashboardDataFailure());
      alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(getDashboardData);
}
