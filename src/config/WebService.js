import _ from "lodash";
import Util from "../util";

export const BASE_URL = "http://legend.livewireapps.info/public/api/"//"https://legendstourgolf.com/api/";

export const API_TIMEOUT = 20000;//30000;

// API USER ROUTES
export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: "Something went wrong, Please try again later",
  error: "Something went wrong, Please try again later"
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: "Please connect to the working Internet",
  error: "Please connect to the worhking Internet"
};

export const ERROR_TOKEN_EXPIRE = {
  message: "Session Expired, Please login again!",
  error: "Session Expired, Please login again!"
};
export const ERROR_REQUEST_TIMEOUT = {
  message: "Request timeout, Please connect to the working Internet",
  error: "Request timeout, Please connect to the working Internet"
};

export const REQUEST_TYPE = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PUT: "put"
};

// API USER ROUTES

export const USER_SIGNIN = {
  route: "auth/signin",
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const USER_FORGOT_PASSWORD = {
  route: "password/email",
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

// API DASHBOARD ROUTES

export const GET_DASHBOARD_DATA = {
  route: "DashboardData",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

// API TOURNAMENTS ROUTES

export const GET_POTY_TOURNAMENT = {
  route: "GetPotyTournaments",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_NEWS = {
  route: "GetNews",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_Sponsors = {
  route: "getsponsors",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_POTY_LEADERBOARD = {
  route: "GetPotyLeaderboard",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_LCL_POINTS_TABLE = {
  route: "GetLCLLeaderboard",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_LCL_MONTHLY_MATCHES = {
  // route: "GetLCLMatches",
  route: "GetLCLMatches_1",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_LMP_RESULTS = {
  route: "GetLMPLeaderboard",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_DMP_RESULTS = {
  route: "GetDMPLeaderboard",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_USER_PROFILE = {
  route: "GetProfile_1",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_POTY_SCORE_NET = {
  route: "GetScoresPotyNet",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_POTY_SCORE_GROSS = {
  route: "GetScoresPotyGross",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const USER_SIGNOUT = {
  route: "logout",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

// API ENTER SCORE ROUTES

export const GET_ENTER_SCORE_DATA_POTY = {
  route: "GetHoleDataForTournament",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};
// GetHoleDataForTournament($tournament_type, $tournament_id,$date, $schedule_id, $match_id)
export const GET_ENTER_SCORE_DATA_LCL = {
  route: "GetHoleDataForTournament",//"GetHoleDataForLclTournament"
  access_token_required: true,
  type: REQUEST_TYPE.GET
};
export const GET_ENTER_SCORE_DATA_LMP = {
  route: "GetHoleDataForTournament", //"GetHoleDataForLmpTournament",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};
export const GET_ENTER_SCORE_DATA_DMP = {
  route: "GetHoleDataForTournament",// "GetHoleDataForDmpTournament",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_LIVE_DATA = {
  route: "LiveData_1",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};


//////////////////   SCHEDULING PLAYERS  //////////////////////

export const GET_SCHEDULE_DATA_URL = {
  route: "get_Schdule_Players",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};


/////////////////////////   SCHEDULING PLAYERS          //////////////////////////


export const GET_SCORE_LCL_SINGLES1 = {
  route: "GetScoresLCLSingles1",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const POST_POTY_SCORE = {
  route: "EnterPotyScore",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const POST_LCL_SCORE = {
  route: "EnterScoreLCL",
  access_token_required: true,
  type: REQUEST_TYPE.POST //03155485907
};
export const POST_LMP_SCORE = {
  route: "EnterScoreLMP",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const POST_DMP_SCORE = {
  route: "EnterScoreDMP",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const GET_SCORE_LCL_SINGLES2 = {
  route: "GetScoresLCLSingles2",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_SCORE_LCL_FOURSOME = {
  route: "GetScoresLCLFoursome",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_SCORE_DMP = {
  route: "GetScoresDMP",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_SCORE_LMP = {
  route: "GetScoresLMP",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const UPLOAD_USER_IMAGE = {
  route: "UpdateProfilePicture",
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
// API SCORE CARD

export const GET_POTY_USER_SCORE_CARD = {
  route: "GetPotyScorecard",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};
export const GET_HOLE_DATA_FOR_TOURNAMENT = {
  route: "GetHoleDataForTournament",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_POTY_GROUP_SCORCARD = {
  route: "GetPotyGroupScorecard",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};
export const GET_LMP_GROUP_SCORCARD = {
  route: "GetLMPFullScorecard",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_DMP_GROUP_SCORCARD = {
  route: "GetDMPFullScorecard",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_LCL_GROUP_SCORCARD = {
  route: "GetLCLFullScorecard",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

// PLAYERS DIRECTORY
export const GET_PLAYERS_DIRECTORY = {
  route: "GetAllPlayers_1",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

// NOTIFICATIONS
export const GET_NOTIFICATIONS = {
  route: "GetNotifications",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const MARK_NOTIFICATIONS_AS_READ = {
  route: "GetNotifications/MarkAllAsRead",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const DELETE_ALL_NOTIFICATIONS = {
  route: "DeleteAllNotifications",
  access_token_required: true,
  type: REQUEST_TYPE.DELETE
};

export const DELETE_NOTIFICATION = {
  route: "GetNotifications",
  access_token_required: true,
  type: REQUEST_TYPE.DELETE
};


export const callRequest = function (
  url,
  data,
  parameter,
  header = {},
  ApiSauce,
  baseUrl = BASE_URL
) {
  // note, import of "ApiSause" has some problem, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    const _access_token = Util.getCurrentUserAccessToken();
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `${_access_token}`
        }
      };
    }
  }

  const _url =
    parameter && !_.isEmpty(parameter)
      ? `${url.route}/${parameter}`
      : url.route;

  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};
