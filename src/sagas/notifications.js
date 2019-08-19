import { take, put, call, fork } from "redux-saga/effects";
import _ from "lodash";
import { GET_NOTIFICATIONS } from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
  getNotificationsFailure,
  getNotificationsSuccess
} from "../actions/NotificationsActions";
import {
  GET_NOTIFICATIONS as GET_NOTIFICATIONS_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

function alert(message, type = "error") {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getnotifications() {
  while (true) {
    const { payload } = yield take(GET_NOTIFICATIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_NOTIFICATIONS_URL,
        {},
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      yield put(getNotificationsSuccess(response));
      // if (Util.isSuccessResponse(response)) {
      //   yield put(getNotificationsSuccess(response.data));
      // } else {
      //   yield put(getNotificationsFailure());
      //   alert(response.error);
      // }
    } catch (err) {
      yield put(getNotificationsFailure());
      alert(err.message);
    }
  }
}
export default function* root() {
  yield fork(getnotifications);
}
