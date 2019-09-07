// @flow
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";
import { getScoreLclSingles1Request } from "../../../actions/LiveMatchesActions";
import { ScoreTable, SimpleLoader, EmptyStateText } from "../../../components";
import ProjectedScore from "../ProjectedScore";
import Util from "../../../util";
import { POLLING_TIME } from "../../../constants";

class SinglesOne extends React.Component {
  static propTypes = {
    selectedIndex: PropTypes.string.isRequired,
    liveScoreData: PropTypes.object.isRequired,
    getScoreLclSingles1Request: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    isFetchingData: PropTypes.bool.isRequired,
    isLoadedOnce: PropTypes.bool.isRequired
  };

  static defaultProps = {};

  state = {
    dataLastUpdatedOn: ""
  };

  componentWillMount() {
    this._getScoreLclSingles1Request();
    this.dataPolling = setInterval(() => {
      if (this.props.selectedIndex === 2) this._getScoreLclSingles1Request();
    }, POLLING_TIME);
  }

  componentWillUnmount() {
    clearInterval(this.dataPolling);
  }

  _getScoreLclSingles1Request() {
    const {
      id,
      match_id,
      schedule_id,
      season_id,
      team1_p1,
      team2_p1
    } = this.props.data;

    const { dataLastUpdatedOn } = this.state;
    const param = `${match_id}/${schedule_id}/${season_id ||
      id}/${Util.removeSpaces(team1_p1 || "")}/${Util.removeSpaces(
      team2_p1 || ""
    )}${dataLastUpdatedOn ? `/${dataLastUpdatedOn}` : ``}`;

    this.props.getScoreLclSingles1Request(param, data => {
      this.setState({
        dataLastUpdatedOn: moment().unix()
      });
    });
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
    const { isFetchingData, isLoadedOnce, liveScoreData } = this.props;

    return (
      <View style={styles.container}>
        {_.isEmpty(liveScoreData) && !isFetchingData && <EmptyStateText />}

        {!isLoadedOnce && <SimpleLoader />}
        {isLoadedOnce &&
          !_.isEmpty(liveScoreData) &&
          this._renderProjectedScore()}
        {isLoadedOnce && !_.isEmpty(liveScoreData) && this._renderScoreTable()}
      </View>
    );
  }
}

const mapStateToProps = ({ general, liveScore }) => ({
  liveScoreData: liveScore.lcl.singlesOne,
  isFetchingData: liveScore.lcl.isFetchingSinglesOne,
  isLoadedOnce: liveScore.lcl.isLodedOnceSinglesOne,
  selectedIndex: general.selectedIndex
});

const actions = { getScoreLclSingles1Request };

export default connect(
  mapStateToProps,
  actions
)(SinglesOne);
