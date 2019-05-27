// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";
import { Text, CustomNavbar, TopTabs } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import Util from "../../util";
import SinglesOne from "./SinglesOne";
import { AppStyles } from "../../theme";
import Foursome from "./Foursome";
import SinglesTwo from "./SinglesTwo";
import Tabbar from "../../components/Tabbar";

class LclLiveScore extends Component {
  state = {
    activeTabIndex: 0
  };

  TABS_DATA = [
    {
      title: "Singles 1",
      onPress: () => Util.setSelectedTabIndex(this, 0)
    },
    {
      title: "Foursome",
      onPress: () => Util.setSelectedTabIndex(this, 1)
    },
    {
      title: "Singles 2",
      onPress: () => Util.setSelectedTabIndex(this, 2)
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
      <View style={[styles.container]}>
        <CustomNavbar
          title="LCL Matchplay"
          subtitle="DHA Golf Club"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        {this._renderTabsHeader()}
        {activeTabIndex === 0 && <SinglesOne />}
        {activeTabIndex === 1 && <Foursome />}
        {activeTabIndex === 2 && <SinglesTwo />}
        {<Tabbar defaultTabbar={false} />}
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(LclLiveScore);
