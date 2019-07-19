// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, SectionList } from "react-native";
import { getLivedataRequest } from "../../actions/LiveMatchesActions";
import { CustomNavbar, Text } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import ListItem from "./ListItem";
import styles from "./styles";
import { AppStyles } from "../../theme";

class LiveTab extends Component {
  static propTypes = {
    liveMatches: PropTypes.array.isRequired,
    getLivedataRequest: PropTypes.func.isRequired,
    isFetchingData: PropTypes.bool.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    this._getLivedataRequest();
  }

  _renderSectionHeader({ section: { title } }) {
    return (
      <View style={[AppStyles.mBottom10, AppStyles.mTop20]}>
        <Text type="bold" size="large">
          {title}
        </Text>
      </View>
    );
  }

  _getLivedataRequest = () => {
    this.props.getLivedataRequest();
  };

  _renderItem({ item, index, section }) {
    return <ListItem data={item} sectionTitle={section.title} />;
  }

  renderMatchesList() {
    const { liveMatches, isFetchingData } = this.props;
    return (
      <View style={[AppStyles.basePadding, AppStyles.flex]}>
        <SectionList
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          sections={liveMatches}
          keyExtractor={(item, index) => item + index}
          onRefresh={this._getLivedataRequest}
          refreshing={isFetchingData}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            if (!isFetchingData) {
              return <Text textAlign="center">No live matches</Text>;
            }
            return null;
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomNavbar
          title="Live Matches"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          hasBack={false}
        />
        {this.renderMatchesList()}
      </View>
    );
  }
}

const mapStateToProps = ({ liveMatches }) => ({
  liveMatches: liveMatches.realData,
  isFetchingData: liveMatches.isFetching
});

const actions = { getLivedataRequest };

export default connect(
  mapStateToProps,
  actions
)(LiveTab);
