// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, Image, ImageBackground } from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import Orientation from "react-native-orientation";

import { Images, Colors } from "../../theme";
import styles from "./styles";
import Util from "../../util";

class Welcome extends Component {
  static propTypes = {
    userData: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { userData } = this.props;
    Orientation.lockToPortrait();
    setTimeout(() => {
      if (!_.isEmpty(userData) && !_.isEmpty(userData.token)) {
        Actions.reset("drawerMenu");
      } else {
        Actions.reset("login");
      }
    }, 5000);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Images.splash_background}
          style={styles.imageBackground}
          resizeMode="stretch"
        >
          <Image
            source={Images.splash_logo}
            style={{ position: 'absolute', height: 340 / 2.5, width: 246 / 2.5, justifyContent: 'flex-end', bottom: 40, left: 30, }}
          />
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Welcome);
