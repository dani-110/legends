// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import firebase from "react-native-firebase";
import PropTypes from "prop-types";
import {
  getDashboardDataRequest,
  setSelectedTab
} from "../../actions/GeneralActions";
import {
  updateDeviceToken,
  setChannelForAndroid,
  getPermissions,
  showLocalNotification,
  navigateOnNotificationTap
} from "../../services/firebaseHelper";
import { CustomNavbar, GreenBgFlayer } from "../../components";
import PotyLeaderboardDB from "./PotyLeaderboardDB";
import NewsItem from "./NewsItem";
import Scores from "./Scores";
import styles from "./styles";
import {
  NAVBAR_THEME,
  NOTIFICATIONS_TOPICS_TO_SUBSCRIBE
} from "../../constants";
import Util from "../../util";

class Dashboard extends Component {
  static propTypes = {
    getDashboardDataRequest: PropTypes.func.isRequired,
    setSelectedTab: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired
  };

  static defaultProps = {};

  static onEnter() {
    if (Dashboard.instance) {
      Dashboard.instance._onEnter();
    }
  }

  // static onExit() {
  //   if (Dashboard.instance) {
  //     Dashboard.instance._onExit();
  //   }
  // }

  constructor(props) {
    super(props);
    Dashboard.instance = this;
  }

  componentWillMount() {
    this.props.getDashboardDataRequest();
  }

  _onEnter() {
    this.props.setSelectedTab(1);
  }

  // _onExit() {
  //   this.props.setSelectedTab(-1);
  // }

  async componentDidMount() {
    this._fcmInit();
  }

  _fcmInit = async () => {
    // ------------- CHANNEL INIT --------------
    if (Util.isPlatformAndroid()) setChannelForAndroid();

    // ------------- iOS Permission --------------
    if (!Util.isPlatformAndroid()) getPermissions();

    // ------------- TOKEN INIT --------------

    updateDeviceToken();

    this.onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh(fcmToken => {
        updateDeviceToken(fcmToken);
      });

    // ------------- NOTIFICATION SUBSCRIBTIONS --------------
    firebase.messaging().subscribeToTopic("legendstourgolf");
    // if (this.props.userData && this.props.userData.id)
    //   firebase.messaging().subscribeToTopic(`user-${this.props.userData.id}`);

    // ------------- NOTIFICATION LISTNER --------------

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        // when app is in background
        // console.log({ background: notificationOpen });

        if (notificationOpen && notificationOpen.notification) {
          navigateOnNotificationTap(notificationOpen.notification._data);
        }
      });

    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        // when app is in foreground
        // console.log({ foreground: notification });

         ;
        if (notification) {
          showLocalNotification(notification._data);
        }
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
       ;
    if (notificationOpen) {
      // when app is in closed, and opened by clicking notification
      // console.log("getInitialNotification", notificationOpen);
      if (notificationOpen && notificationOpen.notification) {
        navigateOnNotificationTap(notificationOpen.notification._data, true);
      }
    }
  };

  renderLeaderboard() {
    return <PotyLeaderboardDB />;
  }

  renderScores() {
    return <Scores />;
  }

  renderLatestNews() {
    return <NewsItem />;
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <CustomNavbar
          hasBack={false}
          title="POTY Leaderboard"
          hasBorder={false}
          theme={NAVBAR_THEME.GREEN}
          titleAlign="left"
        /> */}

        <ScrollView>
          <GreenBgFlayer />
          {this.renderLeaderboard()}
          {this.renderScores()}
          {this.renderLatestNews()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ user, general, }) => {
  //debugger
  return ({
    userData: user.userData.user ? JSON.parse(user.userData.user) : {}
  });
}

const actions = { getDashboardDataRequest, setSelectedTab };

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
