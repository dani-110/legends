// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, FlatList, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import ViewPager from '@react-native-community/viewpager';
import styles2 from "../../../components/CustomNavbar/styles";

import {
  Text,
  ButtonView,
  EmptyStateText,
  SimpleLoader
} from "../../../components";
import { getPotyLeaderboardRequest } from "../../../actions/TournamentActions";

import styles from "./styles";
import Util from "../../../util";
import { AppStyles, Colors, Fonts } from "../../../theme";
import { from } from "seamless-immutable";
import { size } from "lodash";

class PotyLeaderboardDB extends PureComponent {
  static propTypes = {
    potyData: PropTypes.array.isRequired,
    isFetchingData: PropTypes.bool.isRequired,
    getPotyLeaderboardRequest: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = { sliderIndex: 0, maxSlider: 1, pageNumber: 0 };
  }
  static defaultProps = {};

  componentWillMount() {
    this.props.getPotyLeaderboardRequest();
  }

  componentDidMount() {
    var pageNumber = 0;
    this.dataPolling = setInterval(() => {
      debugger
      if (this.state.pageNumber >= 1) {
        pageNumber = 0;
      } else {
        pageNumber = this.state.pageNumber;
        pageNumber++;
      }
      console.log(pageNumber)
      this.setState({ pageNumber: pageNumber })
      this.viewPager.setPage(pageNumber)
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.dataPolling);
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text type="bold" color={Colors.text.secondary}>
            {item.rank}
          </Text>
        </View>
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text color={Colors.grey3}>
            Events
        </Text>
        </View>
        <Text style={{ width: 60 }} color={Colors.grey3}>
          Points
        </Text>
      </View>
    );
  }

  render() {
    console.log("state is:-->" + this.state.sliderIndex)
    const { potyData, isFetchingData, lcl_leaderboard } = this.props;
    return (
      <View style={[{ height: '52.5%', ...AppStyles.borderBottomGrey, }]}>
        <ViewPager style={[styleViewPager.viewPager]} ref={(viewPager) => { this.viewPager = viewPager }} scrollEnabled={true}>

          <View
            style={{
              backgroundColor: "#00000000",
            }
            }
          >

            <Text color={Colors.white}
              numberOfLines={1}
              ellipsizeMode="tail"
              size="large"
              type="base"
              style={{ ...styles2.title, marginTop: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >POTY Leaderboard</Text>
            <View
              style={[
                styles.container,
                AppStyles.cardView,
              ]}
            >


              <FlatList
                data={potyData}
                renderItem={this._renderItem}
                keyExtractor={Util.keyExtractor}
                ListHeaderComponent={this._renderHeader}
                stickyHeaderIndices={[0]}
              />

              {isFetchingData && potyData.length === 0 && <SimpleLoader />}
              {!isFetchingData && potyData.length === 0 && (
                <EmptyStateText containerStyle={AppStyles.justifyFlexStart} />
              )}
            </View>
            {potyData.length > 0 && (
              <ButtonView
                style={[AppStyles.alignItemsFlexEnd, AppStyles.pRight25, { marginTop: -15 }]}
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


          <View
            style={[
              styles.container,
              { backgroundColor: "#00000000" }
            ]}
          >

            <Text color={Colors.white}
              numberOfLines={1}
              ellipsizeMode="tail"
              size="large"
              type="base"
              style={{ ...styles2.title, marginTop: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >LCL Leaderboard</Text>
            <View
              style={[
                styles.container,
                AppStyles.cardView,
              ]}
            >


              <FlatList
                data={lcl_leaderboard}
                renderItem={this._renderItem}
                keyExtractor={Util.keyExtractor}
                ListHeaderComponent={this._renderHeader}
                stickyHeaderIndices={[0]}
              />

              {isFetchingData && potyData.length === 0 && <SimpleLoader />}
              {!isFetchingData && potyData.length === 0 && (
                <EmptyStateText containerStyle={AppStyles.justifyFlexStart} />
              )}
            </View>

            {potyData.length > 0 && (
              <ButtonView
                style={[AppStyles.alignItemsFlexEnd, AppStyles.pRight25, { marginTop: -15, marginBottom: 10 }]}
                onPress={Actions.lcl}
              >
                <Text
                  type="bold"
                  size="xSmall"
                  color={Colors.green}
                >{`VIEW ALL >`}</Text>
              </ButtonView>
            )}
          </View>

        </ViewPager>
      </View>
    );
  }
}

const styleViewPager = StyleSheet.create({
  viewPager: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: 450
  },
});


const mapStateToProps = ({ tournament, general }) => {
  return ({
    potyData: Util.getTrimmedDataFromArray(tournament.poty.leaderboard, 7),
    lcl_leaderboard: general.leaderBoardData.lcl_leaderboard,
    isFetchingData: tournament.poty.isFetchingLeaderboard
  });
}

const actions = { getPotyLeaderboardRequest };

export default connect(
  mapStateToProps,
  actions
)(PotyLeaderboardDB);
