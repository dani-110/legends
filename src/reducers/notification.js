// @flow
import Immutable from "seamless-immutable";

import { USER_SIGNOUT } from "../actions/ActionTypes";

const initialState = Immutable({
  data: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    // case USER_SIGNIN.SUCCESS: {
    //   return Immutable.merge(state, {
    //     data: action.data
    //   });
    // }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
