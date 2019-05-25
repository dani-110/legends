// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Text } from "../../../components";
import styles from "./styles";
import Util from "../../../util";
import { AppStyles, Colors } from "../../../theme";

export default class PotyScoreTable extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.array.isRequired
  };

  static defaultProps = {};

  _renderTable() {
    const { liveScoreData } = this.props;

    return (
      <View style={[styles.overflowHidden, AppStyles.mTop10]}>
        <FlatList
          data={liveScoreData}
          renderItem={this._renderRow}
          keyExtractor={Util.keyExtractor}
          ListHeaderComponent={this._renderHeader}
          stickyHeaderIndices={[0]}
          ItemSeparatorComponent={() => (
            <View style={[AppStyles.borderBottomGrey]} />
          )}
        />
      </View>
    );
  }

  _renderHeader = () => (
    <View
      style={[
        styles.header,
        AppStyles.flexRow,
        AppStyles.spaceBetween,
        AppStyles.alignItemsCenter
      ]}
    >
      <View width={60}>
        <Text textAlign="center">#</Text>
      </View>
      <View style={[AppStyles.flex2]}>
        <Text>Name</Text>
      </View>
      <View width={65}>
        <Text textAlign="center">Score</Text>
      </View>
      <View width={45}>
        <Text textAlign="center">To Par</Text>
      </View>
      <View width={70}>
        <Text textAlign="center">Thru</Text>
      </View>
    </View>
  );

  _renderRow({ item }) {
    return (
      <View
        style={[
          styles.row,
          AppStyles.flexRow,
          AppStyles.spaceBetween,
          AppStyles.alignItemsCenter
        ]}
      >
        <View width={60}>
          <Text textAlign="center">{item.number || "-"}</Text>
        </View>
        <View style={[AppStyles.flex2]}>
          <Text>{item.name}</Text>
        </View>
        <View width={65}>
          <Text textAlign="center">{item.score}</Text>
        </View>
        <View
          width={45}
          style={[styles.score, item.toPar < 0 && styles.negativePar]}
        >
          <Text
            size="xLarge"
            style={[item.toPar < 0 && styles.negativeParText]}
          >
            {item.toPar}
          </Text>
        </View>
        <View width={70}>
          <Text textAlign="center">{item.thru}</Text>
        </View>
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this._renderTable()}</View>;
  }
}
