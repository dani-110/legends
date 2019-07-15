// @flow

import { GET_POTY_SCORE_NET } from "./ActionTypes";

export function getPotyScoreNetRequest() {
  return {
    type: GET_POTY_SCORE_NET.REQUEST
  };
}

export function getPotyScoreNetSuccess(data) {
  console.log("I was here", data);
  return {
    data,
    type: GET_POTY_SCORE_NET.SUCCESS
  };
}

export function getPotyScoreNetFailure() {
  return {
    type: GET_POTY_SCORE_NET.FAILURE
  };
}
