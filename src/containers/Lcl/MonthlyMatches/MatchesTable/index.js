// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image as RNImage, FlatList } from "react-native";
import { Text } from "../../../../components";
import styles from "./styles";
import { AppStyles, Colors, Images } from "../../../../theme";
import Util from "../../../../util";

export default class MatchesTable extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  static defaultProps = {};

  _renderRoundNumber() {
    const {
      data: {
        item: { round }
      }
    } = this.props;

    const colors = ["blue", "red3", "darkBlue"];

    return (
      <View style={AppStyles.centerInner}>
        <View
          style={[
            AppStyles.centerInner,
            styles.roundNumber,
            { backgroundColor: Colors[colors[round % 3]] }
          ]}
        >
          <Text textAlign="center" color={Colors.white}>
            Round {round}
          </Text>
        </View>
      </View>
    );
  }

  _renderDate() {
    const {
      data: {
        item: { playing_month }
      }
    } = this.props;

    return (
      <View
        style={[
          AppStyles.flexRow,
          AppStyles.centerInner,
          AppStyles.baseMargin,
          styles.dateContainer
        ]}
      >
        <RNImage source={Images.calendar_grey} style={AppStyles.mRight10} />
        <Text textAlign="center">
          {/* {Util.getFormattedDateTime(item.startTime, "DD MMM YYYY")}
          {" - "}
          {Util.getFormattedDateTime(item.endTime, "DD MMM YYYY")} */}

          {playing_month}
        </Text>
      </View>
    );
  }

  _renderPlayers() {
    const {
      data: {
        item: { teams }
      }
    } = this.props;
    return (
      <FlatList
        data={teams}
        renderItem={this._renderPlayerItem}
        keyExtractor={Util.keyExtractor}
      />
    );
  }

  _renderPlayerItem({ item }) {
    return (
      <View
        style={[
          AppStyles.flexRow,
          AppStyles.spaceBetween,
          AppStyles.alignItemsCenter,
          AppStyles.mBottom10,
          AppStyles.mRight10,
          AppStyles.mLeft10
        ]}
      >
        <Text
          style={AppStyles.flex2}
          textAlign="center"
          size={15}
          color={Colors.grey5}
        >
          {item[0]}
        </Text>
        <View style={styles.playersSep}>
          <Text color={Colors.white} size={13}>
            vs
          </Text>
        </View>
        <Text
          style={AppStyles.flex2}
          textAlign="center"
          size={15}
          color={Colors.grey5}
        >
          {item[1]}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[AppStyles.mBottom30, styles.matchCard]}>
        {this._renderRoundNumber()}
        {this._renderDate()}
        {this._renderPlayers()}
      </View>
    );
  }
}
