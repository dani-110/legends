// @flow
import _ from "lodash";
import { connect } from "react-redux";
import { View, Image, Keyboard, TextInput, ScrollView } from "react-native";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { userSigninRequest } from "../../actions/UserActions";
import { Text, ButtonView, Button } from "../../components";
import { Images, AppStyles, Colors } from "../../theme";
import styles from "./styles";
import Util from "../../util";
import { ERROR_MESSAGES } from "../../constants";

class Login extends Component {
  static propTypes = {
    userSigninRequest: PropTypes.func.isRequired
  };
  state = {
    errors: {},
    loading: false,
    email: "",//"arsalan@livewiregroup.co",//javedfarooq@gmail.com",
    password: "",//farooq77, "Amdani001",
    hidePassword: true
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
      Util.topAlertError(ERROR_MESSAGES.invalid_email_error);
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
      Util.topAlertError(ERROR_MESSAGES.invalid_password_error);
      this.password.focus();
      return false;
    }

    return true;
  };

  _onSubmitEmail = () => {
    this.password.focus();
  };

  _onSubmit = () => {
    const { email, password } = this.state;
    if (this._validateForm()) {
      Keyboard.dismiss();

      this.password.blur();
      this.email.blur();

      const payload = {
        email,
        password
      };
      Util.showLoader(this);
      this.props.userSigninRequest(payload, data => {
        Util.hideLoader(this);
        if (data && data.token) Actions.reset("drawerMenu");
      });
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
    const { email, password, hidePassword, loading } = this.state;
    return (
      <View style={[AppStyles.cardView, styles.cardBoard]}>
        <TextInput
          placeholder="Email"
          style={[AppStyles.inputStyle1, AppStyles.mBottom10]}
          autoCapitalize="none"
          selectionColor={Colors.black}
          value={email}
          ref={ref => (this.email = ref)}
          onChangeText={value =>
            this.setState({ email: value.replace(/\s+/g, "") })
          }
          returnKeyType="next"
          onSubmitEditing={this._onSubmitEmail}
        />
        <View style={AppStyles.mBottom10}>
          <TextInput
            placeholder="Password"
            style={[AppStyles.inputStyle1, AppStyles.pRight30]}
            secureTextEntry={hidePassword}
            selectionColor={Colors.black}
            value={password}
            ref={ref => (this.password = ref)}
            onChangeText={value => this.setState({ password: value })}
            returnKeyType="done"
            onSubmitEditing={this._onSubmit}
          />
          <ButtonView
            style={styles.showPasswordBtn}
            onPress={() => {
              this.setState({
                hidePassword: !this.state.hidePassword
              });
            }}
          >
            <Image
              source={
                this.state.hidePassword
                  ? Images.password_eye_crossed
                  : Images.password_eye
              }
            />
          </ButtonView>
        </View>

        <View style={[AppStyles.alignItemsFlexEnd]}>
          <ButtonView style={AppStyles.mTop5} onPress={Actions.forgotPassword}>
            <Text textAlign="right" color={Colors.green}>
              Forgot your password?
            </Text>
          </ButtonView>
        </View>

        <Button
          background={Colors.green}
          color={Colors.white}
          style={[AppStyles.mTop20]}
          indicatorColor={Colors.white}
          onPress={this._onSubmit}
          isLoading={loading}
        >
          LOGIN
        </Button>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={Images.login_header_wrapper}
          style={styles.heroBg}
          resizeMode="stretch"
        />
        {this.renderHeroArea()}
        <ScrollView style={AppStyles.flex} keyboardShouldPersistTaps="always">
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
