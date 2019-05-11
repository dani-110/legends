// @flow

import _ from "lodash";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, Image, TextInput, ScrollView } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { INVALID_EMAIL_ERROR } from "../../constants";
import { CustomNavbar, Text, Button } from "../../components";
import styles from "./styles";
import { AppStyles, Images, Colors } from "../../theme";
import Util from "../../util";

class ForgotPassword extends Component {
  state = {
    email: ""
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
      Util.topAlertError(INVALID_EMAIL_ERROR);
      this.email.focus();

      return false;
    }

    return true;
  };

  _onSubmit = () => {
    if (this._validateForm()) {
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

  renderForm(email) {
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
          onChangeText={value => this.setState({ email: value })}
          returnKeyType="done"
          onSubmitEditing={this._onSubmit}
        />

        <Button
          background={Colors.green}
          color={Colors.white}
          style={[AppStyles.mTop10, AppStyles.mBottom15]}
          indicatorColor={Colors.white}
          onPress={this._onSubmit}
        >
          Reset Password
        </Button>
      </View>
    );
  }

  render() {
    const { email } = this.state;
    return (
      <View style={styles.container}>
        <CustomNavbar hasBorder={false} />
        <ScrollView style={AppStyles.basePadding}>
          <View
            style={[
              AppStyles.alignItemsCenter,
              AppStyles.mTop40,
              AppStyles.mBottom20
            ]}
          >
            <Image source={Images.forgot_lock} style={styles.lockImage} />
          </View>
          {this.renderForm(email)}
        </ScrollView>
        {!Util.isPlatformAndroid() && <KeyboardSpacer />}
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(ForgotPassword);
