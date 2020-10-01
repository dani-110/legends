import { Colors } from "../theme";

// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const APP_URL = "";
export const APP_DOMAIN = "";
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;

// date time formats
export const DATE_FORMAT1 = "dddd, DD MMMM, YYYY";
export const TIME_FORMAT1 = "H:mm";
export const TIME_FORMAT2 = "HH:mm:ss";

export const IMAGE_MAX_WIDTH = 400;
export const IMAGE_MAX_HEIGHT = 400;

// Message types
export const MESSAGE_TYPES = {
  INFO: "info",
  ERROR: "error",
  SUCCESS: "success"
};

// File Types
export const FILE_TYPES = { VIDEO: "video", IMAGE: "image", AUDIO: "audi" };

// Navbar theme
export const NAVBAR_THEME = { GREEN: Colors.green, WHITE: "white", TRANSPERENT: "rgba(0,0,0,0)" };

// Match types
export const MATCH_TYPES = { POTY: "POTY", LCL: "LCL", LMP: "LMP", DMP: "DMP" };

// Error Messages
export const ERROR_MESSAGES = {
  // Server messages
  invalid_credentials: "Username or password is invalid",

  // Local messages
  location_permission_denied_error2:
    "Location permission required, please go to app settings to allow access",
  invalid_name_error: "Invalid name",
  invalid_email_error: "Invalid email",
  invalid_password_error: "Invalid password",
  internet_error: "Please connect to the working internet",
  session_expired_error: "Session expired, Please login again"
};

export const POLLING_TIME = 30000;

export const LEGENDS_NOTIFICATION_CHANNEL = {
  id: "legends-channel",
  name: "Legends Notifications"
};

export const NOTIFICATION_PERMISSION_DENIED_ERROR =
  "Please allow notifications and get notified timely";

export const NOTIFICATIONS_TOPICS_TO_SUBSCRIBE = "legendstourgolf";
