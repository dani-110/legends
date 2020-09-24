// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import { SimpleLoader, EmptyStateText } from "../../../components";
import { getLclMonthlyMatchesRequest } from "../../../actions/TournamentActions";
import MatchesTable from "./MatchesTable";
import styles from "./styles";
import { AppStyles } from "../../../theme";
import Util from "../../../util";
import ExpendableItems from './MatchesTable/ExpendableItems';

class MonthlyMatches extends Component {
  static propTypes = {
    monthlyMatchesData: PropTypes.array.isRequired,
    isFetchingData: PropTypes.bool.isRequired,
    getLclMonthlyMatchesRequest: PropTypes.func.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    this.props.getLclMonthlyMatchesRequest();
  }

  _renderItem({ item, index }) {

    return <MatchesTable data={{ item, index }} />;
  }

  _renderListing(data) {
    debugger;
    const filteredData = _.chain(data)
      .groupBy("round")
      .map((v, i) => {
        return {
          round: i,
          playing_month: _.get(_.find(v, "playing_month"), "playing_month"),
          teams: v.map(val => [val.team1_name, val.team2_name, { isExpanded: val.isExpanded }, { details: val.details }, val.team1_score, val.team2_score]),
          isCollapsed: v.map(val => false),
          // ex: v.map(val => val.ex),

        }

      }

      )
      .value();

    return (
      <View style={AppStyles.flex}>
        <FlatList
          data={filteredData}
          renderItem={this._renderItem}
          keyExtractor={Util.keyExtractor}
        />

      </View>
    );
  }

  render() {
    const { monthlyMatchesData, isFetchingData } = this.props;
    return (
      <View style={[styles.container, AppStyles.baseMargin]}>
        {isFetchingData && monthlyMatchesData.length === 0 && <SimpleLoader />}
        {monthlyMatchesData.length === 0 && !isFetchingData && (
          <EmptyStateText />
        )}
        {monthlyMatchesData.length > 0 &&
          this._renderListing(monthlyMatchesData)}
      </View>
    );
  }
}
const mapStateToProps = ({ tournament }) => ({
  monthlyMatchesData: tournament.lcl.monthlyMatches,
  isFetchingData: tournament.lcl.isFetchingLeaderboard
});

const actions = { getLclMonthlyMatchesRequest };

export default connect(
  mapStateToProps,
  actions
)(MonthlyMatches);
