// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { View } from "react-native";
import { CustomNavbar, TopTabs } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import LeaderboardTab from "./LeaderboardTab";
import TournamentsTab from "./TournamentsTab";
import styles from "./styles";
import Util from "../../util";

class Poty extends Component {
  state = {
    activeTabIndex: 0
  };
  TABS_DATA = [
    {
      image: "sort",
      title: "Leaderboard",
      onPress: () => Util.setSelectedTabIndex(this, 0)
    },
    {
      image: "tournament",
      title: "Tournaments",
      onPress: () => Util.setSelectedTabIndex(this, 1)
    }
  ];
  _renderTabsHeader() {
    return (
      <TopTabs data={this.TABS_DATA} activeIndex={this.state.activeTabIndex} />
    );
  }

  render() {
    const { activeTabIndex } = this.state;
    return (
      <View style={styles.container}>
        <CustomNavbar
          title="POTY"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="left"
        />
        {this._renderTabsHeader()}
        {activeTabIndex === 0 && <LeaderboardTab />}
        {activeTabIndex === 1 && <TournamentsTab />}
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Poty);
