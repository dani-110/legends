// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";
import { Text } from "../../../components";
import ListItem from "./ListItem";
import styles from "./styles";
import { AppStyles } from "../../../theme";
import Util from "../../../util";

class TournamentsTab extends Component {
  static propTypes = {
    tournamentsData: PropTypes.array.isRequired
  };

  static defaultProps = {};

  _renderHeader() {
    return (
      <View style={AppStyles.listHeaderWrapper}>
        <Text type="bold" style={AppStyles.flex}>
          Name
        </Text>
        <Text type="bold" style={{ width: 110 }} textAlign="center">
          Date
        </Text>
        <Text type="bold" style={{ width: 80 }} textAlign="center">
          State
        </Text>
      </View>
    );
  }

  _renderItem({ item }) {
    return <ListItem data={item} />;
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
    const { tournamentsData } = this.props;
    console.log({ tournamentsData });
    return (
      <View style={styles.container}>
        {this._renderListing(tournamentsData)}
      </View>
    );
  }
}
const mapStateToProps = ({ tournament }) => ({
  tournamentsData: tournament.poty.tournaments
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(TournamentsTab);
