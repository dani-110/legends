// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { View } from "react-native";
import Orientation from "react-native-orientation";
import { CustomNavbar } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";

class ScoreCard extends Component {
  componentDidMount() {
    Orientation.lockToPortrait();
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomNavbar
          title="Karachi Golf Club - Red & Yellow Screen"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(ScoreCard);
