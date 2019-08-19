// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";

import {
  GET_POTY_SCORE_NET,
  GET_POTY_SCORE_GROSS,
  USER_SIGNOUT,
  GET_SCORE_LCL_SINGLES1,
  GET_SCORE_LCL_SINGLES2,
  GET_SCORE_LCL_FOURSOME,
  GET_SCORE_DMP,
  GET_SCORE_LMP
} from "../actions/ActionTypes";

const initialState = Immutable({
  lclSinglesOne: {},
  lclSinglesOneFetching: false,
  lclFoursome: {},
  lclFoursomeFetching: false,
  lclSinglesTwo: {},
  lclSinglesTwoFetching: false,
  lmp: {},
  lmpFetching: false,
  dmp: {},
  dmpFetching: false,

  poty: {
    net: [],
    isFetchingNet: false,
    gross: [],
    isFetchingGross: false
  }
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
      tempPoty.net = _.unionBy(action.data, tempPoty.net, "id");
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
      tempPoty.gross = _.unionBy(action.data, tempPoty.gross, "id");
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

    case GET_SCORE_LCL_SINGLES1.REQUEST: {
      return Immutable.merge(state, {
        lclSinglesOneFetching: true,
        lclSinglesOne: {}
      });
    }

    case GET_SCORE_LCL_SINGLES1.SUCCESS: {
      return Immutable.merge(state, {
        lclSinglesOneFetching: false,
        lclSinglesOne: action.data
      });
    }

    case GET_SCORE_LCL_SINGLES1.FAILURE: {
      return Immutable.merge(state, {
        lclSinglesOneFetching: false
      });
    }

    case GET_SCORE_LCL_SINGLES2.REQUEST: {
      return Immutable.merge(state, {
        lclSinglesTwoFetching: true,
        lclSinglesTwo: {}
      });
    }

    case GET_SCORE_LCL_SINGLES2.SUCCESS: {
      return Immutable.merge(state, {
        lclSinglesTwoFetching: false,
        lclSinglesTwo: action.data
      });
    }

    case GET_SCORE_LCL_SINGLES2.FAILURE: {
      return Immutable.merge(state, {
        lclSinglesTwoFetching: false
      });
    }

    case GET_SCORE_LCL_FOURSOME.REQUEST: {
      return Immutable.merge(state, {
        lclFoursomeFetching: true,
        lclFoursome: {}
      });
    }

    case GET_SCORE_LCL_FOURSOME.SUCCESS: {
      return Immutable.merge(state, {
        lclFoursomeFetching: false,
        lclFoursome: action.data
      });
    }

    case GET_SCORE_LCL_FOURSOME.FAILURE: {
      return Immutable.merge(state, {
        lclFoursomeFetching: false
      });
    }

    case GET_SCORE_DMP.REQUEST: {
      return Immutable.merge(state, {
        dmpFetching: true,
        dmp: {}
      });
    }

    case GET_SCORE_DMP.SUCCESS: {
      return Immutable.merge(state, {
        dmpFetching: false,
        dmp: action.data
      });
    }

    case GET_SCORE_DMP.FAILURE: {
      return Immutable.merge(state, {
        dmpFetching: false
      });
    }

    case GET_SCORE_LMP.REQUEST: {
      return Immutable.merge(state, {
        lmpFetching: true,
        lmp: {}
      });
    }

    case GET_SCORE_LMP.SUCCESS: {
      return Immutable.merge(state, {
        lmpFetching: false,
        lmp: action.data
      });
    }

    case GET_SCORE_LMP.FAILURE: {
      return Immutable.merge(state, {
        lmpFetching: false
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
