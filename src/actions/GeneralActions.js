// @flow

import { SET_SELECTED_TABS, SET_TABBAR_TYPE } from "./ActionTypes";

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
