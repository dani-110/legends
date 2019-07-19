// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { getScoreLclFoursomeRequest } from "../../../actions/LiveMatchesActions";
import styles from "./styles";
import { ScoreTable, SimpleLoader, EmptyStateText } from "../../../components";
import ProjectedScore from "../ProjectedScore";

class Foursome extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.object.isRequired,
    getScoreLclFoursomeRequest: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    isFetchingData: PropTypes.bool.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    const { match_id, schedule_id, season_id } = this.props.data;
    this.props.getScoreLclFoursomeRequest(
      `${match_id}/${schedule_id}/${season_id}`
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
  liveScoreData: liveScore.lclFoursome,
  isFetchingData: liveScore.lclFoursomeFetching
});

const actions = { getScoreLclFoursomeRequest };

export default connect(
  mapStateToProps,
  actions
)(Foursome);
