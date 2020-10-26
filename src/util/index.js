// @flow
import _ from "lodash";
import { Platform, Linking } from "react-native";
import moment from "moment";
import { MessageBarManager } from "react-native-message-bar";
import DataHandler from "../services/DataHandler";
import { MESSAGE_TYPES, ERROR_MESSAGES, TIME_FORMAT2 } from "../constants";
import { element } from "prop-types";

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

  isSuccessResponse = response => {
    console.log("the response is:" + response.error);
    return (_.isNull(response.error))
  };

  generateScoreCardData(data, singlePlayerName = null) {
    debugger
    if (singlePlayerName) {
      const holeNumber = [];
      const index = [];
      const par = [];
      const score = [];
      const { holes, scorecards, course_name } = data;
      holes.forEach((hole, holeIndex) => {
        holeNumber[holeIndex] = hole.hole_number;
        index[holeIndex] = hole.index;
        par[holeIndex] = hole.par;
        score[holeIndex] = null;
      });

      scorecards.forEach(scoreItem => {
        score[scoreItem.hole_number - 1] = scoreItem.strokes;
      });

      return {
        course_name,
        holeNumber,
        index,
        par,
        players: [
          {
            name: singlePlayerName,
            score
          }
        ]
      };
    }

    const holeNumber = [];
    const index = [];
    const par = [];
    const playersArray = [];


    const {
      course: { name, holes },
      players
    } = data;

    holes.forEach((hole, holeIndex) => {
      holeNumber[holeIndex] = hole.hole_number;
      index[holeIndex] = hole.index;
      par[holeIndex] = hole.par;
    });

    players.forEach(player => {
      const score = [];
      for (let i = 0; i < 18; i++) {
        score[i] = null;
      }
      player.scorecard.forEach(scoreItem => {
        score[scoreItem.hole_number - 1] = scoreItem.strokes;
      });

      playersArray.push({
        name: player.player_name,
        score
      });
    });

    return {
      course_name: name,
      holeNumber,
      index,
      par,
      players: playersArray
    };
  }
  ///ORiginal 

  // getManipulatedLiveMatchesData = data => {
  //   const matchesType = ["poty", "lcl", "lmp", "dmp"];
  //   const myData = [];

  //   matchesType.forEach(element => {
  //     const innerData = [];

  //     data[element].forEach(innerElement => {
  //       innerData.push({
  //         ...innerElement,
  //         time: innerElement.time
  //           ? this.getDateObjectFromString(innerElement.time, TIME_FORMAT2)
  //           : moment().toISOString(),
  //         title:
  //           element === "poty"
  //             ? innerElement.name
  //             : element === "lcl"
  //               ? `${innerElement.team_1_initials} vs ${
  //               innerElement.team_2_initials
  //               }`
  //               : `${innerElement.team1_name} vs ${innerElement.team2_name}`,
  //         desc:
  //           element === "lcl"
  //             ? `${innerElement.team1_name} vs ${innerElement.team2_name}\n${
  //             innerElement.venue
  //             }`
  //             : innerElement.venue
  //       });
  //     });
  //     const itemData = {
  //       title: element.toUpperCase(),
  //       data: innerData
  //     };
  //     if (innerData.length) myData.push(itemData);
  //   });

  //   return myData;
  // };


  getManipulatedLiveMatchesData = data => {

    const matchesType = ["live", "upcoming"];
    const myData = [];
    matchesType.forEach(element => {
      const innerData = [];
      data[element].forEach(innerElement => {
        innerData.push({
          ...innerElement,
          time: innerElement.time
            ? this.getDateObjectFromString(innerElement.time, TIME_FORMAT2)
            : moment().toISOString(),
          title:
            element === "poty"
              ? innerElement.name
              : element === "lcl"
                ? `${innerElement.team_1_initials} vs ${innerElement.team_2_initials
                }`
                : `${innerElement.team1_name} vs ${innerElement.team2_name}`,
          desc:
            element === "lcl"
              ? `${innerElement.team1_name} vs ${innerElement.team2_name}\n${innerElement.venue
              }`
              : innerElement.venue
        });
      });
      const itemData = {
        title: element.toUpperCase(),
        data: innerData
      };
      if (innerData.length) myData.push(itemData);
    });

    return myData;
  };
  getDateObjectFromString = (date, format) => {
    if (date) return moment(date, format).toDate();
    return "";
  };

  removeSpaces(str) {
    return str.replace(/\s/g, "");
  }

  titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }
}

export default new Util();
