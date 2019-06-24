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
    userSigninRequest: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired
  };
  state = {
    errors: {},
    loading: false,
    email: "omerartistic@gmail.com",
    password: "123456",
    hidePassword: true
  };

  email;
  password;

  componentWillMount() {
    const { userData } = this.props;

    userData && userData.token && Actions.reset("drawerMenu");
  }

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
    const { email, password } = this.state;
    if (this._validateForm()) {
      Keyboard.dismiss();

      // setTimeout(() => {
      //   Actions.reset("drawerMenu");
      // }, 500);
      this.password.blur();
      this.email.blur();

      const payload = {
        email,
        password
      };
      Util.showLoader(this);
      this.props.userSigninRequest(payload, data => {
        data && data.token && Actions.reset("drawerMenu");
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
    const { email, password, hidePassword } = this.state;
    return (
      <View style={[AppStyles.cardView, styles.cardBoard]}>
        <TextInput
          placeholder="Email"
          style={[AppStyles.inputStyle1, AppStyles.mBottom10]}
          autoCapitalize="none"
          selectionColor={Colors.black}
          value={email}
          ref={ref => (this.email = ref)}
          onChangeText={value => this.setState({ email: value })}
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
                  ? Images.password_eye
                  : Images.password_eye_crossed
              }
            />
          </ButtonView>
        </View>

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
        <ScrollView style={AppStyles.flex} keyboardShouldPersistTaps="always">
          {this.renderLoginForm()}
          {!Util.isPlatformAndroid() && <KeyboardSpacer />}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData
});

const actions = { userSigninRequest };

export default connect(
  mapStateToProps,
  actions
)(Login);
