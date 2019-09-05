import _ from "lodash";
import { Platform } from "react-native";
import firebase from "react-native-firebase";
import { Actions } from "react-native-router-flux";
import { updateDeviceTokenRequest } from "../actions/GeneralActions";
import DataHandler from "../services/DataHandler";
import Util from "../util";
import {
  NOTIFICATION_PERMISSION_DENIED_ERROR,
  LEGENDS_NOTIFICATION_CHANNEL
} from "../constants";

const updateDeviceToken = async token => {
  let fcmToken = "";
  if (_.isUndefined(token)) {
    fcmToken = await firebase.messaging().getToken();
  }
  console.log("fcmToken", fcmToken || token);
  if (fcmToken || token)
    DataHandler.getStore().dispatch(
      updateDeviceTokenRequest({
        deviceId: fcmToken || token,
        devicePlatform: Platform.OS
      })
    );

  return fcmToken || token;
};

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
  if (!enabled) {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      Util.topAlert(NOTIFICATION_PERMISSION_DENIED_ERROR, "warning");
    }
  }
};

const showLocalNotification = data => {
  const { title, deliveryId, body, type } = data;
  // console.log({ data });
  const notification = new firebase.notifications.Notification()
    .setNotificationId(Util.generateGuid())
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
  firebase.notifications().displayNotification(notification);
};

const navigateOnNotificationTap = (data, isFreshLaunch = false) => {
  firebase.notifications().removeAllDeliveredNotifications();

  /* switch (data.type) {
    case NOTIFICATION_TYPES.JOB_STARTING_SOON:
      Actions.jump("my_job_detail", {
        jobId: parseInt(data.deliveryId)
      });
      break;
    case NOTIFICATION_TYPES.NEW_JOB:
      Actions.jump("available_job_detail", {
        deliveryId: parseInt(data.deliveryId)
      });
      break;

    case NOTIFICATION_TYPES.REMOVED_FROM_JOB: {
      if (!isFreshLaunch) {
        Actions.reset("dashboard");
      }
      break;
    }

    default:
  } */
};

const clearBadgeNumber = () => {
  if (!Util.isPlatformAndroid()) firebase.notifications().setBadge(0);
};

export {
  updateDeviceToken,
  setChannelForAndroid,
  getPermissions,
  showLocalNotification,
  navigateOnNotificationTap,
  clearBadgeNumber
};
