// @flow

import { AppStyles, Colors } from "../../theme";
import Tooltip from 'react-native-walkthrough-tooltip';
import _ from "lodash";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View, RefreshControl, Text, TouchableOpacity, Alert } from "react-native";
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
import { ScrollView } from "react-native-gesture-handler";
import { POLLING_TIME } from "../../../src/constants/index";

const playerOneColor = Colors.redDark;
const playerTwoColor = Colors.blue2;
let indexer = 0;
let temp = "AS";
let TempColor = Colors.darkBlue;
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

  //////////////////////////////  INTERVALS ///////////////////////////////

  componentDidMount() {
    debugger
    this.dataPolling = setInterval(() => {
      const { id, match_id, schedule_id, season_id } = this.props.data;
      this.props.getScoreDmpRequest(`${match_id}/${schedule_id}/${id}`);

      if (this.props.current_match.length > 0)
        this.props.enableEnterScore(id === this.props.current_match[0].id);

    }, POLLING_TIME);
  }

  componentWillUnmount() {
    clearInterval(this.dataPolling);
  }

  _onRefresh() {
    this.setState({ refreshing: false });
    debugger
    const { id, match_id, schedule_id, season_id } = this.props.data;
    this.props.getScoreDmpRequest(`${match_id}/${schedule_id}/${id}`);

    if (this.props.current_match.length > 0)
      this.props.enableEnterScore(id === this.props.current_match[0].id);
  }


  ///////////////////////////////// INTERVALS /////////////////////////////

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
    this.state = {
      refreshing: false,
    };
  }

  componentWillMount() {
    debugger
    const { id, match_id, schedule_id, season_id } = this.props.data;
    this.props.getScoreDmpRequest(`${match_id}/${schedule_id}/${id}`);

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
    return <ScoreTable liveScoreData={liveScoreData} typeMatch={this.props.data.type} />;
  }
  _checkCurrentData(data) {
    if (data !== undefined || data !== this.null) {
      return true
    }
    else {
      return false
    }
  }

  // header Contant Start
  _splitString(str, index_) {
    var res = str.split("&");
    return res[index_];
  }
  _getNameWithToolTip(playerName, playerInitials, indexer) {
    return (
      <View>
        <Tooltip
          isVisible={(indexer == 1) ? this.state.toolTipVisiblePlayer1 : this.state.toolTipVisiblePlayer2}
          content={<Text>{playerName}</Text>}
          placement="top"
          onClose={() => (indexer == 1) ? this.setState({ toolTipVisiblePlayer1: false }) : this.setState({ toolTipVisiblePlayer2: false })}
        ><TouchableOpacity
          onPress={() => { (indexer == 1) ? this.setState({ toolTipVisiblePlayer1: true }) : this.setState({ toolTipVisiblePlayer2: true }) }}
        >
            <Text style={[AppStyles.alignItemsCenter, styles.textStyle]} textAlign="center">
              {playerInitials}
            </Text>
          </TouchableOpacity>
        </Tooltip>
      </View>
    )
  }

  _updateScoreMain(score) {
    indexer += 1;
    debugger
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

  _headerController(playersData, score, type) {
    if (playersData !== undefined) {

      player1Name = playersData[0].team_1_players
      player2Name = playersData[0].team_2_players
      player1Initials = this._splitString(playersData[0].team_1_players_initials, 0) + " & " + this._splitString(playersData[0].team_1_players_initials, 1)
      player2Initials = this._splitString(playersData[0].team_2_players_initials, 0) + " & " + this._splitString(playersData[0].team_2_players_initials, 1)
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
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', right: 3 }} >
              {this._getNameWithToolTip(player1Name, player1Initials, 1)}
            </View>
            {score.length > 1 ?
              <View
                style={[
                  styles.score,
                  {
                    backgroundColor:
                      // score[score.length - 1].scoredBy == 1
                      //   ? playerOneColor
                      //   : score[score.length - 1].scoredBy == 2
                      //     ? playerTwoColor
                      //     : Colors.darkBlue,
                      this._updateColor(score),
                    marginLeft: 10, right: 6
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
              {this._getNameWithToolTip(player2Name, player2Initials, 2)}
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

    debugger

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
        {this._headerController(liveScoreData.players, liveScoreData.score, this.props.data.type)}
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          {_.isEmpty(liveScoreData) && !isFetchingData && <EmptyStateText />}

          {isFetchingData && <SimpleLoader />}

          {!isFetchingData &&
            !_.isEmpty(liveScoreData) &&
            this._renderScoreTable()}
        </ScrollView>
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
