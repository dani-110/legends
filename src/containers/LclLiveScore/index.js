// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";
import { CustomNavbar, TopTabs } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import Util from "../../util";
import SinglesOne from "./SinglesOne";
import Foursome from "./Foursome";
import SinglesTwo from "./SinglesTwo";
import { setTabbarType } from "../../actions/GeneralActions";

class LclLiveScore extends Component {
  static propTypes = {
    setTabbarType: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

  static defaultProps = {};

  static onEnter() {
    if (LclLiveScore.instance) {
      LclLiveScore.instance._onEnter();
    }
  }

  static onExit() {
    if (LclLiveScore.instance) {
      LclLiveScore.instance._onExit();
    }
  }

  constructor(props) {
    super(props);
    LclLiveScore.instance = this;
  }

  state = {
    activeTabIndex: 0
  };

  _onEnter() {
    this.props.setTabbarType(false);
  }

  _onExit() {
    this.props.setTabbarType(true);
  }

  TABS_DATA = [
    {
      title: "Singles 1",
      onPress: () => Util.setSelectedTabIndex(this, 0)
    },
    {
      title: "Foursome",
      onPress: () => Util.setSelectedTabIndex(this, 1)
    },
    {
      title: "Singles 2",
      onPress: () => Util.setSelectedTabIndex(this, 2)
    }
  ];

  _renderTabsHeader() {
    return (
      <TopTabs data={this.TABS_DATA} activeIndex={this.state.activeTabIndex} />
    );
  }

  render() {
    const { activeTabIndex } = this.state;
    const {
      data: { title, venue }
    } = this.props;
    return (
      <View style={[styles.container]}>
        <CustomNavbar
          title={title}
          subtitle={venue}
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        {this._renderTabsHeader()}
        {activeTabIndex === 0 && <SinglesOne data={this.props.data} />}
        {activeTabIndex === 1 && <Foursome data={this.props.data} />}
        {activeTabIndex === 2 && <SinglesTwo data={this.props.data} />}
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = { setTabbarType };

export default connect(
  mapStateToProps,
  actions
)(LclLiveScore);
