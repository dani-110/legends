// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Dimensions, Text, View, ScrollView, Alert, StyleSheet, SafeAreaView, RefreshControl } from "react-native";
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
  clearBadgeNumber
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
import { Actions } from "react-native-router-flux";
import { Colors } from "../../theme";



class Dashboard extends Component {
  static propTypes = {
    getDashboardDataRequest: PropTypes.func.isRequired,
    setSelectedTab: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired
  };

  static defaultProps = {};
  state = {
    showConformPopUp: false,
    refreshing: false,
    potyRefresh: true,
    newsRefresh: true,
    profileRefresh: true
  }

  setPotyRefresh(value) {
    this.setState({ potyRefresh: value, refreshing: false })
  }

  setProfileRefresh(value) {
    this.setState({ profileRefresh: value })
  }

  setNewsRefresh(value) {
    this.setState({ newsRefresh: value })
  }

  static onEnter() {
    if (Dashboard.instance) {
      Dashboard.instance._onEnter();
      PotyLeaderboardDB.playInterval();
    }
  }

  _onRefresh() {
    this.setState({
      refreshing: true,
      potyRefresh: true,
      profileRefresh: true,
      newsRefresh: true
    });
    this.props.getDashboardDataRequest();
    this.renderLeaderboard()
    this.renderScores()
    this.renderLatestNews()
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

  componentWillUnmount() {
    // this.notificationListener();
    // this.notificationOpenedListener();
  }


  _onEnter() {
    this.props.setSelectedTab(1);

  }

  // _onExit() {
  //   this.props.setSelectedTab(-1);
  // }

  async componentDidMount() {
    this._fcmInit();
    clearBadgeNumber();
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
        console.log({ background: notificationOpen });
        debugger
        showLocalNotification(notificationOpen._data);

        if (notificationOpen && notificationOpen.notification) {
          console.log("baclground-->", notificationOpen.notification)
          this.navigateOnNotificationTap(notificationOpen.notification._data);
        }
      });

    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {

        // when app is in foreground
        console.log({ foreground: notification });
        debugger
        const { title, deliveryId, body, type } = notification._data
        console.log("foreground-->", notification._data)
        Alert.alert(title, body, [
          {
            text: "OK",
            onPress: () => { this.navigateOnNotificationTap(notification._data) }
          }]);

      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    ;
    if (notificationOpen) {
      debugger
      // when app is in closed, and opened by clicking notification
      console.log("getInitialNotification", notificationOpen);
      console.log("getInitialNotification-->", notificationOpen.notification)
      if (notificationOpen && notificationOpen.notification) {
        this.navigateOnNotificationTap(notificationOpen.notification._data, true);
      }
    }
  };

  navigateOnNotificationTap = (data, isFreshLaunch = false) => {

    console.log("data----------->", data);

    firebase.notifications().removeAllDeliveredNotifications();
    switch (data.type) {

      case "Tournament_Registration":
        Actions.poty();
        break;
      case "Last_Day_to_Register":
        Actions.poty();
        break

      case "Tournament_Live_Scoring":
        Actions.poty();
        break

      case "Event_Scheduled":
        this.props.setSelectedTab(2)
        Actions.jump("live_tab_main");
        break

      case "Evening_Before_Match":
        this.props.setSelectedTab(2)
        Actions.jump("live_tab_main");
        break

      case "Winner_LMP":
      case "Winner_LCL":
      case "Winner_DMP":
      case "Winner_POTY":
        Actions.news();
        break

      case "Match_Started":
        this.props.setSelectedTab(2)
        Actions.jump("live_tab_main");
        break
    }

  };

  renderLeaderboard() {
    return <PotyLeaderboardDB refresh={this.state.potyRefresh} refreshUpdate={(e) => { this.setPotyRefresh(e) }} />;

  }

  renderScores() {
    return <Scores refresh={this.state.potyRefresh} refreshUpdate={(e) => { this.setProfileRefresh(e) }} />;
  }

  renderLatestNews() {
    return <NewsItem refresh={this.state.potyRefresh} refreshUpdate={(e) => { this.setNewsRefresh(e) }} />;

  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
        <GreenBgFlayer />
        {this.renderLeaderboard()}
        {this.renderScores()}
        {this.renderLatestNews()}


      </ScrollView>
    );
  }
}


const mapStateToProps = ({ user, general, }) => {
  // 
  return ({
    userData: user.userData.user ? JSON.parse(user.userData.user) : {}
  });
}

const actions = { getDashboardDataRequest, setSelectedTab };



export default connect(
  mapStateToProps,
  actions
)(Dashboard);


