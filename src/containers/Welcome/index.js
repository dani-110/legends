// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, Image, ImageBackground } from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";

import { Images, Colors } from "../../theme";
import styles from "./styles";
import Util from "../../util";

class Welcome extends Component {
  static propTypes = {
    userData: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { userData } = this.props;

    setTimeout(() => {
      // Actions.reset("login");
      Actions.notification_tab();
    }, 1000);

    /* setTimeout(() => {
      if (!_.isEmpty(userData) && !_.isEmpty(userData.access_token)) {
        Actions.reset("dashboard");
      } else {
        Actions.reset("login");
      }
    }, 0); */
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Images.splash_bg}
          style={styles.imageBackground}
          resizeMode="stretch"
        >
          <Image
            source={Images.logo}
            style={styles.image}
            resizeMode="contain"
          />
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.data
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Welcome);
