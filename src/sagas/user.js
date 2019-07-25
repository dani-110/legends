import { take, put, call, fork } from "redux-saga/effects";
import {
  USER_SIGNUP,
  USER_SIGNIN,
  USER_SIGNOUT,
  GET_USER_PROFILE,
  UPLOAD_USER_IMAGE
} from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
  userSignupSuccess,
  userSigninSuccess,
  userSignOutSuccess,
  getUserProfileSuccess,
  getUserProfileFailure,
  uploadUserImageSuccess
} from "../actions/UserActions";
import {
  USER_SIGNUP as USER_SIGNUP_URL,
  USER_SIGNIN as USER_SIGNIN_URL,
  USER_SIGNOUT as USER_SIGNOUT_URL,
  GET_USER_PROFILE as GET_USER_PROFILE_URL,
  UPLOAD_USER_IMAGE as UPLOAD_USER_IMAGE_URL,
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
      if (response) {
        yield put(userSigninSuccess(response));
        if (responseCallback) responseCallback(response, null);
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.error));
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

function* getUserProfile() {
  while (true) {
    const { responseCallback } = yield take(GET_USER_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_USER_PROFILE_URL,
        {},
        "",
        {},
        ApiSauce
      );

      if (Util.isSuccessResponse(response)) {
        yield put(getUserProfileSuccess(response.data));
      } else {
        alert("Something went wrong");
        yield put(getUserProfileFailure());
      }
    } catch (err) {
      alert(Util.getErrorText(err.message));
      yield put(getUserProfileFailure());
    }
  }
}

function* uploadUserImage() {
  while (true) {
    const { payload, responseCallback } = yield take(UPLOAD_USER_IMAGE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPLOAD_USER_IMAGE_URL,
        payload,
        "",
        {
          Accept: "application/json, text/plain, */*",
          "Content-Type":
            "multipart/form-data; boundary=--------------------------343064211568812807073801"
          // Accept: "multipart/form-data"
        },
        ApiSauce
      );

      if (Util.isSuccessResponse(response)) {
        if (responseCallback) responseCallback(response.image_url, null);
        yield put(uploadUserImageSuccess(response.image_url));
      } else {
        if (responseCallback) responseCallback(null, true);
        alert("Something went wrong");
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      // alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(signup);
  yield fork(signout);
  yield fork(signin);
  yield fork(getUserProfile);
  yield fork(uploadUserImage);
}
