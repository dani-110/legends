// @flow
import _ from "lodash";
import { connect } from "react-redux";
import { View, Image, Keyboard, TextInput, ScrollView } from "react-native";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { INVALID_EMAIL_ERROR, INVALID_PASSWORD_ERROR } from "../../constants";
import { userSigninRequest } from "../../actions/UserActions";
import { Text, ButtonView, Loader, Button } from "../../components";
import { Images, AppStyles, Colors } from "../../theme";
import styles from "./styles";
import Util from "../../util";

class Login extends Component {
  static propTypes = {
    userSigninRequest: PropTypes.func.isRequired
  };
  state = {
    errors: {},
    loading: false,
    email: "",
    password: ""
  };

  email;
  password;

  _onSubmitEmail = () => {
    this.password.focus();
  };

  _onSubmitPassword = () => {
    this.password.blur();
  };

  _validateForm = () => {
    const { email, password } = this.state;
    if (_.isEmpty(email)) {
      // email is required
      Util.isRequiredMessage("email");
      this.email.focus();
      return false;
    }
    if (!Util.isEmailValid(email)) {
      // invalid email
      Util.topAlertError(INVALID_EMAIL_ERROR);
      this.email.focus();

      return false;
    }
    if (_.isEmpty(password)) {
      // password is required
      Util.isRequiredMessage("password");
      this.password.focus();
      return false;
    }
    if (!Util.isPasswordValid(password)) {
      // invalid password
      Util.topAlertError(INVALID_PASSWORD_ERROR);
      this.password.focus();
      return false;
    }

    return true;
  };

  _onSubmitEmail = () => {
    this.password.focus();
  };

  _onSubmit = () => {
    if (this._validateForm()) {
      Keyboard.dismiss();
      /* this.password.blur();
      this.email.blur();

      const payload = {
        email: this.emailValue,
        password: this.passwordValue,
        device_type: Platform.OS
        // device_token: asd
      };
      Util.showLoader(this);
      this.props.userSigninRequest(payload, data => {}); */
    }
  };

  renderHeroArea() {
    return (
      <View style={[AppStyles.centerInner, AppStyles.mBottom30]}>
        <Image
          source={Images.logo}
          style={[AppStyles.logoImage, styles.logoImage]}
        />
      </View>
    );
  }

  renderLoginForm() {
    const { email, password } = this.state;
    return (
      <View style={[AppStyles.cardView, styles.cardBoard]}>
        <TextInput
          placeholder="Email"
          style={AppStyles.inputStyle1}
          autoCapitalize="none"
          selectionColor={Colors.black}
          value={email}
          ref={ref => (this.email = ref)}
          onChangeText={value => this.setState({ email: value })}
          returnKeyType="next"
          onSubmitEditing={this._onSubmitEmail}
        />

        <TextInput
          placeholder="Password"
          style={AppStyles.inputStyle1}
          secureTextEntry
          selectionColor={Colors.black}
          value={password}
          ref={ref => (this.password = ref)}
          onChangeText={value => this.setState({ password: value })}
          returnKeyType="done"
          onSubmitEditing={this._onSubmit}
        />

        <ButtonView style={AppStyles.mTop5} onPress={Actions.forgotPassword}>
          <Text textAlign="right" color={Colors.green}>
            Forgot your password?
          </Text>
        </ButtonView>

        <Button
          background={Colors.green}
          color={Colors.white}
          style={[AppStyles.mTop20]}
          indicatorColor={Colors.white}
          onPress={this._onSubmit}
        >
          LOG IN
        </Button>
      </View>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={Images.login_header_wrapper}
          style={styles.heroBg}
          resizeMode="stretch"
        />
        {this.renderHeroArea()}
        <ScrollView style={AppStyles.flex} keyboardShouldPersistTaps>
          {this.renderLoginForm()}
          {!Util.isPlatformAndroid() && <KeyboardSpacer />}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = { userSigninRequest };

export default connect(
  mapStateToProps,
  actions
)(Login);