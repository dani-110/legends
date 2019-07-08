// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import {
  GET_POTY_TOURNAMENT,
  GET_POTY_LEADERBOARD
} from "../actions/ActionTypes";

const initialState = Immutable({
  poty: {
    leaderboard: [
      /* {
        rank: 1,
        playerName: "Khurram Khan",
        points: "834.40",
        avatar: "https://i.imgur.com/7pjbc76.png"
      },
      {
        rank: 2,
        playerName: "Azhar Haji",
        points: "828.17",
        avatar: "https://i.imgur.com/p4gZTpc.png"
      },
      {
        rank: 3,
        playerName: "Aamer Badshah",
        points: "766.72",
        avatar: "https://i.imgur.com/7pjbc76.png"
      },
      {
        rank: 4,
        playerName: "Saleem Adil",
        points: "696.00",
        avatar: "https://i.imgur.com/p4gZTpc.png"
      },
      {
        rank: 5,
        playerName: "Mustajab Gohar",
        points: "660.65",
        avatar: "https://i.imgur.com/7pjbc76.png"
      },
      {
        rank: 6,
        playerName: "Asif Parekh",
        points: "592.50",
        avatar: "https://i.imgur.com/p4gZTpc.png"
      },
      {
        rank: 7,
        playerName: "Mansoor Teli",
        points: "553.42",
        avatar: "https://i.imgur.com/7pjbc76.png"
      },
      {
        rank: 8,
        playerName: "Qumail Habib",
        points: "541.00",
        avatar: "https://i.imgur.com/p4gZTpc.png"
      },
      {
        rank: 9,
        playerName: "Murtaza Ahmed",
        points: "521.50",
        avatar: "https://i.imgur.com/p4gZTpc.png"
      },
      {
        rank: 10,
        playerName: "Adil Haji",
        points: "518.72",
        avatar: "https://i.imgur.com/7pjbc76.png"
      },
      {
        rank: 11,
        playerName: "Sheheryar Shah",
        points: "515.56",
        avatar: "https://i.imgur.com/p4gZTpc.png"
      },
      {
        rank: 12,
        playerName: "Haider Baig",
        points: "508.50",
        avatar: "https://i.imgur.com/7pjbc76.png"
      },
      {
        rank: 13,
        playerName: "Salman Qureshi",
        points: "477.62",
        avatar: "https://i.imgur.com/p4gZTpc.png"
      },
      {
        rank: 14,
        playerName: "Danish Feroz",
        points: "474.82",
        avatar: "https://i.imgur.com/7pjbc76.png"
      },
      {
        rank: 15,
        playerName: "Arshad Khan",
        points: "469.83",
        avatar: "https://i.imgur.com/p4gZTpc.png"
      },
      {
        rank: 16,
        playerName: "Tariq Allawala",
        points: "462.00",
        avatar: "https://i.imgur.com/7pjbc76.png"
      },
      {
        rank: 17,
        playerName: "Ayaz Peer",
        points: "447.33",
        avatar: "https://i.imgur.com/p4gZTpc.png"
      } */
    ],
    tournaments: [],
    isFetchingLeaderboard: false
  },
  lcl: {
    pointsTable: [
      {
        position: 1,
        team: "Angry Birds",
        points: 32
      },
      {
        position: 2,
        team: "Honey Badgers",
        points: 26.5
      },
      {
        position: 3,
        team: "Kitty Mafia",
        points: 23
      },
      {
        position: 4,
        team: "Magnificient 8",
        points: 22.5
      },
      {
        position: 5,
        team: "Dark Knight",
        points: 21.5
      },
      {
        position: 6,
        team: "Great White Sharks",
        points: 19
      },
      {
        position: 7,
        team: "MIFOS",
        points: 14.5
      }
    ],
    monthlyMatches: [
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
    ]
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

    default:
      return state;
  }
};
