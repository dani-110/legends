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
export const GET_DASHBOARD_DATA = createRequestTypes("GET_DASHBOARD_DATA");
export const EMPTY = createRequestTypes("EMPTY");
export const GET_NEWS = createRequestTypes("GET_NEWS");
export const GET_SPONSORS = createRequestTypes("GET_SPONSORS");
export const GET_POTY_LEADERBOARD = createRequestTypes("GET_POTY_LEADERBOARD");
export const GET_LCL_POINTS_TABLE = createRequestTypes("GET_LCL_POINTS_TABLE");
export const GET_LCL_MONTHLY_MATCHES = createRequestTypes(
  "GET_LCL_MONTHLY_MATCHES"
);

export const GET_LMP_RESULTS = createRequestTypes("GET_LMP_RESULTS");
export const GET_DMP_RESULTS = createRequestTypes("GET_DMP_RESULTS");

export const GET_USER_PROFILE = createRequestTypes("GET_USER_PROFILE");

export const GET_POTY_SCORE_NET = createRequestTypes("GET_POTY_SCORE_NET");
export const GET_POTY_SCORE_GROSS = createRequestTypes("GET_POTY_SCORE_GROSS");

export const GET_ENTER_SCORE_POLLING_DATA = createRequestTypes(
  "GET_ENTER_SCORE_POLLING_DATA"
);
export const GET_ENTER_SCORE_DATA = createRequestTypes("GET_ENTER_SCORE_DATA");
export const UPDATE_REFRESH = "UPDATE_REFRESH"

export const POST_POTY_SCORE = createRequestTypes("POST_POTY_SCORE");
export const POST_LCL_SCORE = createRequestTypes("POST_LCL_SCORE");
export const POST_LMP_SCORE = createRequestTypes("POST_LMP_SCORE");
export const POST_DMP_SCORE = createRequestTypes("POST_DMP_SCORE");
export const GET_LIVE_DATA = createRequestTypes("GET_LIVE_DATA");
export const GET_SCORE_LCL_SINGLES1 = createRequestTypes(
  "GET_SCORE_LCL_SINGLES1"
);
export const GET_SCORE_LCL_SINGLES2 = createRequestTypes(
  "GET_SCORE_LCL_SINGLES2"
);
export const GET_SCORE_LCL_FOURSOME = createRequestTypes(
  "GET_SCORE_LCL_FOURSOME"
);
export const GET_SCORE_LMP = createRequestTypes("GET_SCORE_LMP");
export const GET_SCORE_DMP = createRequestTypes("GET_SCORE_DMP");

export const UPLOAD_USER_IMAGE = createRequestTypes("UPLOAD_USER_IMAGE");

// ScoreCard Actions
export const GET_POTY_USER_SCORE_CARD = createRequestTypes(
  "GET_POTY_USER_SCORE_CARD"
);
export const ENABLE_ENTER_SCORE = createRequestTypes("ENABLE_ENTER_SCORE");
export const GET_HOLE_DATA_FOR_TOURNAMENT = createRequestTypes(
  "GET_HOLE_DATA_FOR_TOURNAMENT"
);
export const GET_POTY_GROUP_SCORCARD = createRequestTypes(
  "GET_POTY_GROUP_SCORCARD"
);
export const GET_LCL_GROUP_SCORCARD = createRequestTypes(
  "GET_LCL_GROUP_SCORCARD"
);

export const GET_LMP_GROUP_SCORCARD = createRequestTypes(
  "GET_LMP_GROUP_SCORCARD"
);
export const GET_DMP_GROUP_SCORCARD = createRequestTypes(
  "GET_DMP_GROUP_SCORCARD"
);
// Players Directory
export const GET_PLAYERS_DIRECTORY = createRequestTypes(
  "GET_PLAYERS_DIRECTORY"
);

// Notifications
export const GET_NOTIFICATIONS = createRequestTypes("GET_NOTIFICATIONS");
export const MARK_NOTIFICATIONS_AS_READ = createRequestTypes(
  "MARK_NOTIFICATIONS_AS_READ"
);
export const DELETE_NOTIFICATION = createRequestTypes("DELETE_NOTIFICATION");
export const DELETE_ALL_NOTIFICATIONS = createRequestTypes(
  "DELETE_ALL_NOTIFICATIONS"
);

///////////////////  EDIT MATCHES      //////////////
export const GET_SCHEDULE_PLAYERS = createRequestTypes("GET_SCHEDULE_PLAYERS");