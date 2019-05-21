// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import { Text } from "../../../components";
import styles from "./styles";
import ListItem from "./ListItem";
import Util from "../../../util";
import { AppStyles } from "../../../theme";

class PointsTableTab extends Component {
  static propTypes = {
    pointsTableData: PropTypes.array.isRequired
  };

  static defaultProps = {};

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
      <View style={AppStyles.pBottomListBottom}>
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
    const { pointsTableData } = this.props;
    return (
      <View style={styles.container}>
        {this._renderListing(pointsTableData)}
      </View>
    );
  }
}

const mapStateToProps = ({ tournament }) => ({
  pointsTableData: tournament.lcl.pointsTable
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(PointsTableTab);
