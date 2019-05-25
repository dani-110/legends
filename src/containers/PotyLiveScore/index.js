// @flow
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";
import { CustomNavbar, TopTabs } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import Tabbar from "../../components/Tabbar";
import PotyScoreTable from "./PotyScoreTable";
import Util from "../../util";

class PotyLiveScore extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.array.isRequired
  };

  static defaultProps = {};

  state = {
    activeTabIndex: 0
  };

  TABS_DATA = [
    {
      title: "Gross",
      onPress: () => Util.setSelectedTabIndex(this, 0)
    },
    {
      title: "Net",
      onPress: () => Util.setSelectedTabIndex(this, 1)
    }
  ];

  _renderTabsHeader() {
    return (
      <TopTabs data={this.TABS_DATA} activeIndex={this.state.activeTabIndex} />
    );
  }

  render() {
    const { liveScoreData } = this.props;
    const { activeTabIndex } = this.state;

    return (
      <View style={styles.container}>
        <CustomNavbar
          title="Stroke Play Individual Net"
          subtitle="Karachi Golf Club - Red &amp; Yellow"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        {this._renderTabsHeader()}

        {activeTabIndex === 0 && (
          <PotyScoreTable liveScoreData={liveScoreData} />
        )}
        {activeTabIndex === 1 && (
          <PotyScoreTable liveScoreData={liveScoreData} />
        )}

        <Tabbar defaultTabbar={false} />
      </View>
    );
  }
}

const mapStateToProps = ({ liveScore }) => ({
  liveScoreData: liveScore.poty
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(PotyLiveScore);
