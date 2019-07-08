// @flow
import _ from "lodash";
import { Platform, Linking } from "react-native";
import moment from "moment";
import { MessageBarManager } from "react-native-message-bar";
import DataHandler from "../services/DataHandler";
import { MESSAGE_TYPES, ERROR_MESSAGES } from "../constants";

class Util {
  keyExtractor = (item: Object, index: number) => index.toString();
  isPlatformAndroid() {
    return Platform.OS === "android";
  }
  isValidURL(url: "string") {
    const re = /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  isEmailValid(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  isPasswordValid(password: string) {
    return password.length > 5;
  }
  isValidName(name) {
    return /^[a-zA-Z '.-]*$/.test(name);
  }

  topAlert(message, alertType = "success") {
    MessageBarManager.showAlert({
      message,
      alertType
    });
  }

  topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
    MessageBarManager.showAlert({
      message,
      alertType
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getFormattedDateTime = (date, format) => {
    if (date) return moment(date).format(format);
    return "";
  };

  getDateObjectFromString = (date, format) => {
    if (date) return moment(date, format).toDate();
    return "";
  };

  showLoader = (instance, loadingFor = "") => {
    if (!instance.state.loading) {
      instance.setState({
        loading: true,
        loadingFor
      });
    }
  };

  hideLoader = (instance, callback) => {
    if (instance.state.loading) {
      instance.setState(
        {
          loading: false,
          loadingFor: ""
        },
        callback
      );
    }
  };

  getCurrentUserAccessToken() {
    return DataHandler.getStore().getState().user.userData.token;
  }

  isNumber(val) {
    return /^\d+$/.test(val);
  }

  openLinkInBrowser(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: ");
      }
    });
  }

  generateGetParameter(obj) {
    let final = "?";
    for (const key in obj) {
      final = `${final}${key}=${obj[key]}&`;
    }
    final = final.slice(0, -1);
    return final;
  }

  isRequiredMessage(field) {
    this.topAlertError(`${this.capitalizeFirstLetter(field)} is required`);
  }

  getTrimmedDataFromArray(data, length) {
    return data.slice(0, length);
  }

  setSelectedTabIndex = (instance, index) => {
    instance.setState({
      activeTabIndex: index
    });
  };

  getErrorText = err => ERROR_MESSAGES[err];

  isSuccessResponse = response => _.isNull(response.error);
}

export default new Util();
