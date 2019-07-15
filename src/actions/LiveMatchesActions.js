// @flow

import { GET_POTY_SCORE_NET, GET_POTY_SCORE_GROSS } from "./ActionTypes";

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

export function getPotyScoreGrossRequest() {
  return {
    type: GET_POTY_SCORE_GROSS.REQUEST
  };
}

export function getPotyScoreGrossSuccess(data) {
  console.log("I was here", data);
  return {
    data,
    type: GET_POTY_SCORE_GROSS.SUCCESS
  };
}

export function getPotyScoreGrossFailure() {
  return {
    type: GET_POTY_SCORE_GROSS.FAILURE
  };
}
