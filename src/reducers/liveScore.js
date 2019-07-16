// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";

import {
  GET_POTY_SCORE_NET,
  GET_POTY_SCORE_GROSS,
  USER_SIGNOUT
} from "../actions/ActionTypes";

const initialState = Immutable({
  lclSinglesOne: {
    team: [
      {
        name: "Kitty Mafia",
        score: "3.5"
      },
      {
        name: "Dark Knights",
        score: "2.5"
      }
    ],
    players: [["Adnan Afridi"], ["Navaid Ali"]],
    score: [
      {
        par: 4,
        playerOne: 4,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 5,
        playerOne: 5,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 3,
        playerOne: 2,
        playerTwo: 3,
        score: "2UP",
        scoredBy: 1
      },
      {
        par: 5,
        playerOne: 6,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 4,
        playerOne: 4,
        playerTwo: 3,
        score: "AS",
        scoredBy: null
      },
      {
        par: 4,
        playerOne: 4,
        playerTwo: 3,
        score: "1UP",
        scoredBy: 2
      }
    ]
  },
  lclFoursome: {
    team: [
      {
        name: "Kitty Mafia",
        score: "3.5"
      },
      {
        name: "Dark Knights",
        score: "2.5"
      }
    ],
    players: [["Adnan Afridi", "Ahmed Ismail"], ["Navaid Ali", "Saad Ali"]],
    score: [
      {
        par: 4,
        playerOne: 4,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 5,
        playerOne: 5,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 3,
        playerOne: 2,
        playerTwo: 3,
        score: "2UP",
        scoredBy: 1
      },
      {
        par: 5,
        playerOne: 6,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 4,
        playerOne: 4,
        playerTwo: 3,
        score: "AS",
        scoredBy: null
      },
      {
        par: 4,
        playerOne: 4,
        playerTwo: 3,
        score: "1UP",
        scoredBy: 2
      }
    ]
  },
  lclSinglesTwo: {
    team: [
      {
        name: "Dark Knights",
        score: "2.5"
      },
      {
        name: "Kitty Mafia",
        score: "3.5"
      }
    ],
    players: [["Navaid Ali"], ["Adnan Afridi"]],
    score: [
      {
        par: 3,
        playerOne: 2,
        playerTwo: 3,
        score: "2UP",
        scoredBy: 1
      },
      {
        par: 5,
        playerOne: 6,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 4,
        playerOne: 4,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 5,
        playerOne: 5,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 4,
        playerOne: 4,
        playerTwo: 3,
        score: "AS",
        scoredBy: null
      },
      {
        par: 4,
        playerOne: 4,
        playerTwo: 3,
        score: "1UP",
        scoredBy: 2
      }
    ]
  },
  lmp: {
    players: [["Adnan Afridi"], ["Navaid Ali"]],
    score: [
      {
        par: 4,
        playerOne: 4,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 5,
        playerOne: 5,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 3,
        playerOne: 2,
        playerTwo: 3,
        score: "2UP",
        scoredBy: 1
      },
      {
        par: 5,
        playerOne: 6,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 4,
        playerOne: 4,
        playerTwo: 3,
        score: "AS",
        scoredBy: null
      },
      {
        par: 4,
        playerOne: 4,
        playerTwo: 3,
        score: "1UP",
        scoredBy: 2
      }
    ]
  },
  dmp: {
    players: [["Adnan Afridi", "Ahmed Ismail"], ["Navaid Ali", "Saad Ali"]],
    score: [
      {
        par: 4,
        playerOne: 4,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 5,
        playerOne: 5,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 3,
        playerOne: 2,
        playerTwo: 3,
        score: "2UP",
        scoredBy: 1
      },
      {
        par: 5,
        playerOne: 6,
        playerTwo: 5,
        score: "1UP",
        scoredBy: 1
      },
      {
        par: 4,
        playerOne: 4,
        playerTwo: 3,
        score: "AS",
        scoredBy: null
      },
      {
        par: 4,
        playerOne: 4,
        playerTwo: 3,
        score: "1UP",
        scoredBy: 2
      }
    ]
  },
  poty: {
    net: [],
    isFetchingNet: false,
    gross: [],
    isFetchingGross: false
  },
  potyy: [
    {
      number: "1",
      name: "Khurram Khan",
      score: null,
      toPar: -2,
      thru: "2"
    },
    {
      number: "T2",
      name: "Azhar Haji",
      score: null,
      toPar: -2,
      thru: "2"
    },
    {
      number: "T2",
      name: "Aamer Badshah",
      score: null,
      toPar: -1,
      thru: "2"
    },
    {
      number: "T2",
      name: "Saleem Adil",
      score: null,
      toPar: -1,
      thru: "2"
    },
    {
      number: "T2",
      name: "Mustajab Gohar",
      score: 71,
      toPar: -1,
      thru: "F"
    },
    {
      number: "T2",
      name: "Tariq Feroz",
      score: 71,
      toPar: -1,
      thru: "F"
    },
    {
      number: "T5",
      name: "Danish Iqbal",
      score: 72,
      toPar: "E",
      thru: "F"
    },
    {
      number: "T7",
      name: "Moji Bilal",
      score: null,
      toPar: "E",
      thru: 1
    },
    {
      number: null,
      name: "Najeeb Baig",
      score: 76,
      toPar: +4,
      thru: "F"
    }
  ]
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POTY_SCORE_NET.REQUEST: {
      const tempPoty = _.cloneDeep(state.poty);
      tempPoty.isFetchingNet = true;
      return Immutable.merge(state, {
        poty: tempPoty
      });
    }

    case GET_POTY_SCORE_NET.SUCCESS: {
      const tempPoty = _.cloneDeep(state.poty);
      tempPoty.net = action.data;
      tempPoty.isFetchingNet = false;
      return Immutable.merge(state, {
        poty: tempPoty
      });
    }

    case GET_POTY_SCORE_NET.FAILURE: {
      const tempPoty = _.cloneDeep(state.poty);
      tempPoty.isFetchingNet = false;
      return Immutable.merge(state, {
        poty: tempPoty
      });
    }

    case GET_POTY_SCORE_GROSS.REQUEST: {
      const tempPoty = _.cloneDeep(state.poty);
      tempPoty.isFetchingGross = true;
      return Immutable.merge(state, {
        poty: tempPoty
      });
    }

    case GET_POTY_SCORE_GROSS.SUCCESS: {
      const tempPoty = _.cloneDeep(state.poty);
      tempPoty.gross = action.data;
      tempPoty.isFetchingGross = false;
      return Immutable.merge(state, {
        poty: tempPoty
      });
    }

    case GET_POTY_SCORE_GROSS.FAILURE: {
      const tempPoty = _.cloneDeep(state.poty);
      tempPoty.isFetchingGross = false;
      return Immutable.merge(state, {
        poty: tempPoty
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
