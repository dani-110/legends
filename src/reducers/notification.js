// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";

import { GET_NOTIFICATIONS, USER_SIGNOUT } from "../actions/ActionTypes";

const initialState = Immutable({
  isFetching: false,
  data: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS.REQUEST: {
      return Immutable.merge(state, {
        isFetching: true
      });
    }

    case GET_NOTIFICATIONS.SUCCESS: {
      let tempData = _.cloneDeep(state.data);
      tempData = _.unionBy(action.data, tempData, "id");
      return Immutable.merge(state, {
        data: tempData,
        isFetching: false
      });
    }

    case GET_NOTIFICATIONS.FAILURE: {
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
