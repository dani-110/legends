// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import {
  GET_ENTER_SCORE_POLLING_DATA,
  GET_ENTER_SCORE_DATA,
  POST_POTY_SCORE
} from "../actions/ActionTypes";

const initialState = Immutable({
  data: {
    isFetchingData: true,
    holeData: {}
  }
});

export default (state = initialState, action) => {

  //debugger;
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

    case GET_ENTER_SCORE_DATA.SUCCESS: {
      const tempData = _.cloneDeep(state.data);
      tempData.holeData = action.data;
      debugger;
      // if (_.isEmpty(tempData.holeData)) {
      //   tempData.holeData = action.data;
      // } else {
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
      // debugger
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
