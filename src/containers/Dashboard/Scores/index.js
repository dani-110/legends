// @flow
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text, ButtonView } from "../../../components";
import styles from "./styles";
// import Util from "../../../util";
import { AppStyles, Colors } from "../../../theme";

class Scores extends React.Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
    showViewProfile: PropTypes.bool
  };

  static defaultProps = {
    showViewProfile: true
  };

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
        <Text color={bgColor !== Colors.white ? Colors.white : Colors.black}>
          {score}
        </Text>
      </View>
      {!labelOnTop && (
        <Text textAlign="center" color={Colors.grey}>
          {label}
        </Text>
      )}
    </View>
  );

  _renderUserScore = () => {
    const {
      userData: { handicap, scores }
    } = this.props;
    return (
      <View style={[AppStyles.doubleBaseMargin, AppStyles.mBottom10]}>
        <Text color={Colors.black}>
          Handicap <Text>{handicap}</Text>
        </Text>
        <View style={[AppStyles.flexRow, AppStyles.spaceBetween]}>
          {this.getSingleScore("blue", false, scores.blue, Colors.blue)}
          {this.getSingleScore("white", false, scores.white, Colors.white)}
          {this.getSingleScore("FIR", true, scores.fir, Colors.green)}
          {this.getSingleScore("GIR", true, scores.gir, Colors.red2)}
          {this.getSingleScore("PPR", true, scores.ppr, Colors.black2)}
        </View>

        {this.props.showViewProfile && (
          <ButtonView style={AppStyles.alignItemsFlexEnd}>
            <Text
              type="bold"
              size="xSmall"
              color={Colors.green}
            >{`VIEW PROFILE >`}</Text>
          </ButtonView>
        )}
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
