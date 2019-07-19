// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import { GET_ENTER_SCORE_DATA, POST_POTY_SCORE } from "../actions/ActionTypes";

const initialState = Immutable({
  data: {
    isFetchingData: true,
    holeData: {}
  }
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTER_SCORE_DATA.REQUEST: {
      const tempData = _.cloneDeep(state.data);
      return Immutable.merge(state, {
        data: tempData
      });
    }

    case GET_ENTER_SCORE_DATA.SUCCESS: {
      const tempData = _.cloneDeep(state.data);
      tempData.holeData = action.data;
      tempData.isFetchingData = false;
      return Immutable.merge(state, {
        data: tempData
      });
    }

    case GET_ENTER_SCORE_DATA.FAILURE: {
      const tempData = _.cloneDeep(state.data);
      tempData.isFetchingData = false;
      return Immutable.merge(state, {
        data: tempData
      });
    }

    // case POST_POTY_SCORE.REQUEST: {
    //   const tempData = _.cloneDeep(state.data);
    //   tempData.isFetchingData = true;
    //   return Immutable.merge(state, {
    //     data: tempData
    //   });
    // }

    // case POST_POTY_SCORE.SUCCESS: {
    //   const tempData = _.cloneDeep(state.data);
    //   tempData.holeData = action.data;
    //   return Immutable.merge(state, {
    //     data: tempData
    //   });
    // }

    // case POST_POTY_SCORE.FAILURE: {
    //   const tempData = _.cloneDeep(state.data);
    //   return Immutable.merge(state, {
    //     data: tempData
    //   });
    // }
    default:
      return state;
  }
};
