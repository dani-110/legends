// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Switch } from "react-native";
import { CustomNavbar, Text } from "../../components";
import styles from "./styles";
import Util from "../../util";
import { NAVBAR_THEME } from "../../constants";
import { AppStyles } from "../../theme";

class Settings extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    settingsData: [
      { verbose: "All Notifiactions", isEnable: true },
      { verbose: "All Events", isEnable: false },
      { verbose: "Latest News", isEnable: false }
    ]
  };

  _renderSettings() {
    const { settingsData } = this.state;
    return settingsData.map((item, index) => this._renderItem(item, index));
  }

  _renderItem(item, index) {
    return (
      <View
        style={[
          AppStyles.flexRow,
          AppStyles.spaceBetween,
          AppStyles.alignItemsCenter,
          AppStyles.basePadding,
          AppStyles.borderBottomGrey
        ]}
        key={index}
      >
        <Text>{item.verbose}</Text>
        <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
          <Switch
            onValueChange={value => this._toggleSwitch(index, value)}
            value={item.isEnable}
          />
          <Text style={AppStyles.mLeft10}>
            {item.isEnable === true ? "On" : "Off"}{" "}
          </Text>
        </View>
      </View>
    );
  }

  _toggleSwitch(key, value) {
    this.setState(state => {
      const settingsData = state.settingsData.map((item, index) => {
        if (key === index) {
          item.isEnable = value;
        }
        return item;
      });

      return {
        settingsData
      };
    });
  }

  render() {
    return (
      <View style={[styles.container]}>
        <CustomNavbar
          title="Settings"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        <View style={[AppStyles.paddingVerticalBase, AppStyles.flex]}>
          {this._renderSettings()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Settings);