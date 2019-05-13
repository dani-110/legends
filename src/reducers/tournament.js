// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import { USER_SIGNIN } from "../actions/ActionTypes";

const initialState = Immutable({
  poty_data: [
    { rank: 1, playerName: "Khurram Khan", points: "834.40", avatar: "" },
    { rank: 2, playerName: "Azhar Haji", points: "828.17", avatar: "" },
    { rank: 3, playerName: "Aamer Badshah", points: "766.72", avatar: "" },
    { rank: 4, playerName: "Saleem Adil", points: "696.00", avatar: "" },
    { rank: 5, playerName: "Mustajab Gohar", points: "660.65", avatar: "" },
    { rank: 6, playerName: "Asif Parekh", points: "592.50", avatar: "" },
    { rank: 7, playerName: "Mansoor Teli", points: "553.42", avatar: "" },
    { rank: 8, playerName: "Qumail Habib", points: "541.00", avatar: "" },
    { rank: 9, playerName: "Murtaza Ahmed", points: "521.50", avatar: "" },
    { rank: 10, playerName: "Adil Haji", points: "518.72", avatar: "" },
    { rank: 11, playerName: "Sheheryar Shah", points: "515.56", avatar: "" },
    { rank: 12, playerName: "Haider Baig", points: "508.50", avatar: "" },
    { rank: 13, playerName: "Salman Qureshi", points: "477.62", avatar: "" },
    { rank: 14, playerName: "Danish Feroz", points: "474.82", avatar: "" },
    { rank: 15, playerName: "Arshad Khan", points: "469.83", avatar: "" },
    { rank: 16, playerName: "Tariq Allawala", points: "462.00", avatar: "" },
    { rank: 17, playerName: "Ayaz Peer", points: "447.33", avatar: "" }
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
