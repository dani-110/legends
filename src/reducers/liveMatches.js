// @flow
import Immutable from "seamless-immutable";

import { USER_SIGNOUT, GET_LIVE_DATA } from "../actions/ActionTypes";

const initialState = Immutable({
  realData: [],
  isFetching: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIVE_DATA.REQUEST: {
      return Immutable.merge(state, {
        isFetching: true
      });
    }

    case GET_LIVE_DATA.SUCCESS: {
      return Immutable.merge(state, {
        realData: action.data,
        isFetching: false
      });
    }

    case GET_LIVE_DATA.FAILURE: {
      return Immutable.merge(state, {
        isFetching: false
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
