// @flow
import { StyleSheet } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { Colors, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  headerWrapper1: {
    backgroundColor: Colors.background.secondary,
    paddingVertical: 5
  },
  width1: {
    paddingLeft: 20,
    flex: 1
  },
  width2: {
    width: 40,
    paddingVertical: 2,
    ...AppStyles.centerInner
  },
  playerNameWrapper: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.purple,
    flex: 1
  },
  width3: {
    width: 50,
    ...AppStyles.centerInner
  },
  innerWrapper: {
    paddingLeft: isIphoneX() ? 40 : 0,
    // width: 660,
    flex: 1,
    paddingBottom: isIphoneX() ? 30 : 0
  }
});
