// @flow

import {
  SET_SELECTED_TABS,
  SET_TABBAR_TYPE,
  TOGGLE_TABBAR
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
