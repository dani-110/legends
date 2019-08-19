// @flow
import Immutable from "seamless-immutable";

import { GET_PLAYERS_DIRECTORY, USER_SIGNOUT } from "../actions/ActionTypes";

const initialState = Immutable({
  isFetching: false,
  data: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYERS_DIRECTORY.REQUEST: {
      return Immutable.merge(state, {
        isFetching: true
      });
    }

    case GET_PLAYERS_DIRECTORY.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
        isFetching: false
      });
    }

    case GET_PLAYERS_DIRECTORY.FAILURE: {
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
