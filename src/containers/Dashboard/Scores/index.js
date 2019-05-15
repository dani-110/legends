// @flow
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "../../../components";
import styles from "./styles";
// import Util from "../../../util";
import { AppStyles, Colors } from "../../../theme";

class Scores extends React.PureComponent {
  static propTypes = {
    userData: PropTypes.object.isRequired
  };

  static defaultProps = {};

  getSingleScore = (label, labelOnTop, score, bgColor) => (
    <View style={labelOnTop && { marginTop: -20 }}>
      {labelOnTop && <Text textAlign="center">{label}</Text>}
      <View
        style={[
          styles.circle,
          AppStyles.centerInner,
          AppStyles.mTop10,
          AppStyles.mBottom10,
          { backgroundColor: bgColor }
        ]}
      >
        <Text color={bgColor !== "#ffffff" ? Colors.white : Colors.black}>
          {score}
        </Text>
      </View>
      {!labelOnTop && <Text textAlign="center">{label}</Text>}
    </View>
  );

  _renderUserScore = () => {
    const {
      userData: { handicap, scores }
    } = this.props;
    return (
      <View style={AppStyles.baseMargin}>
        <Text color={Colors.black}>Handicap {handicap}</Text>
        <View style={[AppStyles.flexRow, AppStyles.spaceBetween]}>
          {this.getSingleScore("blue", false, scores.blue, "#033FFF")}
          {this.getSingleScore("white", false, scores.white, "#ffffff")}
          {this.getSingleScore("FIR", true, scores.fir, "#00BC56")}
          {this.getSingleScore("GIR", true, scores.gir, "#FF5733")}
          {this.getSingleScore("PPR", true, scores.ppr, "#293045")}
        </View>
      </View>
    );
  };

  render() {
    return <View>{this._renderUserScore()}</View>;
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.data
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Scores);
