// @flow
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";
import ScoreTable from "../../components/ScoreTable";
import { CustomNavbar } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import { setTabbarType } from "../../actions/GeneralActions";

class LmpLiveScore extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.object.isRequired,
    setTabbarType: PropTypes.func.isRequired
  };

  static defaultProps = {};

  static onEnter() {
    if (LmpLiveScore.instance) {
      LmpLiveScore.instance._onEnter();
    }
  }

  static onExit() {
    if (LmpLiveScore.instance) {
      LmpLiveScore.instance._onExit();
    }
  }

  constructor(props) {
    super(props);
    LmpLiveScore.instance = this;
  }

  _onEnter() {
    this.props.setTabbarType(false);
  }

  _onExit() {
    this.props.setTabbarType(true);
  }

  _renderScoreTable() {
    const { liveScoreData } = this.props;
    return <ScoreTable liveScoreData={liveScoreData} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomNavbar
          title="LMP Better Ball"
          subtitle="DHA Golf Club"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        {this._renderScoreTable()}
      </View>
    );
  }
}

const mapStateToProps = ({ liveScore }) => ({
  liveScoreData: liveScore.lmp
});

const actions = { setTabbarType };

export default connect(
  mapStateToProps,
  actions
)(LmpLiveScore);
