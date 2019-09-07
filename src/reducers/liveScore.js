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
  lmp: {},
  lmpFetching: false,
  dmp: {},
  dmpFetching: false,

  poty: {
    net: [],
    isFetchingNet: false,
    gross: [],
    isFetchingGross: false
  },

  lcl: {
    singlesOne: {},
    singlesTwo: {},
    fourSome: {},
    isFetchingSinglesOne: {},
    isFetchingSinglesTwo: {},
    isFetchingFourSome: {},
    isLodedOnceSinglesOne: {},
    isLodedOnceSinglesTwo: {},
    isLodedOnceFourSome: {}
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
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.isFetchingSinglesOne = true;
      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case GET_SCORE_LCL_SINGLES1.SUCCESS: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.isFetchingSinglesOne = false;
      tempLcl.isLodedOnceSinglesOne = true;
      tempLcl.singlesOne = action.data;

      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case GET_SCORE_LCL_SINGLES1.FAILURE: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.isFetchingSinglesOne = false;
      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case GET_SCORE_LCL_SINGLES2.REQUEST: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.isFetchingSinglesTwo = true;
      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case GET_SCORE_LCL_SINGLES2.SUCCESS: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.isFetchingSinglesTwo = false;
      tempLcl.isLodedOnceSinglesTwo = true;
      tempLcl.singlesTwo = action.data;

      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case GET_SCORE_LCL_SINGLES2.FAILURE: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.isFetchingSinglesTwo = false;
      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case GET_SCORE_LCL_FOURSOME.REQUEST: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.isFetchingFourSome = true;
      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case GET_SCORE_LCL_FOURSOME.SUCCESS: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.isFetchingFourSome = false;
      tempLcl.isLodedOnceFourSome = true;
      tempLcl.fourSome = action.data;

      return Immutable.merge(state, {
        lcl: tempLcl
      });
    }

    case GET_SCORE_LCL_FOURSOME.FAILURE: {
      const tempLcl = _.cloneDeep(state.lcl);
      tempLcl.isFetchingFourSome = false;
      return Immutable.merge(state, {
        lcl: tempLcl
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
