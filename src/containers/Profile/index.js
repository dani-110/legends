// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, Image as RNImage, ScrollView } from "react-native";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import {
  CustomNavbar,
  Image,
  Text,
  TopTabs,
  ButtonView,
  SimpleLoader
} from "../../components";
import { NAVBAR_THEME } from "../../constants";
import { getUserProfileRequest } from "../../actions/UserActions";
import styles from "./styles";
import { Images, AppStyles, Colors } from "../../theme";
import Scores from "../Dashboard/Scores";
import Util from "../../util";
import GrossScoresTrend from "./GrossScoresTrend";

class Profile extends Component {
  static propTypes = {
    getUserProfileRequest: PropTypes.func.isRequired,
    isFetchingProfile: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired
  };

  state = {
    activeTabIndex: 0
  };

  componentWillMount() {
    this.props.getUserProfileRequest();
  }

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

  _renderUserDetails({ name, picture }) {
    console.log({ name, picture });
    return (
      <View style={styles.userDetailsWrapper}>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: picture }}
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
          {name}
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
          onPress={Actions.dashboard_tab_scorecard}
        >
          <RNImage style={styles.calendarImage} source={Images.calendar} />
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
    const { isFetchingProfile, userData } = this.props;

    console.log({ userData });
    return (
      <View style={[styles.container, AppStyles.flex]}>
        <CustomNavbar
          title=""
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />

        {isFetchingProfile && _.isEmpty(userData) && <SimpleLoader />}

        {!_.isEmpty(userData) && (
          <ScrollView>
            {this._renderUserDetails(userData.user_info[0])}
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
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.profileData,
  isFetchingProfile: user.isFetchingProfileData
});
const actions = { getUserProfileRequest };

export default connect(
  mapStateToProps,
  actions
)(Profile);
