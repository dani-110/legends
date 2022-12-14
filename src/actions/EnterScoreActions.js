// @flow

import {
  GET_ENTER_SCORE_POLLING_DATA,
  GET_ENTER_SCORE_DATA,
  POST_POTY_SCORE,
  POST_LCL_SCORE,
  POST_LMP_SCORE,
  POST_DMP_SCORE,
  UPDATE_REFRESH
} from "./ActionTypes";
import Util from "../../src/util/index";

function alert(message, type = "error") {
  Util.topAlert(message, type);
}

export function getEnterScorePollingDataSuccess(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_ENTER_SCORE_POLLING_DATA.SUCCESS
  };
}

export function getEnterScoreDataRequest(payload, matchType, responseCallback) {
  return {
    payload,
    matchType,
    responseCallback,
    type: GET_ENTER_SCORE_DATA.REQUEST
  };
}

export function updateRefresh() {
  return {
    type: UPDATE_REFRESH
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

export function postPotyScoreRequest(payload, responseCallback) {
  console.log("poty1 action-->", payload + "--" + responseCallback);
  return {
    payload,
    responseCallback,
    type: POST_POTY_SCORE.REQUEST
  };
}

export function postPotyScoreSuccess(data) {
  return {
    data,
    type: POST_POTY_SCORE.SUCCESS
  };
}

export function postPotyScoreFailure() {
  console.log("poty1 action failure");
  return {
    data,
    type: POST_POTY_SCORE.FAILURE
  };
}

export function postLclScoreRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: POST_LCL_SCORE.REQUEST
  };
}

export function postLclScoreSuccess(data) {
  return {
    data,
    type: POST_LCL_SCORE.SUCCESS
  };
}

export function postLclScoreFailure(data) {
  return {
    data,
    type: POST_LCL_SCORE.FAILURE
  };
}

export function postLmpScoreRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: POST_LMP_SCORE.REQUEST
  };
}

export function postLmpScoreSuccess(data) {
  return {
    data,
    type: POST_LMP_SCORE.SUCCESS
  };
}

export function postLmpScoreFailure(data) {
  return {
    data,
    type: POST_LMP_SCORE.FAILURE
  };
}

export function postDmpScoreRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: POST_DMP_SCORE.REQUEST
  };
}

export function postDmpScoreSuccess(data) {
  return {
    data,
    type: POST_DMP_SCORE.SUCCESS
  };
}

export function postDmpScoreFailure(data) {
  return {
    data,
    type: POST_DMP_SCORE.FAILURE
  };
}
