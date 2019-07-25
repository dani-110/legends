// @flow

import {
  SET_SELECTED_TABS,
  ENABLE_ENTER_SCORE,
  SET_TABBAR_TYPE,
  TOGGLE_TABBAR,
  GET_DASHBOARD_DATA
} from "./ActionTypes";

export function setSelectedTab(selectedIndex) {
  return {
    selectedIndex,
    type: SET_SELECTED_TABS
  };
}

export function setTabbarType(tabbarType) {
  return {
    tabbarType,
    type: SET_TABBAR_TYPE
  };
}

export function toggleTabbar(showTabbar) {
  return {
    showTabbar,
    type: TOGGLE_TABBAR
  };
}

export function getDashboardDataRequest(data) {
  return {
    data,
    type: GET_DASHBOARD_DATA.REQUEST
  };
}

export function getDashboardDataSuccess(data) {
  return {
    data,
    type: GET_DASHBOARD_DATA.SUCCESS
  };
}

export function getDashboardDataFailure(data) {
  return {
    data,
    type: GET_DASHBOARD_DATA.FAILURE
  };
}

export function enableEnterScore(data) {
  return {
    data,
    type: ENABLE_ENTER_SCORE.SUCCESS
  };
}
