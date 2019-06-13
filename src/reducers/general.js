// @flow
import Immutable from "seamless-immutable";
import { SET_SELECTED_TABS, SET_TABBAR_TYPE } from "../actions/ActionTypes";

const initialState = Immutable({
  selectedIndex: 1,
  defaultTabbar: true
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TABS: {
      return Immutable.merge(state, {
        selectedIndex: action.selectedIndex
      });
    }

    case SET_TABBAR_TYPE: {
      return Immutable.merge(state, {
        defaultTabbar: action.tabbarType
      });
    }

    default:
      return state;
  }
};
