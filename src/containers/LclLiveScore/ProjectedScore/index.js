// @flow
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "../../../components";
import styles from "./styles";
import { AppStyles, Colors } from "../../../theme";

export default class ProjectedScore extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.object.isRequired
  };

  static defaultProps = {};

  _renderScores() {
    const playerOneColor = Colors.red3;
    const playerTwoColor = Colors.blue2;

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

  render() {
    return <View>{this._renderScores()}</View>;
  }
}
