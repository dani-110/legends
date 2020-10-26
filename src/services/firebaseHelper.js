import _ from "lodash";
import { Platform, Dimensions, Text, StyleSheet, View, Alert } from "react-native";
import firebase from "react-native-firebase";
import { Actions } from "react-native-router-flux";
import { updateDeviceTokenRequest } from "../actions/GeneralActions";
import DataHandler from "../services/DataHandler";
import Util from "../util";
import {
  NOTIFICATION_PERMISSION_DENIED_ERROR,
  LEGENDS_NOTIFICATION_CHANNEL
} from "../constants";
import util from "../../src/util";
import axios from "axios";
import { BASE_URL } from '../config/WebService';



const updateDeviceToken = async token => {
  let fcmToken = "";
  if (_.isUndefined(token)) {
    fcmToken = await firebase.messaging().getToken();
    sendDeviceToken(fcmToken)
  }

  if (fcmToken || token)
    DataHandler.getStore().dispatch(
      updateDeviceTokenRequest({
        deviceId: fcmToken || token,
        devicePlatform: Platform.OS
      })
    );

  return fcmToken || token;
};

const sendDeviceToken = (fcmToken) => {

  const AuthStr = util.getCurrentUserAccessToken();
  console.log("authentication key =-----------------------234 >" + AuthStr);
  URL = BASE_URL + '/DeviceTokenUpdate';
  axios.post(URL, {
    device_token: fcmToken
  },
    { headers: { Authorization: AuthStr } }).then((response) => {
      console.log("response is:--<>------" + response)
    })
    .catch(function (error) {
      console.log("error is:--<>------" + error);
    });

}

const setChannelForAndroid = () => {
  // Driver Channel
  const legendsDriverChannel = new firebase.notifications.Android.Channel(
    LEGENDS_NOTIFICATION_CHANNEL.id,
    LEGENDS_NOTIFICATION_CHANNEL.name,
    firebase.notifications.Android.Importance.Max
  );

  firebase.notifications().android.createChannel(legendsDriverChannel);
};

const getPermissions = async () => {
  const enabled = await firebase.messaging().hasPermission();
  debugger
  if (!enabled) {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      Util.topAlert(NOTIFICATION_PERMISSION_DENIED_ERROR, "warning");
    }
  }
};

const showLocalNotification = (data) => {
  debugger
  const { title, deliveryId, body, type } = data;


  const notificationOpen = firebase.notifications().getInitialNotification();

  const notification = new firebase.notifications.Notification()
    .setNotificationId(1)//Util.generateGuid()
    .setTitle(title)
    .setBody(body)
    .setData({
      deliveryId,
      type
    });

  notification.ios.setBadge(1);
  notification.android.setChannelId(LEGENDS_NOTIFICATION_CHANNEL.id);
  notification.android.setSmallIcon("ic_launcher_push");
  notification.android.setLargeIcon("ic_launcher_push");
  notification.android.setPriority(firebase.notifications.Android.Priority.High)
  firebase.notifications().displayNotification(notification).catch(err => console.error(err));
};

const clearBadgeNumber = () => {
  if (!Util.isPlatformAndroid()) firebase.notifications().setBadge(0);
};

export {
  updateDeviceToken,
  setChannelForAndroid,
  getPermissions,
  showLocalNotification,
  clearBadgeNumber
};


