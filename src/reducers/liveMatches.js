// @flow
import Immutable from "seamless-immutable";

import { USER_SIGNOUT, GET_LIVE_DATA, GET_SCHEDULE_PLAYERS } from "../actions/ActionTypes";

const initialState = Immutable({
  realData: [],
  isFetching: false,
  schedulingData: []
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

    //////////////////////////  SCHEDULING ////////////////////
    case GET_SCHEDULE_PLAYERS.REQUEST: {
      return Immutable.merge(state, {
        isFetching: true
      });
    }

    case GET_SCHEDULE_PLAYERS.SUCCESS: {
      return Immutable.merge(state, {
        schedulingData: action.data,
        isFetching: false
      });
    }

    case GET_SCHEDULE_PLAYERS.FAILURE: {
      return Immutable.merge(state, {
        isFetching: false
      });
    }

    ///////////////////////////////////////////////////////
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
