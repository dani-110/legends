// @flow
import Immutable from "seamless-immutable";
import {
  SET_SELECTED_TABS,
  SET_TABBAR_TYPE,
  TOGGLE_TABBAR,
  GET_DASHBOARD_DATA,
  USER_SIGNOUT
} from "../actions/ActionTypes";

const initialState = Immutable({
  selectedIndex: 1,
  defaultTabbar: true,
  showTabbar: true,
  current_match: [
    {
      type: "poty",
      id: 115,
      schedule_id: "",
      match_id: "",
      tee_off_time: "11:30:00"
    }
  ]
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

    case TOGGLE_TABBAR: {
      return Immutable.merge(state, {
        showTabbar: action.showTabbar
      });
    }

    case GET_DASHBOARD_DATA.SUCCESS: {
      return Immutable.merge(state, {
        // current_match: action.data && action.data.current_match
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
