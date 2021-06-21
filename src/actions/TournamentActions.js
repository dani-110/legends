// @flow

import {
  GET_POTY_TOURNAMENT,
  GET_POTY_LEADERBOARD,
  GET_LCL_POINTS_TABLE,
  GET_LCL_MONTHLY_MATCHES,
  GET_LMP_RESULTS,
  GET_DMP_RESULTS
} from "./ActionTypes";

export function getPotyTournamentRequest(payload, responseCallback) {
  //debugger
  return {
    payload,
    responseCallback,
    type: GET_POTY_TOURNAMENT.REQUEST
  };
}

export function getPotyTournamentSuccess(data) {
  //debugger
  return {
    data,
    type: GET_POTY_TOURNAMENT.SUCCESS
  };
}

export function getPotyLeaderboardRequest() {
  return {
    type: GET_POTY_LEADERBOARD.REQUEST
  };
}

export function getPotyLeaderboardSuccess(data) {
  return {
    data,
    type: GET_POTY_LEADERBOARD.SUCCESS
  };
}

export function getPotyLeaderboardFailure() {
  return {
    type: GET_POTY_LEADERBOARD.FAILURE
  };
}

export function getLclPointsTableRequest() {
  return {
    type: GET_LCL_POINTS_TABLE.REQUEST
  };
}

export function getLclPointsTableSuccess(data) {
  return {
    data,
    type: GET_LCL_POINTS_TABLE.SUCCESS
  };
}

export function getLclPointsTableFailure() {
  return {
    type: GET_LCL_POINTS_TABLE.FAILURE
  };
}

export function getLclMonthlyMatchesRequest() {
  return {
    type: GET_LCL_MONTHLY_MATCHES.REQUEST
  };
}

export function getLclMonthlyMatchesSuccess(data) {
  return {
    data,
    type: GET_LCL_MONTHLY_MATCHES.SUCCESS
  };
}

export function getLclMonthlyMatchesFailure() {
  return {
    type: GET_LCL_MONTHLY_MATCHES.FAILURE
  };
}

export function getLmpResultsRequest() {
  return {
    type: GET_LMP_RESULTS.REQUEST
  };
}

export function getLmpResultsSuccess(data) {
  return {
    data,
    type: GET_LMP_RESULTS.SUCCESS
  };
}

export function getLmpResultsFailure() {
  return {
    type: GET_LMP_RESULTS.FAILURE
  };
}

export function getDmpResultsRequest() {
  return {
    type: GET_DMP_RESULTS.REQUEST
  };
}

export function getDmpResultsSuccess(data) {
  return {
    data,
    type: GET_DMP_RESULTS.SUCCESS
  };
}

export function getDmpResultsFailure() {
  return {
    type: GET_DMP_RESULTS.FAILURE
  };
}
