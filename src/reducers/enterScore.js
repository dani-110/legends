// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import {
  GET_ENTER_SCORE_POLLING_DATA,
  GET_ENTER_SCORE_DATA,
  POST_POTY_SCORE, POST_LCL_SCORE,
  UPDATE_REFRESH, POST_LMP_SCORE, POST_DMP_SCORE
} from "../actions/ActionTypes";
import { NOT_SHOW_MSG, ERROR_API, REFRESH_DATA } from "../constants/index";

const initialState = Immutable({
  data: {
    isFetchingData: true,
    holeData: {}
  }
});

export default (state = initialState, action) => {
  console.log("poty1 reducer-->", action.type);

  switch (action.type) {
    case GET_ENTER_SCORE_DATA.REQUEST: {
      const tempData = _.cloneDeep(state.data);
      return Immutable.merge(state, {
        data: tempData
      });
    }

    case GET_ENTER_SCORE_POLLING_DATA.SUCCESS: {
      const tempData = _.cloneDeep(state.data);
      _.map(action.data.players, obj => {
        const playerIndex = _.findIndex(
          tempData.holeData.players,
          player => player.id === obj.id
        );

        _.map(obj.scorecard, objScore => {
          const holeIndex = _.findIndex(
            playerIndex.scorecard,
            score => score.hole_number === objScore.hole_number
          );

          if (holeIndex) {
            tempData.holeData.players[playerIndex].scorecard[
              holeIndex
            ] = objScore;
          }
        });
      });


      return Immutable.merge(state, {
        data: tempData
      });
    }

    case POST_DMP_SCORE.SUCCESS:
    case POST_LMP_SCORE.SUCCESS:
    case POST_LCL_SCORE.SUCCESS:
    case POST_POTY_SCORE.SUCCESS:
    case GET_ENTER_SCORE_DATA.SUCCESS: {

      const tempData = _.cloneDeep(state.data);
      tempData.holeData = action.data;
      tempData.named = REFRESH_DATA;

      _.map(action.data.players, obj => {
        const playerIndex = _.findIndex(
          tempData.holeData.players,
          player => player.id === obj.id
        );

        _.map(obj.scorecard, objScore => {
          const holeIndex = _.findIndex(
            tempData.holeData.players[playerIndex].scorecard,
            score => score.hole_number === objScore.hole_number
          );

          if (holeIndex >= 0) {
            tempData.holeData.players[playerIndex].scorecard[
              holeIndex
            ] = objScore;
          }
        });
      });
      // }
      //debugger
      tempData.isFetchingData = false;
      return Immutable.merge(state, {
        data: tempData
      });
    }

    case POST_POTY_SCORE.FAILURE:
    case POST_DMP_SCORE.FAILURE:
    case POST_LMP_SCORE.FAILURE:
    case POST_LCL_SCORE.FAILURE:
    case GET_ENTER_SCORE_DATA.FAILURE: {
      const tempData = _.cloneDeep(state.data);
      tempData.isFetchingData = false;
      tempData.named = action.data.length > 1 ? action.data : ERROR_API
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


    // case POST_DMP_SCORE.SUCCESS:
    // case POST_LMP_SCORE.SUCCESS:
    // case POST_LCL_SCORE.SUCCESS: {
    //   const tempData = _.cloneDeep(action.data)//_.cloneDeep(state.data);
    //   tempData.named = REFRESH_DATA;
    //   debugger
    //   tempData.poty_complete = action.data;
    //   return Immutable.merge(state, {
    //     data: tempData
    //   });
    // }

    // case POST_POTY_SCORE.FAILURE:
    // case POST_DMP_SCORE.FAILURE:
    // case POST_LMP_SCORE.FAILURE:
    // case POST_LCL_SCORE.FAILURE: {
    //   const tempData = _.cloneDeep(state.data);
    //   tempData.named = action.data.length > 1 ? action.data : ERROR_API
    //   return Immutable.merge(state, {
    //     data: tempData
    //   });
    // }

    case UPDATE_REFRESH: {
      const tempData = _.cloneDeep(state.data);
      tempData.named = ""
      return Immutable.merge(state, {
        data: tempData
      })
    }

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
