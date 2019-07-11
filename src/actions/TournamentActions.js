// @flow

import {
  GET_POTY_TOURNAMENT,
  GET_POTY_LEADERBOARD,
  GET_LCL_POINTS_TABLE
} from "./ActionTypes";

export function getPotyTournamentRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_POTY_TOURNAMENT.REQUEST
  };
}

export function getPotyTournamentSuccess(data) {
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
