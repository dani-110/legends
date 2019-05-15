// @flow
import Immutable from "seamless-immutable";
import moment from "moment";

import { USER_SIGNIN } from "../actions/ActionTypes";

const initialState = Immutable({
  data: [
    {
      date: moment().subtract(1, "day"),
      image: "https://i.imgur.com/979Qn33.jpg",
      title: "News heading here",
      desc:
        "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu."
    }
  ]
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
