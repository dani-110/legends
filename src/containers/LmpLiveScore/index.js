// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View, RefreshControl, Text } from "react-native";
import styles from "./styles";
import { AppStyles, Colors } from "../../theme";
import { getScoreLmpRequest } from "../../actions/LiveMatchesActions";
import Tooltip from 'react-native-walkthrough-tooltip';
import {
  CustomNavbar,
  ScoreTable,
  SimpleLoader,
  EmptyStateText
} from "../../components";
import { NAVBAR_THEME } from "../../constants";
import { setTabbarType, enableEnterScore } from "../../actions/GeneralActions";
import { ScrollView } from "react-native-gesture-handler";
import { POLLING_TIME } from "../../../src/constants/index";

const playerOneColor = Colors.redDark;
const playerTwoColor = Colors.blue2;
let indexer = 0;
let temp = "AS";
let TempColor = Colors.darkBlue;
class LmpLiveScore extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.object.isRequired,
    setTabbarType: PropTypes.func.isRequired,
    getScoreLmpRequest: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    isFetchingData: PropTypes.bool.isRequired,
    enableEnterScore: PropTypes.func.isRequired,
    current_match: PropTypes.object.isRequired
  };

  static defaultProps = {};

  //////////////////////////////  INTERVALS ///////////////////////////////

  componentDidMount() {
    this.dataPolling = setInterval(() => {
      const { id, match_id, schedule_id, season_id } = this.props.data;
      this.props.getScoreLmpRequest(
        `${match_id}/${schedule_id}/${season_id || id}`
      );
      if (this.props.current_match.length > 0)
        this.props.enableEnterScore(id === this.props.current_match[0].id);
    }, POLLING_TIME);
  }

  componentWillUnmount() {
    clearInterval(this.dataPolling);
  }

  _onRefresh() {
    this.setState({ refreshing: false });
    const { id, match_id, schedule_id, season_id } = this.props.data;
    this.props.getScoreLmpRequest(
      `${match_id}/${schedule_id}/${season_id || id}`
    );
    if (this.props.current_match.length > 0)
      this.props.enableEnterScore(id === this.props.current_match[0].id);
  }


  ///////////////////////////////// INTERVALS /////////////////////////////

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
    this.state = {
      refreshing: false,
    };
  }

  componentWillMount() {

    const { id, match_id, schedule_id, season_id } = this.props.data;
    this.props.getScoreLmpRequest(
      `${match_id}/${schedule_id}/${season_id || id}`
    );
    if (this.props.current_match.length > 0)
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


  _updateScoreMain(score) {
    indexer += 1;

    for (var i = 0; i < score.length; i++) {
      if (score[i].score !== "") {
        temp = score[i].score
      }
    }
    return temp
  }

  _updateColor(score) {

    for (var i = 0; i < score.length; i++) {
      console.log(score[i].scoredBy)
      if (score[i].scoredBy === "1") {
        TempColor = playerOneColor
      } else if (score[i].scoredBy === "2") {
        TempColor = playerTwoColor
      } else if (score[i].scoredBy === "0") {
        TempColor = Colors.darkBlue
      }
    }
    return TempColor
  }

  _headerController(playersData, score) {

    if (playersData !== undefined) {

      player1Name = playersData[0].team_1_player
      player2Name = playersData[0].team_2_player
    }
    return (
      <View  >
        {playersData &&
          <View
            style={[
              styles.header,
              AppStyles.flexRow,
              AppStyles.spaceAround,
              AppStyles.alignItemsCenter
            ]}>
            <View
              style={[styles.wholeNumber, { left: 8 }]}
            >
              <Text textAlign="center" style={styles.textStyle}>#</Text>
            </View>
            <View
              style={[styles.wholeNumber]}
            >
              <Text textAlign="center" style={styles.textStyle}>Par</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }} >
              <Text style={{ ...styles.textStyle, alignSelf: 'center', textAlign: 'center' }}>{player1Name}</Text>
            </View>
            {score.length > 1 ?
              <View
                style={[
                  styles.score,
                  {
                    backgroundColor:
                      this._updateColor(score),
                    // score[score.length - 1].scoredBy == 1
                    //   ? playerOneColor
                    //   : score[score.length - 1].scoredBy == 2
                    //     ? playerTwoColor
                    //     : Colors.darkBlue,
                    margin: 10
                  }
                ]}
              >
                <Text textAlign="center" style={{ color: Colors.white, }}>
                  {this._updateScoreMain(score)}
                  {/* {score[score.length - 1].score.length === 0 ? 'AS' : score[score.length - 1].score} */}
                </Text>
              </View>
              : <Text></Text>
            }
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }} >
              <Text textAlign="center" style={styles.textStyle}>{player2Name}</Text>
            </View>
          </View>
        }

      </View>
    );

  }
  // header Contant end

  render() {
    const {
      data: { title, venue },
      isFetchingData,
      liveScoreData
    } = this.props;

    console.log("title is:" + title + "\n venue is:" + venue);
    teamName1 = this.props.current_match.length <= 0 ? this.props.data.team1_name : this.props.current_match[0].team1_name
    teamName2 = this.props.current_match.length <= 0 ? this.props.data.team2_name : this.props.current_match[0].team2_name
    return (
      <View style={styles.container}>
        <CustomNavbar
          title={title || teamName1 + " vs " + teamName2}
          subtitle={venue}
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        {this._headerController(liveScoreData.players, liveScoreData.score)}
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          {isFetchingData && <SimpleLoader />}
          {_.isEmpty(liveScoreData) && !isFetchingData && <EmptyStateText />}
          {!isFetchingData &&
            !_.isEmpty(liveScoreData) &&
            this._renderScoreTable()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ liveScore, general }) => ({
  liveScoreData: liveScore.lmp,
  isFetchingData: liveScore.lmpFetching,
  current_match: general.current_match
});

const actions = { setTabbarType, enableEnterScore, getScoreLmpRequest };

export default connect(
  mapStateToProps,
  actions
)(LmpLiveScore);
