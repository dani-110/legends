// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles } from "../../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    ...AppStyles.centerInner
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 20
  }
});
