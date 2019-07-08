// @flow

import { GET_POTY_TOURNAMENT, GET_POTY_LEADERBOARD } from "./ActionTypes";

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
