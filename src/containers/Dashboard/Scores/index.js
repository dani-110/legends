// @flow
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import AnimateNumber from "react-native-animate-number";
import { Text, ButtonView, SimpleLoader } from "../../../components";
import { getUserProfileRequest } from "../../../actions/UserActions";
import styles from "./styles";
// import Util from "../../../util";
import { AppStyles, Colors } from "../../../theme";
import { ScrollView } from "react-native-gesture-handler";

class Scores extends React.Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
    showViewProfile: PropTypes.bool,
    getUserProfileRequest: PropTypes.func.isRequired,
    isFetchingProfile: PropTypes.bool.isRequired
  };

  static defaultProps = {
    showViewProfile: true
  };

  componentWillMount() {
    this.props.getUserProfileRequest();
  }

  getSingleScore = (label, labelOnTop, score, bgColor, suffix: null) => (
    <View style={labelOnTop && { marginTop: -20 }}>
      <View style={{ marginLeft: 10 }}>
        {labelOnTop && <Text textAlign="center">{label}</Text>}
      </View>
      <View
        style={[
          styles.circle,
          AppStyles.centerInner,
          AppStyles.mTop10,
          AppStyles.mBottom10,
          AppStyles.mLeft10,
          { backgroundColor: bgColor }
        ]}
      >
        <Text
          size="small"
          color={bgColor !== Colors.white ? Colors.white : Colors.black}
        >
          <AnimateNumber
            value={score}
            formatter={val =>
              suffix
                ? `${Math.round(val * 10) / 10}${suffix}`
                : `${Math.round(val * 10) / 10}`
            }
            countBy={1}
            interval={42}
          />
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
      userData: {
        blue_tee_handicap,
        current_handicap,
        fir,
        gir,
        ppr,
        white_tee_handicap
      }
    } = this.props;

    return (
      <View style={[AppStyles.doubleBaseMargin, AppStyles.mBottom10]}>
        <ScrollView horizontal={true}>
          <View>
            <Text color={Colors.black}>
              Handicap{" "}
              <Text color={Colors.blue}>
                {Math.round(current_handicap * 10) / 10 || 0}
              </Text>
            </Text>
            <View style={[AppStyles.flexRow, AppStyles.spaceBetween]}>
              {this.getSingleScore(
                "Blue",
                false,
                Math.round(blue_tee_handicap * 10) / 10,
                Colors.blue
              )}
              {this.getSingleScore(
                "White",
                false,
                Math.round(white_tee_handicap * 10) / 10,
                Colors.white
              )}
              {this.getSingleScore(
                "FIR",
                true,
                Math.round(fir * 10) / 10,
                Colors.green,
                "%"
              )}
              {this.getSingleScore(
                "GIR",
                true,
                Math.round(gir * 10) / 10,
                Colors.red2,
                "%"
              )}
              {this.getSingleScore(
                "PPR",
                true,
                Math.round(ppr * 10) / 10,
                Colors.black2
              )}
              {this.getSingleScore(
                "WIN",
                true,
                Math.round(ppr * 10) / 10,
                Colors.purple
              )}

            </View>
          </View>
        </ScrollView>

        {this.props.showViewProfile && (
          <ButtonView
            style={AppStyles.alignItemsFlexEnd}
            onPress={Actions.profile}
          >
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
    const { isFetchingProfile, userData } = this.props;
    return (
      <View style={{ minHeight: 160 }}>
        {isFetchingProfile && _.isEmpty(userData) && <SimpleLoader />}
        {!_.isEmpty(userData) && this._renderUserScore()}
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: !_.isEmpty(user.profileData) ? user.profileData.user_info[0] : {},
  isFetchingProfile: user.isFetchingProfileData
});

const actions = { getUserProfileRequest };

export default connect(
  mapStateToProps,
  actions
)(Scores);
