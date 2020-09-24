// @flow

import { GET_SPONSORS } from "./ActionTypes";

export function getSponserRequest() {
  console.log("calling sponsor");
  return {
    type: GET_SPONSORS.REQUEST
  };
}

export function getSponserSuccess(data) {
  return {
    data,
    type: GET_SPONSORS.SUCCESS
  };
}

export function getSponserFailure() {
  return {
    type: GET_SPONSORS.FAILURE
  };
}
