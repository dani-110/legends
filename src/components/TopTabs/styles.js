// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    ...AppStyles.centerInner,
    paddingVertical: 10,
    borderBottomColor: Colors.grey2,
    borderBottomWidth: 1
  },

  selectedBorder: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.green,
    bottom: -1
  },

  icon: {
    marginRight: 5
  }
});
