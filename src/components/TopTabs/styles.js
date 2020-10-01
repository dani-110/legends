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

    width: 90,
    height: 40,
    borderRadius: 5,
    borderTopRightRadius: 30,
    borderColor: Colors.greyTint,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 7,
    borderBottomColor: Colors.white,
    top: 6
  },
  icon: {
    marginRight: 5
  }
});
