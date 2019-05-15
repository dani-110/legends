import { take, put, call, fork } from "redux-saga/effects";
import { USER_SIGNUP, USER_SIGNIN, USER_SIGNOUT } from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
  userSignupSuccess,
  userSigninSuccess,
  userSignOutSuccess
} from "../actions/UserActions";
import {
  USER_SIGNUP as USER_SIGNUP_URL,
  USER_SIGNIN as USER_SIGNIN_URL,
  USER_SIGNOUT as USER_SIGNOUT_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

function alert(message, type = "error") {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* signup() {
  while (true) {
    const { payload, responseCallback } = yield take(USER_SIGNUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNUP_URL,
        payload,
        "",
        {},
        ApiSauce
      );
      if (response.success) {
        yield put(userSignupSuccess(response.data.user));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert("Something went wrong");
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}

function* signin() {
  while (true) {
    const { payload, responseCallback } = yield take(USER_SIGNIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNIN_URL,
        payload,
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (response.success) {
        if (responseCallback) responseCallback(response.data.user, null);
        yield put(userSigninSuccess(response.data.user));
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}

function* signout() {
  while (true) {
    const { responseCallback } = yield take(USER_SIGNOUT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNOUT_URL,
        {},
        "",
        {},
        ApiSauce
      );

      if (response.data) {
        if (responseCallback) responseCallback(true, null);

        yield put(userSignOutSuccess());
      } else {
        alert("Something went wrong");
        yield put(userSignOutSuccess());
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
      yield put(userSignOutSuccess());
    }
  }
}

export default function* root() {
  yield fork(signup);
  yield fork(signout);
  yield fork(signin);
}
