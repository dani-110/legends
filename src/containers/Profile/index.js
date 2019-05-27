// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, Image as RNImage, ScrollView } from "react-native";
import {
  CustomNavbar,
  Image,
  Text,
  TopTabs,
  ButtonView
} from "../../components";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";
import { Images, AppStyles, Colors } from "../../theme";
import Scores from "../Dashboard/Scores";
import Util from "../../util";
import GrossScoresTrend from "./GrossScoresTrend";
import { Actions } from "react-native-router-flux";

class Profile extends Component {
  state = {
    activeTabIndex: 0
  };
  TABS_DATA = [
    {
      image: "trend_icon",
      title: "Gross Scores Trend",
      onPress: () => Util.setSelectedTabIndex(this, 0)
    },
    {
      image: "trend_icon",
      title: "Trending Handicap",
      onPress: () => Util.setSelectedTabIndex(this, 1)
    }
  ];

  _renderUserDetails() {
    return (
      <View style={styles.userDetailsWrapper}>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={Images.dummy_user}
              resizeMode="cover"
              style={styles.userImage}
            />
          </View>
          <View style={styles.editProfileWrapper}>
            <RNImage source={Images.edit_icon} style={styles.editProfile} />
          </View>
        </View>
        <Text
          style={[AppStyles.margin20]}
          size={20}
          type="bold"
          color={Colors.text.secondary}
        >
          Tariq Allawala
        </Text>
      </View>
    );
  }

  _renderScores() {
    return <Scores showViewProfile={false} />;
  }

  _renderLatestScorecardButton() {
    return (
      <View style={AppStyles.paddingHorizontalBase}>
        <ButtonView
          style={[
            styles.scoreCardButton,
            AppStyles.flexRow,
            AppStyles.centerInner
          ]}
          onPress={Actions.scoreCard}
        >
          <RNImage source={Images.calendar} />
          <Text style={[AppStyles.mLeft10]} color={Colors.white}>
            View Latest ScoreCard
          </Text>
        </ButtonView>
      </View>
    );
  }

  _renderTabsHeader() {
    return (
      <View style={[AppStyles.marginVerticalBase]}>
        <TopTabs
          data={this.TABS_DATA}
          activeIndex={this.state.activeTabIndex}
          isRow={false}
        />
      </View>
    );
  }

  render() {
    const { activeTabIndex } = this.state;
    return (
      <View style={[styles.container, AppStyles.pBottomListBottom]}>
        <CustomNavbar
          title=""
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        <ScrollView>
          {this._renderUserDetails()}
          {this._renderScores()}
          {this._renderLatestScorecardButton()}
          {this._renderTabsHeader()}

          {activeTabIndex === 0 && (
            <GrossScoresTrend activeGraph="grossScoreTrend" />
          )}
          {activeTabIndex === 1 && (
            <GrossScoresTrend activeGraph="trendingHandicap" />
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Profile);
