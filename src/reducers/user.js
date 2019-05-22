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
