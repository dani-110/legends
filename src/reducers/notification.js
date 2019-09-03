// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";

import {
  GET_NOTIFICATIONS,
  USER_SIGNOUT,
  MARK_NOTIFICATIONS_AS_READ,
  DELETE_NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS
} from "../actions/ActionTypes";

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

    case MARK_NOTIFICATIONS_AS_READ.SUCCESS: {
      let tempData = _.cloneDeep(state.data);
      for (let i = 0, l = tempData.length; i < l; i++) {
        tempData[i].read_at = true;
      }
      return Immutable.merge(state, {
        data: tempData
      });
    }

    case DELETE_NOTIFICATION.SUCCESS: {
      let tempData = _.cloneDeep(state.data);
      _.remove(tempData, n => n.id === action.data);
      return Immutable.merge(state, {
        data: tempData
      });
    }

    case DELETE_ALL_NOTIFICATIONS.SUCCESS: {
      return Immutable.merge(state, {
        data: []
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
