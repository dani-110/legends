// @flow

import _ from "lodash";
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, TextInput, ScrollView, Keyboard } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Actions } from "react-native-router-flux";
import { CustomNavbar, Text, Button } from "../../components";
import styles from "./styles";
import { AppStyles, Images, Colors } from "../../theme";
import Util from "../../util";
import { ERROR_MESSAGES } from "../../constants";
import { forgotPasswordRequest } from "../../actions/UserActions";

class ForgotPassword extends Component {
  static propTypes = {
    forgotPasswordRequest: PropTypes.func.isRequired
  };

  state = {
    email: "",
    loading: false
  };

  _validateForm = () => {
    const { email } = this.state;
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

    return true;
  };

  _onSubmit = () => {
    const { email } = this.state;
    if (this._validateForm()) {
      Keyboard.dismiss();

      this.email.blur();

      const payload = {
        email
      };
      Util.showLoader(this);
      this.props.forgotPasswordRequest(payload, data => {
        this.setState({
          email: ""
        });
        Util.hideLoader(this);
        Util.topAlert(
          "Please check your email to reset you password.",
          "success"
        );
        if (data) {
          setTimeout(() => {
            Actions.jump("login");
          }, 3000);
        }
      });
    }
  };

  renderForm(email, loading) {
    return (
      <View style={{ width: "85%", alignSelf: "center" }}>
        <Text size="xLarge" type="bold" textAlign="center">
          Forgot your password?
        </Text>

        <Text textAlign="center" color={Colors.grey3} style={AppStyles.mTop15}>
          Enter your email to receive your password reset instructions
        </Text>

        <TextInput
          placeholder="Email"
          style={[AppStyles.inputStyle1, AppStyles.mTop40, AppStyles.mBottom10]}
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor={Colors.black}
          value={email}
          ref={ref => (this.email = ref)}
          onChangeText={value =>
            this.setState({ email: value.replace(/\s+/g, "") })
          }
          returnKeyType="done"
          onSubmitEditing={this._onSubmit}
        />

        <Button
          background={Colors.green}
          color={Colors.white}
          style={[AppStyles.mTop10, AppStyles.mBottom15]}
          indicatorColor={Colors.white}
          onPress={this._onSubmit}
          isLoading={loading}
        >
          Reset Password
        </Button>
      </View>
    );
  }

  render() {
    const { email, loading } = this.state;
    return (
      <View style={styles.container}>
        <CustomNavbar hasBorder={false} />
        <ScrollView
          style={AppStyles.basePadding}
          keyboardShouldPersistTaps="always"
        >
          <View
            style={[
              AppStyles.alignItemsCenter,
              AppStyles.mTop40,
              AppStyles.mBottom20
            ]}
          >
            <Image source={Images.forgot_lock} style={styles.lockImage} />
          </View>
          {this.renderForm(email, loading)}
        </ScrollView>
        {!Util.isPlatformAndroid() && <KeyboardSpacer />}
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = { forgotPasswordRequest };

export default connect(
  mapStateToProps,
  actions
)(ForgotPassword);
