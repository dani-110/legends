import { GET_POTY_USER_SCORE_CARD } from "./ActionTypes";

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
