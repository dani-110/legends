// @flow

import { GET_NEWS } from "./ActionTypes";

export function getNewsRequest() {
  return {
    type: GET_NEWS.REQUEST
  };
}

export function getNewsSuccess(data) {
  return {
    data,
    type: GET_NEWS.SUCCESS
  };
}

export function getNewsFailure() {
  return {
    type: GET_NEWS.FAILURE
  };
}
