import { take, put, call, fork } from "redux-saga/effects";
import {
  GET_POTY_SCORE_NET,
  GET_POTY_SCORE_GROSS,
  GET_LIVE_DATA,
  GET_SCORE_LCL_SINGLES1,
  GET_SCORE_LCL_SINGLES2,
  GET_SCORE_LCL_FOURSOME,
  GET_SCORE_DMP,
  GET_SCORE_LMP
} from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
  getPotyScoreNetSuccess,
  getPotyScoreNetFailure,
  getPotyScoreGrossSuccess,
  getPotyScoreGrossFailure,
  getLivedataSuccess,
  getLivedataFailure,
  getScoreLclSingles1Success,
  getScoreLclSingles1Failure,
  getScoreLclSingles2Success,
  getScoreLclSingles2Failure,
  getScoreLclFoursomeSuccess,
  getScoreLclFoursomeFailure,
  getScoreDmpSuccess,
  getScoreDmpFailure,
  getScoreLmpSuccess,
  getScoreLmpFailure
} from "../actions/LiveMatchesActions";
import {
  GET_POTY_SCORE_NET as GET_POTY_SCORE_NET_URL,
  GET_POTY_SCORE_GROSS as GET_POTY_SCORE_GROSS_URL,
  GET_LIVE_DATA as GET_LIVE_DATA_URL,
  GET_SCORE_LCL_SINGLES1 as GET_SCORE_LCL_SINGLES1_URL,
  GET_SCORE_LCL_SINGLES2 as GET_SCORE_LCL_SINGLES2_URL,
  GET_SCORE_LCL_FOURSOME as GET_SCORE_LCL_FOURSOME_URL,
  GET_SCORE_DMP as GET_SCORE_DMP_URL,
  GET_SCORE_LMP as GET_SCORE_LMP_URL,
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
    const { subroute, responseCallback } = yield take(
      GET_POTY_SCORE_NET.REQUEST
    );
    try {
      const response = yield call(
        callRequest,
        GET_POTY_SCORE_NET_URL,
        {},
        subroute,
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(getPotyScoreNetSuccess(response.data));
        if (responseCallback) responseCallback(response.data);
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

function* getScoreLclSingles1() {
  while (true) {
    const { subRoute } = yield take(GET_SCORE_LCL_SINGLES1.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SCORE_LCL_SINGLES1_URL,
        {},
        subRoute,
        {},
        ApiSauce
      );
      if (Util.isSuccessResponse(response)) {
        yield put(getScoreLclSingles1Success(response.data));
      } else {
        yield put(getScoreLclSingles1Failure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getScoreLclSingles1Failure());
      alert(err.message);
    }
  }
}

function* getScoreLclSingles2() {
  while (true) {
    const { subRoute } = yield take(GET_SCORE_LCL_SINGLES2.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SCORE_LCL_SINGLES2_URL,
        {},
        subRoute,
        {},
        ApiSauce
      );
      if (Util.isSuccessResponse(response)) {
        yield put(getScoreLclSingles2Success(response.data));
      } else {
        yield put(getScoreLclSingles2Failure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getScoreLclSingles2Failure());
      alert(err.message);
    }
  }
}

function* getScoreLclFoursome() {
  while (true) {
    const { subRoute } = yield take(GET_SCORE_LCL_FOURSOME.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SCORE_LCL_FOURSOME_URL,
        {},
        subRoute,
        {},
        ApiSauce
      );
      if (Util.isSuccessResponse(response)) {
        yield put(getScoreLclFoursomeSuccess(response.data));
      } else {
        yield put(getScoreLclFoursomeFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getScoreLclFoursomeFailure());
      alert(err.message);
    }
  }
}

function* getScoreDmp() {
  while (true) {
    const { subRoute } = yield take(GET_SCORE_DMP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SCORE_DMP_URL,
        {},
        subRoute,
        {},
        ApiSauce
      );
      if (Util.isSuccessResponse(response)) {
        yield put(getScoreDmpSuccess(response.data));
      } else {
        yield put(getScoreDmpFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getScoreDmpFailure());
      alert(err.message);
    }
  }
}

function* getScoreLmp() {
  while (true) {
    const { subRoute } = yield take(GET_SCORE_LMP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SCORE_LMP_URL,
        {},
        subRoute,
        {},
        ApiSauce
      );
      if (Util.isSuccessResponse(response)) {
        yield put(getScoreLmpSuccess(response.data));
      } else {
        yield put(getScoreLmpFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getScoreLmpFailure());
      alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(getPotyScoreNet);
  yield fork(getPotyScoreGross);
  yield fork(getLiveData);
  yield fork(getScoreLclSingles1);
  yield fork(getScoreLclSingles2);
  yield fork(getScoreLclFoursome);
  yield fork(getScoreDmp);
  yield fork(getScoreLmp);
}
