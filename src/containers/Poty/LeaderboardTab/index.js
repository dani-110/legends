// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import { Text, SimpleLoader, EmptyStateText } from "../../../components";
import { getPotyLeaderboardRequest } from "../../../actions/TournamentActions";
import styles from "./styles";
import ListItem from "./ListItem";
import Util from "../../../util";
import { AppStyles, Colors } from "../../../theme";

class LeaderboardTab extends Component {
  static propTypes = {
    leaderboardData: PropTypes.array.isRequired,
    isFetchingData: PropTypes.bool.isRequired,
    getPotyLeaderboardRequest: PropTypes.func.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    //
    this.props.getPotyLeaderboardRequest();
  }

  _renderItem({ item }) {
    return <ListItem data={item} />;
  }

  _renderHeader() {
    return (
      <View style={styles.listHeaderWrapper}>
        <Text type="bold" style={{ width: 70 }}>
          Rank
        </Text>
        <Text type="bold" style={AppStyles.flex} textAlign="left">
          Player Name
        </Text>

        <Text type="bold" style={{ width: 60 }}>
          Events Header
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
    const { leaderboardData, isFetchingData } = this.props;
    return (
      <View style={styles.container}>
        {isFetchingData && leaderboardData.length === 0 && <SimpleLoader />}
        {leaderboardData.length === 0 && !isFetchingData && <EmptyStateText />}
        {leaderboardData.length > 0 && this._renderListing(leaderboardData)}
      </View>
    );
  }
}

const mapStateToProps = ({ tournament }) => ({
  leaderboardData: tournament.poty.leaderboard,
  isFetchingData: tournament.poty.isFetchingLeaderboard
});

const actions = { getPotyLeaderboardRequest };

export default connect(
  mapStateToProps,
  actions
)(LeaderboardTab);
