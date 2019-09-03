import { take, put, call, fork } from "redux-saga/effects";
import _ from "lodash";
import {
  GET_NOTIFICATIONS,
  MARK_NOTIFICATIONS_AS_READ,
  DELETE_NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS
} from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
  getNotificationsFailure,
  getNotificationsSuccess,
  markNotificationsReadSuccess,
  markNotificationsReadFailure,
  deleteNotificationsSuccess,
  deleteNotificationsFailure,
  deleteAllNotificationsSuccess,
  deleteAllNotificationsFailure
} from "../actions/NotificationsActions";
import {
  GET_NOTIFICATIONS as GET_NOTIFICATIONS_URL,
  MARK_NOTIFICATIONS_AS_READ as MARK_NOTIFICATIONS_AS_READ_URL,
  DELETE_NOTIFICATION as DELETE_NOTIFICATION_URL,
  DELETE_ALL_NOTIFICATIONS as DELETE_ALL_NOTIFICATIONS_URL,
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
    const { responseCallback } = yield take(GET_NOTIFICATIONS.REQUEST);
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
      if (Util.isSuccessResponse(response)) {
        responseCallback && responseCallback(response.data);
        yield put(getNotificationsSuccess(response.data));
      } else {
        yield put(getNotificationsFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getNotificationsFailure());
      alert(err.message);
    }
  }
}

function* marknotificationsread() {
  while (true) {
    const { payload } = yield take(MARK_NOTIFICATIONS_AS_READ.REQUEST);
    try {
      const response = yield call(
        callRequest,
        MARK_NOTIFICATIONS_AS_READ_URL,
        {},
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(markNotificationsReadSuccess(response.data));
      } else {
        yield put(markNotificationsReadFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(markNotificationsReadFailure());
      alert(err.message);
    }
  }
}

function* deletenotifications() {
  while (true) {
    const { parameter } = yield take(DELETE_NOTIFICATION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_NOTIFICATION_URL,
        {},
        parameter,
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(deleteNotificationsSuccess(parameter));
      } else {
        yield put(deleteNotificationsFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(deleteNotificationsFailure());
      alert(err.message);
    }
  }
}

function* deleteallnotifications() {
  while (true) {
    const { parameter } = yield take(DELETE_ALL_NOTIFICATIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_ALL_NOTIFICATIONS_URL,
        {},
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(deleteAllNotificationsSuccess());
      } else {
        yield put(deleteAllNotificationsFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(deleteAllNotificationsFailure());
      alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(getnotifications);
  yield fork(marknotificationsread);
  yield fork(deletenotifications);
  yield fork(deleteallnotifications);
}
