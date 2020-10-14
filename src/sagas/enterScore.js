import { take, put, call, fork } from "redux-saga/effects";
import {
  GET_ENTER_SCORE_DATA,
  POST_POTY_SCORE,
  POST_LCL_SCORE,
  POST_LMP_SCORE,
  POST_DMP_SCORE
} from "../actions/ActionTypes";
import { NOT_SHOW_MSG, SAGA_ALERT_TIMEOUT } from "../constants";
import {
  getEnterScoreDataSuccess,
  getEnterScoreDataFailure,
  postPotyScoreSuccess,
  postPotyScoreFailure,
  postLclScoreSuccess,
  postLclScoreFailure,
  postLmpScoreSuccess,
  postLmpScoreFailure,
  postDmpScoreSuccess,
  postDmpScoreFailure
} from "../actions/EnterScoreActions";
import {
  GET_ENTER_SCORE_DATA_POTY as GET_ENTER_SCORE_DATA_POTY_URL,
  GET_ENTER_SCORE_DATA_LCL as GET_ENTER_SCORE_DATA_LCL_URL,
  GET_ENTER_SCORE_DATA_LMP as GET_ENTER_SCORE_DATA_LMP_URL,
  GET_ENTER_SCORE_DATA_DMP as GET_ENTER_SCORE_DATA_DMP_URL,
  POST_POTY_SCORE as POST_POTY_SCORE_URL,
  POST_LCL_SCORE as POST_LCL_SCORE_URL,
  POST_LMP_SCORE as POST_LMP_SCORE_URL,
  POST_DMP_SCORE as POST_DMP_SCORE_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

const GET_ENTER_SCORE_DATA_URL = {
  poty: GET_ENTER_SCORE_DATA_POTY_URL,
  lcl: GET_ENTER_SCORE_DATA_LCL_URL,
  lmp: GET_ENTER_SCORE_DATA_LMP_URL,
  dmp: GET_ENTER_SCORE_DATA_DMP_URL
};

function alert(message, type = "error") {
  setTimeout(() => {
    Util.topAlertError(message, type);
  }, 3000);
}

function* getEnterScoreData() {
  console.log("//////////--------->");
  while (true) {
    const { payload, matchType, responseCallback } = yield take(
      GET_ENTER_SCORE_DATA.REQUEST
    );
    try {
      const response = yield call(
        callRequest,
        GET_ENTER_SCORE_DATA_URL[matchType],
        {},
        payload,
        {},
        ApiSauce
      );
      console.log("response--------|||->", response);
      if (Util.isSuccessResponse(response)) {
        responseCallback && responseCallback(response.data);
        yield put(getEnterScoreDataSuccess(response.data));
      } else {
        yield put(getEnterScoreDataFailure());
        alert(response.error);
      }
    } catch (err) {
      console.log("err: ", err);
      yield put(getEnterScoreDataFailure());
      alert(err.message);
    }
  }
}

function* postPotyScore() {
  while (true) {
    const { payload, responseCallback } = yield take(POST_POTY_SCORE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        POST_POTY_SCORE_URL,
        payload,
        "",

        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        debugger
        responseCallback && responseCallback(response.data);
        yield put(postPotyScoreSuccess(response.data));
      } else {
        yield put(postPotyScoreFailure());
        //alert(response.error);
      }
    } catch (err) {
      yield put(postPotyScoreFailure(NOT_SHOW_MSG));
      alert(err.message);
    }
  }
}

function* postLclScore() {
  while (true) {
    const { payload, responseCallback } = yield take(POST_LCL_SCORE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        POST_LCL_SCORE_URL,
        payload,
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        console.log("success=========>", "lcl_score");
        responseCallback && responseCallback(response.data);
        yield put(postLclScoreSuccess(response.data));
      } else {
        yield put(postLclScoreFailure());
        console.log("error=========>", "lcl_score");
        //alert("Not update. Please enter again")
      }
    } catch (err) {
      yield put(postLclScoreFailure(NOT_SHOW_MSG));
      alert(err.message)
      console.log("error=========>", "catch_lcl_score");
    }
  }
}

function* postLmpScore() {
  while (true) {
    const { payload, responseCallback } = yield take(POST_LMP_SCORE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        POST_LMP_SCORE_URL,
        payload,
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      debugger
      if (Util.isSuccessResponse(response)) {
        responseCallback && responseCallback(response.data);
        yield put(postLmpScoreSuccess(response.data));
      } else {
        yield put(postLmpScoreFailure());
        //alert(response.error);
      }
    } catch (err) {
      yield put(postLmpScoreFailure(NOT_SHOW_MSG));
      alert(err.message);
    }
  }
}

function* postDmpScore() {
  while (true) {
    const { payload, responseCallback } = yield take(POST_DMP_SCORE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        POST_DMP_SCORE_URL,
        payload,
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        responseCallback && responseCallback(response.data);
        yield put(postDmpScoreSuccess(response.data));
      } else {
        yield put(postDmpScoreFailure());
        //alert(response.error);
      }
    } catch (err) {
      yield put(postDmpScoreFailure(NOT_SHOW_MSG));
      alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(getEnterScoreData);
  yield fork(postPotyScore);
  yield fork(postLclScore);
  yield fork(postLmpScore);
  yield fork(postDmpScore);
}
