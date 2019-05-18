// @flow
import Immutable from "seamless-immutable";
import moment from "moment";

import { USER_SIGNIN } from "../actions/ActionTypes";

const initialState = Immutable({
  data: [
    {
      description: "POTY match play results announced",
      unread: true
    },
    {
      description: "POTY match play results announced",
      unread: true
    },
    {
      description: "POTY match play results announced",
      unread: false
    },
    {
      description: "POTY match play results announced",
      unread: false
    },
    {
      description: "POTY match play results announced",
      unread: false
    },
    {
      description: "POTY match play results announced",
      unread: true
    },
    {
      description: "POTY match play results announced",
      unread: true
    },
    {
      description: "POTY match play results announced",
      unread: false
    },
    {
      description: "POTY match play results announced",
      unread: false
    },
    {
      description: "POTY match play results announced",
      unread: false
    },
    {
      description: "POTY match play results announced",
      unread: true
    },
    {
      description: "POTY match play results announced",
      unread: true
    },
    {
      description: "POTY match play results announced",
      unread: false
    },
    {
      description: "POTY match play results announced",
      unread: false
    },
    {
      description: "POTY match play results announced",
      unread: false
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
