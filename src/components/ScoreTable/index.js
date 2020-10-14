// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, FlatList, Alert, TouchableHighlight, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Text, EmptyStateText } from "../../components";
import styles from "./styles";
import Util from "../../util";
import { AppStyles, Colors } from "../../theme";
import Tooltip from 'react-native-walkthrough-tooltip';

let typeMatch = "";
const _borderColor = (playerStrok) => {
  if (playerStrok !== 0) {
    return Colors.green;
  } else {
    return "rgba(0,0,0,0)";
  }
}
export default class ScoreTable extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    typeMatch = this.props.typeMatch;
  }
  state = {
    toolTipVisible: false,
    toolTipVisiblePlayer2: false
  }
  static defaultProps = {};

  _renderTable() {
    const {
      liveScoreData: { score }
      , typeMatch } = this.props;

    return (
      <View style={[AppStyles.flex, styles.overflowHidden, AppStyles.mTop10]}>
        <FlatList
          // style={[AppStyles.flex]}
          data={score}
          renderItem={this._renderRow}
          keyExtractor={Util.keyExtractor}
          ListHeaderComponent={this._renderHeader}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={<EmptyStateText />}
        />
      </View>
    );
  }
  _splitString(str, index_) {
    var res = str.split("&");
    return res[index_];
  }
  _selectColor(playerStrok) {
    if (parseInt(playerStrok) > 0) {
      return Colors.green;
    } else {
      return Colors.white;
    }
  }
  _tooltipSelection(name_) {
    if ((this.props.typeMatch === "dmp" || this.props.typeMatch === "foursome")) {
      this.setState({ toolTipVisible: true })
    } else {

    }
  }
  _renderHeader = () => {

    const {
      liveScoreData: { score }
    } = this.props;
    const playerOneColor = Colors.red3;
    const playerTwoColor = Colors.blue2;

    const {
      liveScoreData: { players }
    } = this.props;
    return (
      <View
        style={[
          styles.header,
          AppStyles.flexRow,
          AppStyles.spaceBetween,
          AppStyles.alignItemsCenter
        ]}
      >
        <View
          style={[styles.wholeNumber, AppStyles.paddingVerticalBase]}
          textAlign="center"
        >
          <Text textAlign="center">#</Text>
        </View>
        <View
          style={[styles.wholeNumber, AppStyles.paddingVerticalBase]}
          textAlign="center"
        >
          <Text textAlign="center">Par</Text>
        </View>
        <View
          style={[
            AppStyles.flex,
            AppStyles.flexRow,
            AppStyles.spaceAround,
            AppStyles.alignItemsCenter
          ]}
        >
          <View style={[AppStyles.flex2, AppStyles.pRight5]}>
            <Tooltip
              isVisible={this.state.toolTipVisible}
              content={<Text>{players[0].team_1_players}</Text>}
              placement="top"
              onClose={() => this.setState({ toolTipVisible: false })}
            ><TouchableOpacity
              onPress={() => { this._tooltipSelection(players[0].team_1_players) }}
            >
                <Text style={[AppStyles.alignItemsCenter]} textAlign="center">
                  {/* {(this.props.typeMatch === "dmp" || this.props.typeMatch === "foursome") ? players[0].team_1_players_initials : players[0].team_1_players || players[0].team_1_player} */}
                  {(this.props.typeMatch === "dmp" || this.props.typeMatch === "foursome") ? (this._splitString(players[0].team_1_players_initials, 0) + " & " + this._splitString(players[0].team_1_players_initials, 1)) : players[0].team_1_players || players[0].team_1_player}
                </Text>
              </TouchableOpacity>
            </Tooltip>
          </View>

          {score.length > 1 ?
            <View
              style={[
                styles.score,
                {
                  backgroundColor:
                    score[score.length - 1].scoredBy == 1
                      ? playerOneColor
                      : score[score.length - 1].scoredBy == 2
                        ? playerTwoColor
                        : Colors.darkBlue,
                  marginLeft: 10,
                }
              ]}
            >
              <Text textAlign="center" color={Colors.white}>
                {score[score.length - 1].score.length === 0 ? 'AS' : score[score.length - 1].score}
              </Text>
            </View>
            : <Text></Text>
          }

          <View style={[AppStyles.flex2, AppStyles.pLeft5, AppStyles.pRight5]}>
            <Tooltip
              isVisible={this.state.toolTipVisiblePlayer2}
              content={<Text>{players[0].team_2_players}</Text>}
              placement="top"
              onClose={() => this.setState({ toolTipVisiblePlayer2: false })}
            ><TouchableOpacity
              onPress={() => { this._tooltipSelection(players[0].team_2_players) }}
            >
                <Text style={[AppStyles.alignItemsCenter]} textAlign="center">
                  {(this.props.typeMatch === "dmp" || this.props.typeMatch === "foursome") ? (this._splitString(players[0].team_2_players_initials, 0) + " & " + this._splitString(players[0].team_2_players_initials, 1)) : players[0].team_2_players || players[0].team_2_player}
                </Text>
              </TouchableOpacity>
            </Tooltip>
          </View>
        </View>
      </View >
    );
  };

  _renderRow({ item, index }) {
    const playerOneColor = Colors.redDark;
    const playerTwoColor = Colors.blue2;
    debugger
    return (
      <View
        style={[
          AppStyles.flexRow,
          AppStyles.spaceBetween,
          AppStyles.alignItemsCenter,
        ]}
      >
        <Text style={[styles.wholeNumber]} textAlign="center">
          {index + 1}
        </Text>
        <View style={[styles.par, AppStyles.paddingVerticalBase]}>
          <Text textAlign="center">{item.par}</Text>
        </View>

        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[AppStyles.flex, AppStyles.mTop5, AppStyles.mBottom5]}
          colors={[
            item.scoredBy == 1 ? `${playerOneColor}1a` : Colors.transparent,
            Colors.transparent,
            item.scoredBy == 2 ? `${playerTwoColor}1a` : Colors.transparent
          ]}>
          <View
            style={[
              styles.row,
              AppStyles.flex,
              AppStyles.flexRow,
              AppStyles.spaceAround,
              AppStyles.alignItemsCenter,
              {
                borderLeftColor:
                  item.scoredBy == 1 ? playerOneColor : Colors.transparent,
                borderRightColor:
                  item.scoredBy == 2 ? playerTwoColor : Colors.transparent
              }
            ]}
          >
            {typeMatch === "foursome" || typeMatch === "dmp" ?
              <View style={{ width: 100, flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={[styles.OuterCircle, { borderColor: _borderColor(item.team1_p1_stroke) }]} >
                  <Text>
                    {item.team1_p1}
                  </Text>
                </View>
                <View style={[styles.OuterCircle, { borderColor: _borderColor(item.team1_p2_stroke) }]} >
                  <Text>
                    {item.team1_p2}
                  </Text>
                </View>
              </View> :
              <View style={AppStyles.flex2}>
                <View style={[styles.OuterCirclefortwoPlayer, { borderColor: _borderColor(item.team1_stroke) }]} >
                  <Text style={[AppStyles.alignItemsCenter]} textAlign="center">
                    {item.playerOne}
                  </Text>
                </View>
              </View>

            }
            <View style={{ marginHorizontal: 10, }}>
              {item.score !== "" ? (
                <View
                  style={[
                    styles.score,
                    {
                      backgroundColor:
                        item.scoredBy == 1
                          ? playerOneColor
                          : item.scoredBy == 2
                            ? playerTwoColor
                            : Colors.darkBlue
                    }
                  ]}
                >
                  <Text textAlign="center" color={Colors.white}>
                    {item.score}
                  </Text>
                </View>
              ) : <View
                style={[
                  styles.score,
                  {
                    backgroundColor: Colors.white

                  }
                ]}
              >
                  <Text textAlign="center" color={Colors.white}>
                    {item.score}
                  </Text>
                </View>
              }
            </View>
            {typeMatch === "foursome" || typeMatch === "dmp" ?
              <View style={{ width: 100, right: 5, flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={[styles.OuterCircle, { borderColor: _borderColor(item.team2_p1_stroke) }]} >
                  <Text>
                    {item.team2_p1}
                  </Text>
                </View>
                <View style={[styles.OuterCircle, { borderColor: _borderColor(item.team2_p2_stroke) }]} >
                  <Text>
                    {item.team2_p2}
                  </Text>
                </View>
              </View> :
              <View style={AppStyles.flex2}>
                <View style={[styles.OuterCirclefortwoPlayer, { borderColor: _borderColor(item.team2_stroke) }]} >
                  <Text style={[AppStyles.alignItemsCenter]} textAlign="center">
                    {item.playerTwo}
                  </Text>
                </View>
              </View>
            }
          </View>
        </LinearGradient>
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this._renderTable()}</View>;
  }
}
