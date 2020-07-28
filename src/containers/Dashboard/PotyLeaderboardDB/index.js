// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, FlatList,StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import ViewPager from '@react-native-community/viewpager';

import {
  Text,
  ButtonView,
  EmptyStateText,
  SimpleLoader
} from "../../../components";
import { getPotyLeaderboardRequest } from "../../../actions/TournamentActions";

import styles from "./styles";
import Util from "../../../util";
import { AppStyles, Colors } from "../../../theme";

class PotyLeaderboardDB extends PureComponent {
  static propTypes = {
    potyData: PropTypes.array.isRequired,
    isFetchingData: PropTypes.bool.isRequired,
    getPotyLeaderboardRequest: PropTypes.func.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    this.props.getPotyLeaderboardRequest();
  }

  _renderItem({ item, index }) {
    return (
      <View style={[AppStyles.flexRow, AppStyles.pBottom5, AppStyles.mTop5]}>
        <Text type="bold" style={{ width: 50 }} color={Colors.text.secondary}>
          {item.rank}
        </Text>
        <Text
          style={[AppStyles.flex, AppStyles.capitalize]}
          color={Colors.text.secondary}
        >
          {item.name}
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
    const { potyData, isFetchingData } = this.props;
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
           <ViewPager style={styles2.viewPager} initialPage={0}>
          <FlatList
            data={potyData}
            renderItem={this._renderItem}
            keyExtractor={Util.keyExtractor}
            ListHeaderComponent={this._renderHeader}
            stickyHeaderIndices={[0]}
          />
          <FlatList
            data={potyData}
            renderItem={this._renderItem}
            keyExtractor={Util.keyExtractor}
            ListHeaderComponent={this._renderHeader}
            stickyHeaderIndices={[0]}
          />
          <FlatList
            data={potyData}
            renderItem={this._renderItem}
            keyExtractor={Util.keyExtractor}
            ListHeaderComponent={this._renderHeader}
            stickyHeaderIndices={[0]}
          />
          </ViewPager>

          {isFetchingData && potyData.length === 0 && <SimpleLoader />}
          {!isFetchingData && potyData.length === 0 && (
            <EmptyStateText containerStyle={AppStyles.justifyFlexStart} />
          )}
        </View>
        {potyData.length > 0 && (
          <ButtonView
            style={[AppStyles.alignItemsFlexEnd, AppStyles.pRight25]}
            onPress={Actions.poty}
          >
            <Text
              type="bold"
              size="xSmall"
              color={Colors.green}
            >{`VIEW ALL >`}</Text>
          </ButtonView>
        )}
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});

const mapStateToProps = ({ tournament }) => ({
  potyData: Util.getTrimmedDataFromArray(tournament.poty.leaderboard, 7),
  isFetchingData: tournament.poty.isFetchingLeaderboard
});

const actions = { getPotyLeaderboardRequest };

export default connect(
  mapStateToProps,
  actions
)(PotyLeaderboardDB);
