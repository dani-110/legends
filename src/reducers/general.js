// @flow
import Immutable from "seamless-immutable";
import { SET_SELECTED_TABS } from "../actions/ActionTypes";

const initialState = Immutable({
  selectedIndex: 1
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TABS: {
      return Immutable.merge(state, {
        selectedIndex: action.selectedIndex
      });
    }

    default:
      return state;
  }
};
