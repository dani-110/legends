// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import { USER_SIGNIN } from "../actions/ActionTypes";

const initialState = Immutable({
  poty: {
    leaderboard: [
      {
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
      }
    ],
    tournaments: [
      { title: "UMA Challenge", date: "2018-08-11", status: "complete" },
      { title: "Candyland Open", date: "2018-08-11", status: "complete" },
      { title: "ATCO Invitational", date: "2018-10-20", status: "complete" },
      { title: "Engro Classic", date: "2018-12-01", status: "complete" },
      { title: "Artistic Masters", date: "2019-01-05", status: "complete" },
      { title: "NMC Classic", date: "2019-05-18", status: "pending" },
      { title: "ACT Engineering Open", date: "2019-06-23", status: "pending" }
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
