// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { View } from "react-native";
import {
  CustomNavbar,
  GreenBgFlayer,
  PotyLeaderboardDB
} from "../../components";
import styles from "./styles";
import { NAVBAR_THEME } from "../../constants";

class Dashboard extends Component {
  componentDidMount() {
    console.log({ prop: this.props });
  }

  renderLeaderboard() {
    return <PotyLeaderboardDB />;
  }

  renderUserStatistics() {}

  render() {
    return (
      <View style={styles.container}>
        <CustomNavbar
          hasBack={false}
          title="POTY Leaderboard"
          hasBorder={false}
          theme={NAVBAR_THEME.GREEN}
        />
        <GreenBgFlayer />
        {this.renderLeaderboard()}
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
