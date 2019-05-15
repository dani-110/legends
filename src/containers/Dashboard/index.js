// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { View } from "react-native";
import { CustomNavbar, GreenBgFlayer } from "../../components";
import PotyLeaderboardDB from "./PotyLeaderboardDB";
import styles from "./styles";
import { NAVBAR_THEME } from "../../constants";
import Scores from "./Scores";
import { from } from "rxjs";

class Dashboard extends Component {
  componentDidMount() {
    console.log({ prop: this.props });
  }

  renderLeaderboard() {
    return <PotyLeaderboardDB />;
  }

  renderScores() {
    return <Scores />;
  }

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
        {this.renderScores()}
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
