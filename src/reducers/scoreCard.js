// @flow
import Immutable from "seamless-immutable";
import { SET_SELECTED_TABS } from "../actions/ActionTypes";

const initialState = Immutable({
  data: {
    holeNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    index: [10, 2, 14, 18, 8, 6, 12, 16, 4, 10, 2, 14, 18, 8, 6, 12, 16, 4],
    par: [4, 5, 4, 5, 4, 4, 3, 4, 4, 4, 5, 4, 3, 5, 4, 4, 3, 4],
    players: [
      {
        score: [4, 3, 3, 6, 3, 4, 4, 5, 6, 4, 10, 5, 3, 6, 0, 0, 0, ""],
        name: "Arsalan Amdani"
      },
      {
        score: [4, 5, 3, 6, 3, 4, 4, 5, 6, 4, 10, 5, 3, 6, 0, 0, 0, ""],
        name: "Asad Iqbal"
      },
      {
        score: [4, 5, 3, 6, 3, 4, 4, 5, 6, 4, 10, 5, 3, 6, 0, 0, 0, ""],
        name: "Bilal Aqleem"
      },
      {
        score: [4, 5, 3, 6, 3, 4, 4, 5, 6, 4, 10, 5, 3, 6, 0, 0, 0, ""],
        name: "Asim Siddique"
      }
    ]
  }
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TABS: {
      return Immutable.merge(state, {
        selectedIndex: action.selectedIndex
      });
    }

    default:
      return state;
  }
};
