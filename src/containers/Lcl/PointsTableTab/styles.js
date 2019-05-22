// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles } from "../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  listHeaderWrapper: {
    ...AppStyles.flexRow,
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 15,
    paddingVertical: 10
  }
});
