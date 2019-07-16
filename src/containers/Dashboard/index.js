// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { getDashboardDataRequest } from "../../actions/GeneralActions";
import { CustomNavbar, GreenBgFlayer } from "../../components";
import PotyLeaderboardDB from "./PotyLeaderboardDB";
import NewsItem from "./NewsItem";
import Scores from "./Scores";
import styles from "./styles";
import { NAVBAR_THEME } from "../../constants";

class Dashboard extends Component {
  static propTypes = {
    getDashboardDataRequest: PropTypes.func.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    this.props.getDashboardDataRequest();
  }

  renderLeaderboard() {
    return <PotyLeaderboardDB />;
  }

  renderScores() {
    return <Scores />;
  }

  renderLatestNews() {
    return <NewsItem />;
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomNavbar
          hasBack={false}
          title="POTY Leaderboard"
          hasBorder={false}
          theme={NAVBAR_THEME.GREEN}
          titleAlign="left"
        />

        <ScrollView>
          <GreenBgFlayer />
          {this.renderLeaderboard()}
          {this.renderScores()}
          {this.renderLatestNews()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = { getDashboardDataRequest };

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
