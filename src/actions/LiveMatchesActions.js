// @flow

import {
  GET_POTY_SCORE_NET,
  GET_POTY_SCORE_GROSS,
  GET_LIVE_DATA,
  GET_SCORE_LCL_SINGLES1,
  GET_SCORE_LCL_SINGLES2,
  GET_SCORE_LCL_FOURSOME,
  GET_SCORE_DMP,
  GET_SCORE_LMP,
  GET_SCHEDULE_PLAYERS,
} from "./ActionTypes";

export function getPotyScoreNetRequest(subroute, responseCallback) {
  return {
    subroute,
    responseCallback,
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
  debugger
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

  debugger

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

/////////////////////  SCHEDULING //////////////////////
export function getScheduleMatchesRequest(payload, responseCallback) {
  return {
    responseCallback,
    type: GET_SCHEDULE_PLAYERS.REQUEST,
    payload
  };
}

export function getScheduleMatchesSuccess(data) {

  console.log("actions--->", data)
  debugger
  return {
    data,
    type: GET_SCHEDULE_PLAYERS.SUCCESS
  };
}

export function getScheduleMatchesFailure() {

  debugger
  return {
    type: GET_SCHEDULE_PLAYERS.FAILURE
  };
}
////////////////////////////////////////////////////////////////

export function getScoreLclSingles1Request(subRoute, responseCallback) {
  return {
    subRoute,
    responseCallback,
    type: GET_SCORE_LCL_SINGLES1.REQUEST
  };
}

export function getScoreLclSingles1Success(data) {
  return {
    data,
    type: GET_SCORE_LCL_SINGLES1.SUCCESS
  };
}

export function getScoreLclSingles1Failure() {
  return {
    type: GET_SCORE_LCL_SINGLES1.FAILURE
  };
}

export function getScoreLclSingles2Request(subRoute, responseCallback) {
  return {
    subRoute,
    responseCallback,
    type: GET_SCORE_LCL_SINGLES2.REQUEST
  };
}

export function getScoreLclSingles2Success(data) {
  return {
    data,
    type: GET_SCORE_LCL_SINGLES2.SUCCESS
  };
}

export function getScoreLclSingles2Failure() {
  return {
    type: GET_SCORE_LCL_SINGLES2.FAILURE
  };
}

export function getScoreLclFoursomeRequest(subRoute, responseCallback) {
  return {
    subRoute,
    responseCallback,
    type: GET_SCORE_LCL_FOURSOME.REQUEST
  };
}

export function getScoreLclFoursomeSuccess(data) {
  return {
    data,
    type: GET_SCORE_LCL_FOURSOME.SUCCESS
  };
}

export function getScoreLclFoursomeFailure() {
  return {
    type: GET_SCORE_LCL_FOURSOME.FAILURE
  };
}

export function getScoreDmpRequest(subRoute) {
  return {
    subRoute,
    type: GET_SCORE_DMP.REQUEST
  };
}

export function getScoreDmpSuccess(data) {
  return {
    data,
    type: GET_SCORE_DMP.SUCCESS
  };
}

export function getScoreDmpFailure() {
  return {
    type: GET_SCORE_DMP.FAILURE
  };
}

export function getScoreLmpRequest(subRoute) {
  return {
    subRoute,
    type: GET_SCORE_LMP.REQUEST
  };
}

export function getScoreLmpSuccess(data) {
  return {
    data,
    type: GET_SCORE_LMP.SUCCESS
  };
}

export function getScoreLmpFailure() {
  return {
    type: GET_SCORE_LMP.FAILURE
  };
}
