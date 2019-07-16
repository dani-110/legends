import _ from "lodash";
import Util from "../util";

export const BASE_URL = "https://legendstourgolf.com/api/";

export const API_TIMEOUT = 30000;

// API USER ROUTES
export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: "Something went wrong, Please try again later",
  error: "Something went wrong, Please try again later"
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: "Please connect to the working Internet",
  error: "Please connect to the working Internet"
};

export const ERROR_TOKEN_EXPIRE = {
  message: "Session Expired, Please login again!",
  error: "Session Expired, Please login again!"
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
  route: "GetLCLMatches",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const GET_USER_PROFILE = {
  route: "GetProfile",
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const callRequest = function(
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
