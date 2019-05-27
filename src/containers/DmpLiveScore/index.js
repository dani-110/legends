// @flow
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";
import ScoreTable from "../../components/ScoreTable";
import { CustomNavbar } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import Tabbar from "../../components/Tabbar";

class DmpLiveScore extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.object.isRequired
  };

  static defaultProps = {};

  _renderScoreTable() {
    const { liveScoreData } = this.props;
    return <ScoreTable liveScoreData={liveScoreData} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomNavbar
          title="DMP Better Ball"
          subtitle="DHA Golf Club"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        {this._renderScoreTable()}
        <Tabbar defaultTabbar={false} />
      </View>
    );
  }
}

const mapStateToProps = ({ liveScore }) => ({
  liveScoreData: liveScore.dmp
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(DmpLiveScore);
