// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles } from "../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.red,
    borderRadius: Metrics.borderRadius,
    padding: 14,
    ...AppStyles.mBottom10
  }
});
