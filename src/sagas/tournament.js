import { take, put, call, fork } from "redux-saga/effects";
import {
  GET_POTY_TOURNAMENT,
  GET_POTY_LEADERBOARD,
  GET_LCL_POINTS_TABLE,
  GET_LCL_MONTHLY_MATCHES,
  GET_LMP_RESULTS,
  GET_DMP_RESULTS
} from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import {
  getPotyTournamentSuccess,
  getPotyLeaderboardSuccess,
  getPotyLeaderboardFailure,
  getLclPointsTableSuccess,
  getLclPointsTableFailure,
  getLclMonthlyMatchesSuccess,
  getLclMonthlyMatchesFailure,
  getLmpResultsSuccess,
  getLmpResultsFailure,
  getDmpResultsSuccess,
  getDmpResultsFailure
} from "../actions/TournamentActions";
import {
  GET_POTY_TOURNAMENT as GET_POTY_TOURNAMENT_URL,
  GET_POTY_LEADERBOARD as GET_POTY_LEADERBOARD_URL,
  GET_LCL_POINTS_TABLE as GET_LCL_POINTS_TABLE_URL,
  GET_LCL_MONTHLY_MATCHES as GET_LCL_MONTHLY_MATCHES_URL,
  GET_LMP_RESULTS as GET_LMP_RESULTS_URL,
  GET_DMP_RESULTS as GET_DMP_RESULTS_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

function alert(message, type = "error") {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getPotyTournament() {
  while (true) {
    const { payload, responseCallback } = yield take(
      GET_POTY_TOURNAMENT.REQUEST
    );
    try {
      const response = yield call(
        callRequest,
        GET_POTY_TOURNAMENT_URL,
        payload,
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(getPotyTournamentSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* getPotyLeaderboard() {
  while (true) {
    const { responseCallback } = yield take(GET_POTY_LEADERBOARD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_POTY_LEADERBOARD_URL,
        {},
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(getPotyLeaderboardSuccess(response.data));
      } else {
        yield put(getPotyLeaderboardFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getPotyLeaderboardFailure());
      alert(err.message);
    }
  }
}

function* getLclPointsTable() {
  while (true) {
    const { responseCallback } = yield take(GET_LCL_POINTS_TABLE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_LCL_POINTS_TABLE_URL,
        {},
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(getLclPointsTableSuccess(response.data));
      } else {
        yield put(getLclPointsTableFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getLclPointsTableFailure());
      alert(err.message);
    }
  }
}

function* getLclMonthlyMatches() {
  while (true) {
    const { responseCallback } = yield take(GET_LCL_MONTHLY_MATCHES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_LCL_MONTHLY_MATCHES_URL,
        {},
        "",
        {},
        ApiSauce
      );
      // console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(getLclMonthlyMatchesSuccess(response.data));
      } else {
        yield put(getLclMonthlyMatchesFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getLclMonthlyMatchesFailure());
      alert(err.message);
    }
  }
}

function* getLmpResults() {
  while (true) {
    const { responseCallback } = yield take(GET_LMP_RESULTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_LMP_RESULTS_URL,
        {},
        "",
        {},
        ApiSauce
      );
      //  console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(getLmpResultsSuccess(response.data));
      } else {
        yield put(getLmpResultsFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getLmpResultsFailure());
      alert(err.message);
    }
  }
}

function* getDmpResults() {
  while (true) {
    const { responseCallback } = yield take(GET_DMP_RESULTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_DMP_RESULTS_URL,
        {},
        "",
        {},
        ApiSauce
      );
      console.log("response", response);
      if (Util.isSuccessResponse(response)) {
        yield put(getDmpResultsSuccess(response.data));
      } else {
        yield put(getDmpResultsFailure());
        alert(response.error);
      }
    } catch (err) {
      yield put(getDmpResultsFailure());
      alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(getPotyTournament);
  yield fork(getPotyLeaderboard);
  yield fork(getLclPointsTable);
  yield fork(getLclMonthlyMatches);
  yield fork(getLmpResults);
  yield fork(getDmpResults);
}
