// @flow
import _ from "lodash";
import Immutable from "seamless-immutable";
import {
  USER_SIGNIN,
  GET_USER_PROFILE,
  USER_SIGNOUT,
  UPLOAD_USER_IMAGE
} from "../actions/ActionTypes";

const initialState = Immutable({
  profileData: {},
  isFetchingProfileData: false,
  userData: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN.SUCCESS: {
      return Immutable.merge(state, {
        userData: action.data
      });
    }

    case GET_USER_PROFILE.REQUEST: {
      return Immutable.merge(state, {
        isFetchingProfileData: true
      });
    }

    case GET_USER_PROFILE.SUCCESS: {
      return Immutable.merge(state, {
        isFetchingProfileData: false,
        profileData: action.data
      });
    }

    case GET_USER_PROFILE.FAILURE: {
      return Immutable.merge(state, {
        isFetchingProfileData: false
      });
    }

    case UPLOAD_USER_IMAGE.SUCCESS: {
      const tempProfile = _.cloneDeep(state.profileData);

      return Immutable.merge(state, {
        isFetchingProfileData: true,
        profileData: { ...tempProfile, ...{ picture: action.url } }
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
