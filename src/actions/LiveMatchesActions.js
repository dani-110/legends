// @flow

import {
  GET_POTY_SCORE_NET,
  GET_POTY_SCORE_GROSS,
  GET_LIVE_DATA
} from "./ActionTypes";

export function getPotyScoreNetRequest() {
  return {
    type: GET_POTY_SCORE_NET.REQUEST
  };
}

export function getPotyScoreNetSuccess(data) {
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

export function getLivedataRequest() {
  return {
    type: GET_LIVE_DATA.REQUEST
  };
}

export function getLivedataSuccess(data) {
  return {
    data,
    type: GET_LIVE_DATA.SUCCESS
  };
}

export function getLivedataFailure() {
  return {
    type: GET_LIVE_DATA.FAILURE
  };
}
