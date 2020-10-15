// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  headerText: {
    color: Colors.black
  },
  header: {
    backgroundColor: Colors.background.secondary,
    ...AppStyles.pBottom15,
    ...AppStyles.pTop15
  },
});
