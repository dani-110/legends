// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";
import {
  ScoreTable,
  SimpleLoader,
  CustomNavbar,
  EmptyStateText
} from "../../components";
import { getScoreDmpRequest } from "../../actions/LiveMatchesActions";

import { NAVBAR_THEME } from "../../constants";
import { setTabbarType, enableEnterScore } from "../../actions/GeneralActions";

class DmpLiveScore extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.object.isRequired,
    setTabbarType: PropTypes.func.isRequired,
    enableEnterScore: PropTypes.func.isRequired,
    getScoreDmpRequest: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    isFetchingData: PropTypes.bool.isRequired,
    current_match: PropTypes.object.isRequired
  };

  static defaultProps = {};

  static onEnter() {
    if (DmpLiveScore.instance) {
      DmpLiveScore.instance._onEnter();
    }
  }

  static onExit() {
    if (DmpLiveScore.instance) {
      DmpLiveScore.instance._onExit();
    }
  }

  constructor(props) {
    super(props);
    DmpLiveScore.instance = this;
  }

  componentWillMount() {
    const { id, match_id, schedule_id, season_id } = this.props.data;
    this.props.getScoreDmpRequest(`${match_id}/${schedule_id}/${season_id}`);
    this.props.enableEnterScore(id === this.props.current_match[0].id);
  }

  _onEnter() {
    this.props.setTabbarType(false);
  }

  _onExit() {
    this.props.setTabbarType(true);
  }

  _renderScoreTable() {
    const { liveScoreData } = this.props;
    return <ScoreTable liveScoreData={liveScoreData} />;
  }

  render() {
    const {
      data: { title, venue },
      isFetchingData,
      liveScoreData
    } = this.props;
    return (
      <View style={styles.container}>
        <CustomNavbar
          title={title}
          subtitle={venue}
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        {_.isEmpty(liveScoreData) && !isFetchingData && <EmptyStateText />}

        {isFetchingData && <SimpleLoader />}

        {!isFetchingData &&
          !_.isEmpty(liveScoreData) &&
          this._renderScoreTable()}
      </View>
    );
  }
}

const mapStateToProps = ({ liveScore, general }) => ({
  liveScoreData: liveScore.dmp,
  isFetchingData: liveScore.dmpFetching,
  current_match: general.current_match
});

const actions = { setTabbarType, getScoreDmpRequest, enableEnterScore };

export default connect(
  mapStateToProps,
  actions
)(DmpLiveScore);
