// @flow

import { GET_ENTER_SCORE_DATA } from "./ActionTypes";

export function getEnterScoreDataRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_ENTER_SCORE_DATA.REQUEST
  };
}

export function getEnterScoreDataSuccess(data) {
  return {
    data,
    type: GET_ENTER_SCORE_DATA.SUCCESS
  };
}

export function getEnterScoreDataFailure() {
  return {
    type: GET_ENTER_SCORE_DATA.FAILURE
  };
}
