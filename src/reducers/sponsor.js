// @flow
import Immutable from "seamless-immutable";
import moment from "moment";

import { GET_SPONSORS, USER_SIGNOUT } from "../actions/ActionTypes";

const initialState = Immutable({
  isFetching: false,
  data: [

  ]
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SPONSORS.REQUEST: {
      return Immutable.merge(state, {
        isFetching: true
      });
    }

    case GET_SPONSORS.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
        isFetching: false
      });
    }

    case GET_SPONSORS.FAILURE: {
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
