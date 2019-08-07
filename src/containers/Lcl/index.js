// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import PropTypes from "prop-types";
import { setSelectedTab } from "../../actions/GeneralActions";
import { CustomNavbar, TopTabs } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import PointsTableTab from "./PointsTableTab";
import MonthlyMatches from "./MonthlyMatches";
import styles from "./styles";
import Util from "../../util";

class Lcl extends Component {
  static propTypes = {
    setSelectedTab: PropTypes.func.isRequired
  };

  state = {
    activeTabIndex: 0
  };

  componentWillMount() {
    this.props.setSelectedTab(-1);
  }

  TABS_DATA = [
    {
      image: "sort",
      title: "Points Table",
      onPress: () => Util.setSelectedTabIndex(this, 0)
    },
    {
      image: "calendar",
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

const mapStateToProps = () => ({});

const actions = { setSelectedTab };

export default connect(
  mapStateToProps,
  actions
)(Lcl);
