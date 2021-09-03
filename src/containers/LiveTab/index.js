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
import { AppStyles, Colors } from "../../theme";

let loop = 0;
let arrPrevData = [];
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

  _renderSectionHeader({ section: { title, data } }) {

    console.log("title-->",title);
    debugger
    return (
      <View style={[AppStyles.mBottom10, (title === "LIVE" ? (AppStyles.mTop0) : (AppStyles.mTop20))]}>
        <Text type="bold" size="large">
          {(title.startsWith("MY_MATCHES")?"MY":title)+ " MATCHES"}
        </Text>
        {/* {(title !== "LIVE") ? (
          <Text size="large" color={Colors.black2Tinted}>
            {data[0].match_date_format}
          </Text>
        ) : null} */}

      </View>
    );
  }

  _getLivedataRequest = () => {
    this.props.getLivedataRequest();
  };


  _renderItem({ item, index, section }) {

    debugger

    arrPrevData.push(item.match_date_format);
    let foo = loop > 0 ? arrPrevData[loop - 1] : "";
    loop++;

    debugger

    return <ListItem data={item} matchDate={item.match_date} sectionTitle={section.title} matchFoo={foo} />;
  }

  renderMatchesList() {
    console.log("mymatches-->", this.props)

    const { liveMatches, isFetchingData } = this.props;
    loop = 0;
    arrPrevData = [];

    console.log("mymatches-->",liveMatches)
    debugger

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
          title="Calendar"
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
