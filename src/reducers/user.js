// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import { USER_SIGNIN, GET_USER_PROFILE } from "../actions/ActionTypes";

const initialState = Immutable({
  data: {
    handicap: 9.6,
    scores: {
      blue: { value: 10, suffix: "" },
      white: { value: 9, suffix: "" },
      fir: { value: 30.6, suffix: "%" },
      gir: { value: 28.6, suffix: "%" },
      ppr: { value: 30.14, suffix: "" }
    },
    grossScoreTrend: [
      {
        month: new Date(2015, 0, 1),
        data1: 3840,
        data2: 1920,
        data3: 960,
        data4: 400
      },
      {
        month: new Date(2015, 1, 1),
        data1: 1600,
        data2: 1440,
        data3: 960,
        data4: 400
      },
      {
        month: new Date(2015, 2, 1),
        data1: 640,
        data2: 960,
        data3: 3640,
        data4: 400
      },
      {
        month: new Date(2015, 3, 1),
        data1: 3320,
        data2: 480,
        data3: 640,
        data4: 400
      }
    ],
    trendingHandicap: [
      {
        month: new Date(2015, 3, 1),
        data1: 3320,
        data2: 480,
        data3: 640,
        data4: 400
      },
      {
        month: new Date(2015, 1, 1),
        data1: 1600,
        data2: 1440,
        data3: 960,
        data4: 400
      },
      {
        month: new Date(2015, 2, 1),
        data1: 640,
        data2: 960,
        data3: 3640,
        data4: 400
      },
      {
        month: new Date(2015, 0, 1),
        data1: 3840,
        data2: 1920,
        data3: 960,
        data4: 400
      }
    ]
  },
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

    default:
      return state;
  }
};
