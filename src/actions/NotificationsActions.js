// @flow

import {
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  MARK_NOTIFICATIONS_AS_READ
} from "./ActionTypes";

export function getNotificationsRequest(responseCallback) {
  return {
    responseCallback,
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

export function markNotificationsReadRequest() {
  return {
    type: MARK_NOTIFICATIONS_AS_READ.REQUEST
  };
}

export function markNotificationsReadSuccess(data) {
  return {
    data,
    type: MARK_NOTIFICATIONS_AS_READ.SUCCESS
  };
}

export function markNotificationsReadFailure() {
  return {
    type: MARK_NOTIFICATIONS_AS_READ.FAILURE
  };
}

export function deleteNotificationsRequest(parameter) {
  return {
    parameter,
    type: DELETE_NOTIFICATION.REQUEST
  };
}

export function deleteNotificationsSuccess(data) {
  return {
    data,
    type: DELETE_NOTIFICATION.SUCCESS
  };
}

export function deleteNotificationsFailure() {
  return {
    type: DELETE_NOTIFICATION.FAILURE
  };
}
