// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";
import { getScoreLmpRequest } from "../../actions/LiveMatchesActions";
import {
  CustomNavbar,
  ScoreTable,
  SimpleLoader,
  EmptyStateText
} from "../../components";
import { NAVBAR_THEME } from "../../constants";
import { setTabbarType } from "../../actions/GeneralActions";

class LmpLiveScore extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.object.isRequired,
    setTabbarType: PropTypes.func.isRequired,
    getScoreLmpRequest: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    isFetchingData: PropTypes.bool.isRequired
  };

  static defaultProps = {};

  static onEnter() {
    if (LmpLiveScore.instance) {
      LmpLiveScore.instance._onEnter();
    }
  }

  static onExit() {
    if (LmpLiveScore.instance) {
      LmpLiveScore.instance._onExit();
    }
  }

  constructor(props) {
    super(props);
    LmpLiveScore.instance = this;
  }

  componentWillMount() {
    const { id, match_id, schedule_id, season_id } = this.props.data;
    this.props.getScoreLmpRequest(
      `${match_id}/${schedule_id}/${season_id || id}`
    );
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

        {isFetchingData && <SimpleLoader />}
        {_.isEmpty(liveScoreData) && !isFetchingData && <EmptyStateText />}
        {!isFetchingData &&
          !_.isEmpty(liveScoreData) &&
          this._renderScoreTable()}
      </View>
    );
  }
}

const mapStateToProps = ({ liveScore }) => ({
  liveScoreData: liveScore.lmp,
  isFetchingData: liveScore.lmpFetching
});

const actions = { setTabbarType, getScoreLmpRequest };

export default connect(
  mapStateToProps,
  actions
)(LmpLiveScore);
