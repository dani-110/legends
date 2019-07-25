// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";
import { getScoreLclSingles2Request } from "../../../actions/LiveMatchesActions";
import { ScoreTable, SimpleLoader, EmptyStateText } from "../../../components";
import ProjectedScore from "../ProjectedScore";
import Util from "../../../util";

class SinglesTwo extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.object.isRequired,
    getScoreLclSingles2Request: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    isFetchingData: PropTypes.bool.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    const {
      id,
      match_id,
      schedule_id,
      season_id,
      team1_p1,
      team2_p1
    } = this.props.data;
    this.props.getScoreLclSingles2Request(
      `${match_id}/${schedule_id}/${season_id || id}/${Util.removeSpaces(
        team1_p1
      )}/${Util.removeSpaces(team2_p1)}`
    );
  }

  _renderProjectedScore() {
    const { liveScoreData } = this.props;
    return <ProjectedScore liveScoreData={liveScoreData} />;
  }

  _renderScoreTable() {
    const { liveScoreData } = this.props;
    return <ScoreTable liveScoreData={liveScoreData} />;
  }

  render() {
    const { isFetchingData, liveScoreData } = this.props;

    return (
      <View style={styles.container}>
        {_.isEmpty(liveScoreData) && !isFetchingData && <EmptyStateText />}

        {isFetchingData && <SimpleLoader />}

        {!isFetchingData &&
          !_.isEmpty(liveScoreData) &&
          this._renderProjectedScore()}

        {!isFetchingData &&
          !_.isEmpty(liveScoreData) &&
          this._renderScoreTable()}
      </View>
    );
  }
}

const mapStateToProps = ({ liveScore }) => ({
  liveScoreData: liveScore.lclSinglesTwo,
  isFetchingData: liveScore.lclSinglesTwoFetching
});

const actions = { getScoreLclSingles2Request };

export default connect(
  mapStateToProps,
  actions
)(SinglesTwo);
