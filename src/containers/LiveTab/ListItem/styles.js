// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles } from "../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.red,
    borderRadius: Metrics.borderRadius,
    padding: 14,
    position: "relative",
    ...AppStyles.mBottom10
  },
  arrow_right: {
    position: "absolute",
    right: 20,
    height: 10,
    top: "50%",
    transform: [{ translateY: 9 }]
  }
});
