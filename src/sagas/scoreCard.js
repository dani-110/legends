import { take, put, call, fork } from "redux-saga/effects";
import {
  GET_POTY_USER_SCORE_CARD,
  GET_HOLE_DATA_FOR_TOURNAMENT,
  GET_POTY_GROUP_SCORCARD,
  GET_LCL_GROUP_SCORCARD,
  GET_LMP_GROUP_SCORCARD,
  GET_DMP_GROUP_SCORCARD
} from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import { getPotyUserScoreCardSuccess } from "../actions/ScoreCardActions";
import {
  GET_POTY_USER_SCORE_CARD as GET_POTY_USER_SCORE_CARD_URL,
  GET_HOLE_DATA_FOR_TOURNAMENT as GET_HOLE_DATA_FOR_TOURNAMENT_URL,
  GET_POTY_GROUP_SCORCARD as GET_POTY_GROUP_SCORCARD_URL,
  GET_LCL_GROUP_SCORCARD as GET_LCL_GROUP_SCORCARD_URL,
  GET_LMP_GROUP_SCORCARD as GET_LMP_GROUP_SCORCARD_URL,
  callRequest,
  GET_DMP_GROUP_SCORCARD as GET_DMP_GROUP_SCORCARD_URL,
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";

function alert(message, type = "error") {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getPotyUserScoreCard() {
  while (true) {
    const { subroute, responseCallback } = yield take(
      GET_POTY_USER_SCORE_CARD.REQUEST
    );
    try {
      const response = yield call(
        callRequest,
        GET_POTY_USER_SCORE_CARD_URL,
        {},
        subroute,
        {},
        ApiSauce
      );
      if (Util.isSuccessResponse(response)) {
        if (responseCallback) responseCallback(response);
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

function* getHoleDataForTournament() {
  while (true) {
    const { subroute, responseCallback } = yield take(
      GET_HOLE_DATA_FOR_TOURNAMENT.REQUEST
    );
    try {
      const response = yield call(
        callRequest,
        GET_HOLE_DATA_FOR_TOURNAMENT_URL,
        {},
        subroute,
        {},
        ApiSauce
      );
      if (Util.isSuccessResponse(response)) {
        if (responseCallback) responseCallback(response);
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

function* getPotyScoreCard() {
  while (true) {
    const { responseCallback } = yield take(GET_POTY_GROUP_SCORCARD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_POTY_GROUP_SCORCARD_URL,
        {},
        "",
        {},
        ApiSauce
      );
      if (Util.isSuccessResponse(response)) {
        if (responseCallback) responseCallback(response.data);
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

function* getLclScoreCard() {
  while (true) {
    const { subroute, responseCallback } = yield take(
      GET_LCL_GROUP_SCORCARD.REQUEST
    );
    try {
      const response = yield call(
        callRequest,
        GET_LCL_GROUP_SCORCARD_URL,
        {},
        subroute,
        {},
        ApiSauce
      );
      if (Util.isSuccessResponse(response)) {
        if (responseCallback) responseCallback(response.data);
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

function* getLmpScoreCard() {
  while (true) {
    const { subroute, responseCallback } = yield take(
      GET_LMP_GROUP_SCORCARD.REQUEST
    );
    try {
      const response = yield call(
        callRequest,
        GET_LMP_GROUP_SCORCARD_URL,
        {},
        subroute,
        {},
        ApiSauce
      );
      if (Util.isSuccessResponse(response)) {
        if (responseCallback) responseCallback(response.data);
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

function* getDmpScoreCard() {
  while (true) {
    const { subroute, responseCallback } = yield take(
      GET_DMP_GROUP_SCORCARD.REQUEST
    );
    try {
      const response = yield call(
        callRequest,
        GET_DMP_GROUP_SCORCARD_URL,
        {},
        subroute,
        {},
        ApiSauce
      );
      if (Util.isSuccessResponse(response)) {
        if (responseCallback) responseCallback(response.data);
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

export default function* root() {
  yield fork(getPotyUserScoreCard);
  yield fork(getHoleDataForTournament);
  yield fork(getPotyScoreCard);
  yield fork(getLclScoreCard);
  yield fork(getLmpScoreCard);
  yield fork(getDmpScoreCard)
}
