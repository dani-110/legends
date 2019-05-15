// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import { USER_SIGNIN } from "../actions/ActionTypes";

const initialState = Immutable({
  data: {
    handicap: 9.6,
    scores: {
      blue: 10,
      white: 9,
      fir: "30.6%",
      gir: "28.6%",
      ppr: 30.14
    }
  }
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data
      });
    }

    default:
      return state;
  }
};
