// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Text, EmptyStateText } from "../../components";
import styles from "./styles";
import Util from "../../util";
import { AppStyles, Colors } from "../../theme";

export default class ScoreTable extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.object.isRequired
  };

  static defaultProps = {};

  _renderTable() {
    const {
      liveScoreData: { score }
    } = this.props;

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
            <Text style={[AppStyles.alignItemsCenter]} textAlign="center">
              {players[0].team_1_players || players[0].team_1_player}
            </Text>
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
                        : Colors.darkBlue
                }
              ]}
            >
              <Text textAlign="center" color={Colors.white}>
                {score[score.length - 1].score}
              </Text>
            </View>
            : <Text>score</Text>
          }

          <View style={[AppStyles.flex2, AppStyles.pLeft5, AppStyles.pRight5]}>
            <Text style={[AppStyles.alignItemsCenter]} textAlign="center">
              {players[0].team_2_players || players[0].team_2_player}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  _renderRow({ item, index }) {
    const playerOneColor = Colors.red3;
    const playerTwoColor = Colors.blue2;

    return (
      <View
        style={[
          AppStyles.flexRow,
          AppStyles.spaceBetween,
          AppStyles.alignItemsCenter
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
          ]}
        >
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
            <View style={AppStyles.flex2}>
              <Text style={[AppStyles.alignItemsCenter]} textAlign="center">
                {item.playerOne}
              </Text>
            </View>
            {item.score && (
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
            )}
            <View style={AppStyles.flex2}>
              <Text style={[AppStyles.alignItemsCenter]} textAlign="center">
                {item.playerTwo}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this._renderTable()}</View>;
  }
}
