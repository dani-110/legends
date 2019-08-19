// @flow

import { GET_NOTIFICATIONS } from "./ActionTypes";

export function getNotificationsRequest() {
  return {
    type: GET_NOTIFICATIONS.REQUEST
  };
}

export function getNotificationsSuccess(data) {
  return {
    data,
    type: GET_NOTIFICATIONS.SUCCESS
  };
}

export function getNotificationsFailure() {
  return {
    type: GET_NOTIFICATIONS.FAILURE
  };
}
