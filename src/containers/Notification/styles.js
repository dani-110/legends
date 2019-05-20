// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  notificationItem: {
    padding: Metrics.doubleBaseMargin
  },
  unreadItem: {
    borderLeftColor: "#00BC56",
    borderLeftWidth: 2
  },
  clearBtnStyle: {
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    borderRadius: 20
  }
});
