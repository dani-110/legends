// @flow
import Immutable from "seamless-immutable";
import moment from "moment";

import { USER_SIGNIN } from "../actions/ActionTypes";

const initialState = Immutable({
  data: [
    {
      title: "POTY",
      data: [
        {
          time: moment().toISOString(),
          title: "UMA Challenge",
          desc: "Karachi Golf Club - Red & Yellow	"
        }
      ]
    },
    {
      title: "LCL",
      data: [
        {
          time: moment().toISOString(),
          title: "AA & AI vs NA & SA",
          desc: "Kitty Mafia vs Dark Kinghts \nKarachi Golf Club - Red & Blue	"
        },
        {
          time: moment().toISOString(),
          title: "FJ & AS vs QH & NM",
          desc: "Kitty Mafia vs Dark Kinghts \nKarachi Golf Club - Red & Blue	"
        }
      ]
    },
    {
      title: "LMP",
      data: [
        {
          time: moment()
            .add(2, "hours")
            .toISOString(),
          title: "Adnan Afridi vs Navaid Ali(Semi Final)",
          desc: "DHA Golf Club - Red & Blue"
        }
      ]
    },
    {
      title: "DMP",
      data: [
        {
          time: moment().toISOString(),
          title: "RF & MB vs AP & GK(Semi Final)",
          desc: "DHA Golf Club - Red & Blue"
        }
      ]
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
