// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";
import { Text } from "../../../components";
import MatchesTable from "./MatchesTable";
import styles from "./styles";
import { AppStyles } from "../../../theme";
import Util from "../../../util";

class MonthlyMatches extends Component {
  static propTypes = {
    monthlyMatchesData: PropTypes.array.isRequired
  };

  static defaultProps = {};

  _renderItem({ item, index }) {
    return <MatchesTable data={{ item, index }} />;
  }

  _renderListing(data) {
    return (
      <View style={AppStyles.pBottomListBottom}>
        <FlatList
          data={data}
          renderItem={this._renderItem}
          keyExtractor={Util.keyExtractor}
        />
      </View>
    );
  }

  render() {
    const { monthlyMatchesData } = this.props;
    return (
      <View style={[styles.container, AppStyles.baseMargin]}>
        {this._renderListing(monthlyMatchesData)}
      </View>
    );
  }
}
const mapStateToProps = ({ tournament }) => ({
  monthlyMatchesData: tournament.lcl.monthlyMatches
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(MonthlyMatches);
