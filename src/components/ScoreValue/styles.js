// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    ...AppStyles.centerInner
  }
});
