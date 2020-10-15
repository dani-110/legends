// @flow
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View, RefreshControl, ScrollView } from "react-native";
import styles from "./styles";
import { getScoreLclSingles2Request } from "../../../actions/LiveMatchesActions";
import { ScoreTable, SimpleLoader, EmptyStateText } from "../../../components";
import ProjectedScore from "../ProjectedScore";
import Util from "../../../util";
import { POLLING_TIME } from "../../../constants";

class SinglesTwo extends React.Component {
  static propTypes = {
    selectedIndex: PropTypes.string.isRequired,
    liveScoreData: PropTypes.object.isRequired,
    getScoreLclSingles2Request: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    isFetchingData: PropTypes.bool.isRequired,
    isLoadedOnce: PropTypes.bool.isRequired
  };

  static defaultProps = {};

  state = {
    dataLastUpdatedOn: ""
  };

  //////////////////////////////  INTERVALS ///////////////////////////////

  componentDidMount() {
    this.dataPolling = setInterval(() => {
      this._getScoreLclSingles2Request();
    }, POLLING_TIME);
  }

  componentWillUnmount() {
    clearInterval(this.dataPolling);
  }


  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this._getScoreLclSingles2Request()
  }


  ///////////////////////////////// INTERVALS /////////////////////////////

  componentWillMount() {
    this._getScoreLclSingles2Request();
    // this.dataPolling = setInterval(() => {
    //   if (this.props.selectedIndex === 2) this._getScoreLclSingles2Request();
    // }, POLLING_TIME);
  }

  componentWillUnmount() {
    clearInterval(this.dataPolling);
  }

  _getScoreLclSingles2Request() {
    const {
      id,
      match_id,
      schedule_id,
      season_id,
      team1_p2,
      team2_p2
    } = this.props.data;

    debugger
    const { dataLastUpdatedOn } = this.state;
    // const param = `${match_id}/${schedule_id}/${season_id ||
    //   id}/${Util.removeSpaces(team1_p1)}/${Util.removeSpaces(team2_p1)}${
    //   dataLastUpdatedOn ? `/${dataLastUpdatedOn}` : ``
    // }`;
    const param = `${match_id}/${schedule_id}/${season_id ||
      id}/${Util.removeSpaces(team1_p2)}/${Util.removeSpaces(team2_p2)}`;

    this.props.getScoreLclSingles2Request(param, data => {
      this.setState({
        dataLastUpdatedOn: moment().unix(),
        refreshing: false
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
    const { isLoadedOnce, isFetchingData, liveScoreData } = this.props;

    return (
      <View>
        {isLoadedOnce &&
          !_.isEmpty(liveScoreData) && this._renderProjectedScore()}
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          <View style={styles.container}>
            {_.isEmpty(liveScoreData) && !isFetchingData && <EmptyStateText />}

            {!isLoadedOnce && <SimpleLoader />}
            {/* {isLoadedOnce &&
            !_.isEmpty(liveScoreData) &&
            this._renderProjectedScore()} */}
            {isLoadedOnce && !_.isEmpty(liveScoreData) && this._renderScoreTable()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ liveScore, general }) => ({
  liveScoreData: liveScore.lcl.singlesTwo,
  isFetchingData: liveScore.lcl.isFetchingSinglesTwo,
  isLoadedOnce: liveScore.lcl.isLodedOnceSinglesTwo,
  selectedIndex: general.selectedIndex
});

const actions = { getScoreLclSingles2Request };

export default connect(
  mapStateToProps,
  actions
)(SinglesTwo);
