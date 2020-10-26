import {
  GET_POTY_USER_SCORE_CARD,
  GET_HOLE_DATA_FOR_TOURNAMENT,
  GET_POTY_GROUP_SCORCARD,
  GET_LCL_GROUP_SCORCARD,
  GET_LMP_GROUP_SCORCARD,
  GET_DMP_GROUP_SCORCARD,
} from "./ActionTypes";

export function getPotyUserScoreCardRequest(subroute, responseCallback) {
  return {
    subroute,
    responseCallback,
    type: GET_POTY_USER_SCORE_CARD.REQUEST
  };
}
export function getPotyUserScoreCardSuccess(data) {
  return {
    data,
    type: GET_POTY_USER_SCORE_CARD.SUCCESS
  };
}
export function getHoleDataForTournamentRequest(subroute, responseCallback) {
  debugger
  return {
    subroute,
    responseCallback,
    type: GET_HOLE_DATA_FOR_TOURNAMENT.REQUEST
  };
}
export function getPotyGroupScoreCardRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_POTY_GROUP_SCORCARD.REQUEST
  };
}

export function getLmpGroupScoreCardRequest(subroute, responseCallback) {
  return {
    subroute,
    responseCallback,
    type: GET_LMP_GROUP_SCORCARD.REQUEST
  };
}


export function getDmpGroupScoreCardRequest(subroute, responseCallback) {
  return {
    subroute,
    responseCallback,
    type: GET_DMP_GROUP_SCORCARD.REQUEST
  };
}

export function getLclGroupScoreCardRequest(subroute, responseCallback) {
  return {
    subroute,
    responseCallback,
    type: GET_LCL_GROUP_SCORCARD.REQUEST
  };
}
