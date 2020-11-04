// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Alert } from "react-native";
import { Text } from "../../../components";
import styles from "./styles";
import { AppStyles, Colors } from "../../../theme";
import Tooltip from 'react-native-walkthrough-tooltip';
const playerOneColor = Colors.redDark;
const playerTwoColor = Colors.blue2;

let indexer = 0;
let temp = "AS";
let TempColor = Colors.darkBlue;
export default class ProjectedScore extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.object.isRequired
  };
  state = {
    toolTipVisible: false,
    toolTipVisiblePlayer2: false
  }
  static defaultProps = {};

  _renderScores() {


    const {
      liveScoreData: { team }
    } = this.props;

    return (
      <View style={[styles.container]}>
        <View
          style={[
            AppStyles.flexRow,
            AppStyles.spaceAround,
            AppStyles.alignItemsCenter,
            AppStyles.mBottom5
          ]}
        >
          <View style={[AppStyles.flex2]}>
            <Text textAlign="right"> {team[0].name || team[0].names} </Text>
          </View>
          <View
            style={[
              AppStyles.mLeft15,
              AppStyles.mRight5,
              styles.score,
              { backgroundColor: playerOneColor }
            ]}
          >
            <Text color={Colors.white}>{team[0].score}</Text>
          </View>
          <View
            style={[
              AppStyles.mRight15,
              AppStyles.mLeft5,
              styles.score,
              { backgroundColor: playerTwoColor }
            ]}
          >
            <Text color={Colors.white}>{team[1].score}</Text>
          </View>
          <View style={[AppStyles.flex2]}>
            <Text textAlign="left"> {team[1].name || team[1].names} </Text>
          </View>
        </View>
        <Text textAlign="center" color={Colors.grey}>
          Projected
        </Text>
      </View>
    );
  }
  // header Contant Start
  _splitString(str, index_) {
    var res = str.split("&");
    return res[index_];
  }
  _getNameWithToolTip(playerName, playerInitials, indexer, type) {
    return (
      <View>
        <Tooltip
          isVisible={(indexer == 1) ? this.state.toolTipVisiblePlayer1 : this.state.toolTipVisiblePlayer2}
          content={<Text>{playerName}</Text>}
          placement="top"
          onClose={() => (type === "foursome") ? (indexer == 1) ? this.setState({ toolTipVisiblePlayer1: false }) : this.setState({ toolTipVisiblePlayer2: false }) : null}
        ><TouchableOpacity
          onPress={() => { (type === "foursome") ? (indexer == 1) ? this.setState({ toolTipVisiblePlayer1: true }) : this.setState({ toolTipVisiblePlayer2: true }) : null }}
        >
            <Text style={[AppStyles.alignItemsCenter, styles.textStyle]} textAlign="center">
              {/* {playerInitials} */}

              {(type === "foursome") ? playerInitials : playerName}

            </Text>
          </TouchableOpacity>


        </Tooltip>
      </View>
    )
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
  _headerController(playersData, score, type) {

    if (playersData !== undefined) {

      player1Name = playersData[0].team_1_players
      player2Name = playersData[0].team_2_players
      player1Initials = this._splitString(playersData[0].team_1_players_initials, 0) + " & " + this._splitString(playersData[0].team_1_players_initials, 1)
      player2Initials = this._splitString(playersData[0].team_2_players_initials, 0) + " & " + this._splitString(playersData[0].team_2_players_initials, 1)
    }
    indexer;
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
              {this._getNameWithToolTip(player1Name, player1Initials, 1, type)}
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
              {this._getNameWithToolTip(player2Name, player2Initials, 2, type)}
            </View>
          </View>
        }

      </View>
    );

  }
  // header Contant end
  render() {
    const {
      liveScoreData: { score }
      , type } = this.props;

    //const playerOneColor = Colors.red3;
    //const playerTwoColor = Colors.blue2;

    const {
      liveScoreData: { players }
    } = this.props;


    return <View>
      {this._renderScores()}
      {this._headerController(players, score, type)}
    </View>;
  }
}
