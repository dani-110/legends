// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles } from "../../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    ...AppStyles.centerInner
  },
  points: {
    backgroundColor: Colors.blue,
    color: Colors.white,
    borderRadius: 20,
    width: 68,
    height: 22,
    textAlign: "center"
  }
});
