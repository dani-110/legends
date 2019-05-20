// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import { Text, ButtonView } from "../../../components";
import styles from "./styles";
import Util from "../../../util";
import { AppStyles, Colors } from "../../../theme";

class PotyLeaderboardDB extends PureComponent {
  static propTypes = {
    potyData: PropTypes.array.isRequired
  };

  static defaultProps = {};

  _renderItem({ item, index }) {
    return (
      <View style={[AppStyles.flexRow, AppStyles.pBottom5, AppStyles.mTop5]}>
        <Text type="bold" style={{ width: 50 }} color={Colors.text.secondary}>
          {item.rank}
        </Text>
        <Text style={AppStyles.flex} color={Colors.text.secondary}>
          {item.playerName}
        </Text>
        <Text type="bold" style={{ width: 60 }} color={Colors.text.secondary}>
          {item.points}
        </Text>
      </View>
    );
  }

  _renderHeader() {
    return (
      <View style={[AppStyles.flexRow, AppStyles.pBottom5, AppStyles.mTop5]}>
        <Text style={{ width: 50 }} color={Colors.grey3}>
          Rank
        </Text>
        <Text style={AppStyles.flex} color={Colors.grey3}>
          Player
        </Text>
        <Text style={{ width: 60 }} color={Colors.grey3}>
          Points
        </Text>
      </View>
    );
  }

  render() {
    const { potyData } = this.props;
    return (
      <View style={[AppStyles.borderBottomGrey, AppStyles.pBottom10]}>
        <View
          style={[
            styles.container,
            AppStyles.cardView,
            AppStyles.mTop10,
            AppStyles.mBottom10
          ]}
        >
          <FlatList
            data={potyData}
            renderItem={this._renderItem}
            keyExtractor={Util.keyExtractor}
            ListHeaderComponent={this._renderHeader}
            stickyHeaderIndices={[0]}
          />
        </View>
        <ButtonView style={[AppStyles.alignItemsFlexEnd, AppStyles.pRight25]}>
          <Text
            type="bold"
            size="xSmall"
            color={Colors.green}
          >{`VIEW ALL >`}</Text>
        </ButtonView>
      </View>
    );
  }
}

const mapStateToProps = ({ tournament }) => ({
  potyData: Util.getTrimmedDataFromArray(tournament.poty.leaderboard, 7)
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(PotyLeaderboardDB);
