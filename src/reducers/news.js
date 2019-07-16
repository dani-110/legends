// @flow
import Immutable from "seamless-immutable";
import moment from "moment";

import { GET_NEWS, USER_SIGNOUT } from "../actions/ActionTypes";

const initialState = Immutable({
  isFetching: false,
  data: [
    /* {
      date: moment().subtract(1, "day"),
      image: "https://i.imgur.com/979Qn33.jpg",
      title: "News heading here",
      desc:
        "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu."
    },
    {
      date: moment().subtract(1, "day"),
      image: "https://i.imgur.com/979Qn33.jpg",
      title: "News heading here",
      desc:
        "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu."
    },
    {
      date: moment().subtract(1, "day"),
      image: "https://i.imgur.com/979Qn33.jpg",
      title: "News heading here",
      desc:
        "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu."
    },
    {
      date: moment().subtract(1, "day"),
      image: "https://i.imgur.com/979Qn33.jpg",
      title: "News heading here",
      desc:
        "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu."
    } */
  ]
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS.REQUEST: {
      return Immutable.merge(state, {
        isFetching: true
      });
    }

    case GET_NEWS.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
        isFetching: false
      });
    }

    case GET_NEWS.FAILURE: {
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
