// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles } from "../../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    ...AppStyles.centerInner
  },
  statusWrapper: {
    backgroundColor: Colors.red,
    paddingVertical: 3,
    borderRadius: 15,
    width: 80
  }
});