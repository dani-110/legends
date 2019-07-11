// @flow

import {
  USER_SIGNUP,
  USER_SIGNIN,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  USER_FORGOT_PASSWORD,
  GET_USER_PROFILE
} from "./ActionTypes";

export function userSignupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNUP.REQUEST
  };
}

export function userSignupSuccess(data) {
  return {
    data,
    type: USER_SIGNUP.SUCCESS
  };
}

export function userSigninRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNIN.REQUEST
  };
}

export function userSigninSuccess(data, access_token, save_token) {
  return {
    data,
    access_token,
    save_token,
    type: USER_SIGNIN.SUCCESS
  };
}

export function userSignOutRequest(responseCallback) {
  return {
    responseCallback,
    type: USER_SIGNOUT.REQUEST
  };
}

export function userSignOutSuccess() {
  return {
    type: USER_SIGNOUT.SUCCESS
  };
}

export function updateUserProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_USER_PROFILE.REQUEST
  };
}

export function updateUserProfileSuccess(data) {
  return {
    data,
    type: UPDATE_USER_PROFILE.SUCCESS
  };
}

export function forgotPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_FORGOT_PASSWORD.REQUEST
  };
}

export function getUserProfileRequest() {
  return {
    type: GET_USER_PROFILE.REQUEST
  };
}

export function getUserProfileSuccess(data) {
  return {
    data,
    type: GET_USER_PROFILE.SUCCESS
  };
}

export function getUserProfileFailure(data) {
  return {
    data,
    type: GET_USER_PROFILE.FAILURE
  };
}
