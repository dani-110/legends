// @flow

import { TOURNAMENT_POTY } from "./ActionTypes";

export function getPotyTournamentRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: TOURNAMENT_POTY.REQUEST
  };
}

export function getPotyTournamentSuccess(data) {
  return {
    data,
    type: TOURNAMENT_POTY.SUCCESS
  };
}
