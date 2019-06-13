// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import { Text } from "../../../components";
import styles from "./styles";
import ListItem from "./ListItem";
import Util from "../../../util";
import { AppStyles, Colors } from "../../../theme";

class LeaderboardTab extends Component {
  static propTypes = {
    leaderboardData: PropTypes.array.isRequired
  };

  static defaultProps = {};

  _renderItem({ item }) {
    return <ListItem data={item} />;
  }

  _renderHeader() {
    return (
      <View style={styles.listHeaderWrapper}>
        <Text type="bold" style={{ width: 50 }}>
          Rank
        </Text>
        <Text type="bold" style={AppStyles.flex} textAlign="center">
          Player Name
        </Text>
        <Text type="bold" style={{ width: 60 }}>
          Points
        </Text>
      </View>
    );
  }

  _renderListing(data) {
    return (
      <View style={AppStyles.flex}>
        <FlatList
          data={data}
          renderItem={this._renderItem}
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

  render() {
    const { leaderboardData } = this.props;
    return (
      <View style={styles.container}>
        {this._renderListing(leaderboardData)}
      </View>
    );
  }
}

const mapStateToProps = ({ tournament }) => ({
  leaderboardData: tournament.poty.leaderboard
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(LeaderboardTab);
