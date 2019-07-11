// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import { Text, SimpleLoader, EmptyStateText } from "../../../components";
import { getLclPointsTableRequest } from "../../../actions/TournamentActions";
import styles from "./styles";
import ListItem from "./ListItem";
import Util from "../../../util";
import { AppStyles } from "../../../theme";

class PointsTableTab extends Component {
  static propTypes = {
    pointsTableData: PropTypes.array.isRequired,
    isFetchingData: PropTypes.bool.isRequired,
    getLclPointsTableRequest: PropTypes.func.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    this.props.getLclPointsTableRequest();
  }

  _renderItem({ item }) {
    return <ListItem data={item} />;
  }

  _renderHeader() {
    return (
      <View style={styles.listHeaderWrapper}>
        <Text type="bold" style={{ width: 80 }}>
          Position
        </Text>
        <Text type="bold" style={AppStyles.flex} textAlign="left">
          Team
        </Text>
        <Text type="bold" style={{ width: 68 }}>
          Points
        </Text>
      </View>
    );
  }

  _renderListing(data) {
    return (
      <View style={AppStyles.flex}>
        <FlatList
          data={data}
          renderItem={this._renderItem}
          keyExtractor={Util.keyExtractor}
          ListHeaderComponent={this._renderHeader}
          stickyHeaderIndices={[0]}
        />
      </View>
    );
  }

  render() {
    const { pointsTableData, isFetchingData } = this.props;
    return (
      <View style={styles.container}>
        {isFetchingData && pointsTableData.length === 0 && <SimpleLoader />}
        {pointsTableData.length === 0 && !isFetchingData && <EmptyStateText />}
        {pointsTableData.length > 0 && this._renderListing(pointsTableData)}
      </View>
    );
  }
}

const mapStateToProps = ({ tournament }) => ({
  pointsTableData: tournament.lcl.pointsTable,
  isFetchingData: tournament.lcl.isFetchingLeaderboard
});

const actions = { getLclPointsTableRequest };

export default connect(
  mapStateToProps,
  actions
)(PointsTableTab);
