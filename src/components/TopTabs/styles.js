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
  selectedGraphBorder: {
    position: "absolute",

    width: 85,
    height: 36,
    borderColor: Colors.greyTint,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 5,
    borderBottomColor: Colors.white,
    top: 5
  },
  icon: {
    marginRight: 5
  }
});
