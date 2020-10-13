// @flow

import { GET_PLAYERS_DIRECTORY } from "./ActionTypes";

export function getPlayersDirectoryRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_PLAYERS_DIRECTORY.REQUEST
  };
}

export function getPlayersDirectorySuccess(data) {
  return {
    data,
    type: GET_PLAYERS_DIRECTORY.SUCCESS
  };
}

export function getPlayersDirectoryFailure() {
  return {
    type: GET_PLAYERS_DIRECTORY.FAILURE
  };
}
