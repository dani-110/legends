// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { CustomNavbar, TopTabs } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import PointsTableTab from "./PointsTableTab";
import MonthlyMatches from "./MonthlyMatches";
import styles from "./styles";
import Util from "../../util";

export default class Lcl extends Component {
  state = {
    activeTabIndex: 1
  };
  TABS_DATA = [
    {
      image: "sort",
      title: "Points Table",
      onPress: () => Util.setSelectedTabIndex(this, 0)
    },
    {
      image: "sort",
      title: "Monthly Matches",
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
          title="LCL"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        {this._renderTabsHeader()}
        {activeTabIndex === 0 && <PointsTableTab />}
        {activeTabIndex === 1 && <MonthlyMatches />}
      </View>
    );
  }
}
