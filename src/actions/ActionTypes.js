// @flow
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const CANCEL = "CANCEL";
const FAILURE = "FAILURE";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const NETWORK_INFO = "NETWORK_INFO";
export const USER_SIGNUP = createRequestTypes("USER_SIGNUP");
export const USER_SIGNIN = createRequestTypes("USER_SIGNIN");
export const USER_SIGNOUT = createRequestTypes("USER_SIGNOUT");
export const UPDATE_USER_PROFILE = createRequestTypes("UPDATE_USER_PROFILE");
export const USER_FORGOT_PASSWORD = createRequestTypes("USER_FORGOT_PASSWORD");
export const USER_CONFIRM_OTP_FGPASS = createRequestTypes(
  "USER_CONFIRM_OTP_FGPASS"
);
export const GET_POTY_TOURNAMENT = createRequestTypes("GET_POTY_TOURNAMENT");
export const SET_SELECTED_TABS = "SET_SELECTED_TABS";
export const SET_TABBAR_TYPE = "SET_TABBAR_TYPE";
export const TOGGLE_TABBAR = "TOGGLE_TABBAR";
export const LOGOUT = "LOGOUT";
export const EMPTY = createRequestTypes("EMPTY");
export const GET_NEWS = createRequestTypes("GET_NEWS");
export const GET_POTY_LEADERBOARD = createRequestTypes("GET_POTY_LEADERBOARD");
