import { take, put, call, fork } from "redux-saga/effects";
import { GET_POTY_USER_SCORE_CARD } from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT } from "../constants";
import { getPotyUserScoreCardSuccess } from "../actions/ScoreCardActions";
import {
  GET_POTY_USER_SCORE_CARD as GET_POTY_USER_SCORE_CARD_URL,
  callRequest
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

export default function* root() {
  yield fork(getPotyUserScoreCard);
}
