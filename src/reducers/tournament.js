// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import {
  GET_POTY_TOURNAMENT,
  GET_POTY_LEADERBOARD,
  GET_LCL_POINTS_TABLE,
  GET_LCL_MONTHLY_MATCHES,
  USER_SIGNOUT
} from "../actions/ActionTypes";

const initialState = Immutable({
  poty: {
    leaderboard: [],
    tournaments: [],
    isFetchingLeaderboard: false
  },
  lcl: {
    pointsTable: [],
    monthlyMatches: [],
    monthlyMatchess: [
      {
        startTime: new Date(),
        endTime: new Date(),
        players: [
          ["Angry Birdies", "Great White Sharks"],
          ["Honey Badgers", "Dark Knights"],
          ["Magnificent 8", "MIFOS"]
        ]
      },
      {
        startTime: new Date(),
        endTime: new Date(),
        players: [
          ["Angry Birdies", "Great White Sharks"],
          ["Honey Badgers", "Dark Knights"],
          ["Kitty Mafia", "Bye"]
        ]
      },
      {
        startTime: new Date(),
        endTime: new Date(),
        players: [
          ["Angry Birdies", "Great White Sharks"],
          ["Magnificent 8", "MIFOS"],
          ["Kitty Mafia", "Bye"]
        ]
      },
      {
        startTime: new Date(),
        endTime: new Date(),
        players: [
          ["Honey Badgers", "Dark Knights"],
          ["Magnificent 8", "MIFOS"],
          ["Kitty Mafia", "Bye"]
        ]
      },
      {
        startTime: new Date(),
        endTime: new Date(),
        players: [
          ["Angry Birdies", "Great White Sharks"],
          ["Honey Badgers", "Dark Knights"],
          ["Magnificent 8", "MIFOS"]
        ]
      },
      {
        startTime: new Date(),
        endTime: new Date(),
        players: [
          ["Angry Birdies", "Great White Sharks"],
          ["Honey Badgers", "Dark Knights"],
          ["Kitty Mafia", "Bye"]
        ]
      },
      {
        startTime: new Date(),
        endTime: new Date(),
        players: [
          ["Angry Birdies", "Great White Sharks"],
          ["Magnificent 8", "MIFOS"],
          ["Kitty Mafia", "Bye"]
        ]
      },
      {
        startTime: new Date(),
        endTime: new Date(),
        players: [
          ["Honey Badgers", "Dark Knights"],
          ["Magnificent 8", "MIFOS"],
          ["Kitty Mafia", "Bye"]
        ]
      }
    ],
    isFetchingLeaderboard: false
  },
  lmp: {
    tournaments: [
      [
        [{ name: "player1", won: true }, { name: "player3", won: false }],
        [{ name: "player4", won: true }, { name: "player7", won: false }],
        [{ name: "player1", won: true }, { name: "player10", won: false }],
        [{ name: "player1", won: true }, { name: "player10", won: false }],
        [{ name: "player1", won: true }, { name: "player3", won: false }],
        [{ name: "player4", won: true }, { name: "player7", won: false }],
        [{ name: "player1", won: true }, { name: "player10", won: false }],
        [{ name: "player1", won: true }, { name: "player10", won: false }],
        [{ name: "player1", won: true }, { name: "player3", won: false }],
        [{ name: "player4", won: true }, { name: "player7", won: false }],
        [{ name: "player1", won: true }, { name: "player10", won: false }],
        [{ name: "player1", won: true }, { name: "player10", won: false }],
        [{ name: "player1", won: true }, { name: "player3", won: false }],
        [{ name: "player4", won: true }, { name: "player7", won: false }],
        [{ name: "player1", won: true }, { name: "player10", won: false }],
        [{ name: "player1", won: true }, { name: "player10", won: false }]
      ],
      [
        [{ name: "player1", won: true }, { name: "player4", won: false }],
        [{ name: "player1", won: true }, { name: "player4", won: false }],
        [{ name: "player1", won: true }, { name: "player4", won: false }],
        [{ name: "player1", won: true }, { name: "player4", won: false }],
        [{ name: "player1", won: true }, { name: "player4", won: false }],
        [{ name: "player1", won: true }, { name: "player4", won: false }],
        [{ name: "player1", won: true }, { name: "player4", won: false }],
        [{ name: "player1", won: true }, { name: "player4", won: false }]
      ],
      [
        [{ name: "player1", won: true }, { name: "player4", won: false }],
        [{ name: "player1", won: true }, { name: "player4", won: false }],
        [{ name: "player1", won: true }, { name: "player4", won: false }],
        [{ name: "player1", won: true }, { name: "player4", won: false }]
      ],
      [
        [{ name: "player1", won: true }, { name: "player4", won: false }],
        [{ name: "player1", won: true }, { name: "player4", won: false }]
      ],
      [[{ name: "player1", won: true }, { name: "player4", won: false }]],
      [[{ name: "player1", won: true }]]
    ]
  },
  dmp: {
    tournaments: [
      [
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player3", "player3"], won: false }
        ],
        [
          { name: ["player4", "player4"], won: true },
          { name: ["player7", "player7"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player10", "player10"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player10", "player10"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player3", "player3"], won: false }
        ],
        [
          { name: ["player4", "player4"], won: true },
          { name: ["player7", "player7"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player10", "player10"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player10", "player10"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player3", "player3"], won: false }
        ],
        [
          { name: ["player4", "player4"], won: true },
          { name: ["player7", "player7"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player10", "player10"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player10", "player10"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player3", "player3"], won: false }
        ],
        [
          { name: ["player4", "player4"], won: true },
          { name: ["player7", "player7"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player10", "player10"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player10", "player10"], won: false }
        ]
      ],
      [
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ]
      ],
      [
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ]
      ],
      [
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ],
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ]
      ],
      [
        [
          { name: ["player1", "player1"], won: true },
          { name: ["player4", "player4"], won: false }
        ]
      ],
      [[{ name: ["player1", "player1"], won: true }]]
    ]
  }
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POTY_TOURNAMENT.SUCCESS: {
      const tempPotyTournaments = _.cloneDeep(state.poty);
      tempPotyTournaments.tournaments = action.data;
      return Immutable.merge(state, {
        poty: tempPotyTournaments
      });
    }
    case GET_POTY_LEADERBOARD.REQUEST: {
      const tempPotyLeaderboard = _.cloneDeep(state.poty);
      tempPotyLeaderboard.isFetchingLeaderboard = true;
      return Immutable.merge(state, {
        poty: tempPotyLeaderboard
      });
    }

    case GET_POTY_LEADERBOARD.SUCCESS: {
      const tempPotyLeaderboard = _.cloneDeep(state.poty);
      tempPotyLeaderboard.leaderboard = action.data;
      tempPotyLeaderboard.isFetchingLeaderboard = false;
      return Immutable.merge(state, {
        poty: tempPotyLeaderboard
      });
    }

    case GET_POTY_LEADERBOARD.FAILURE: {
      const tempPotyLeaderboard = _.cloneDeep(state.poty);
      tempPotyLeaderboard.isFetchingLeaderboard = false;
      return Immutable.merge(state, {
        poty: tempPotyLeaderboard
      });
    }

    case GET_LCL_POINTS_TABLE.REQUEST: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.isFetchingLeaderboard = true;
      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case GET_LCL_POINTS_TABLE.SUCCESS: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.pointsTable = action.data;
      tempLcl.isFetchingLeaderboard = false;
      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case GET_LCL_POINTS_TABLE.FAILURE: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.isFetchingLeaderboard = false;
      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case GET_LCL_MONTHLY_MATCHES.REQUEST: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.isFetchingLeaderboard = true;
      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case GET_LCL_MONTHLY_MATCHES.SUCCESS: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.monthlyMatches = action.data;
      tempLcl.isFetchingLeaderboard = false;
      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case GET_LCL_MONTHLY_MATCHES.FAILURE: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.isFetchingLeaderboard = false;
      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
