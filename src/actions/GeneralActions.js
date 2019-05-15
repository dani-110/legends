// @flow

import { SET_SELECTED_TABS } from "./ActionTypes";

export function setSelectedTab(selectedIndex) {
  return {
    selectedIndex,
    type: SET_SELECTED_TABS
  };
}
