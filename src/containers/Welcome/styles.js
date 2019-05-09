// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.green,
    ...AppStyles.centerInner
  },
  image: { width: 250, height: 200, marginBottom: 70 }
});
