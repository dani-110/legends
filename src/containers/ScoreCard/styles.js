// @flow
import { StyleSheet } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { Colors, AppStyles, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  headerWrapper1: {
    backgroundColor: Colors.green,
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
  scoreRowWrapper: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.green,
    flex: 1
  },
  width3: {
    width: 50,
    ...AppStyles.centerInner
  },
  scoreText: {
    fontSize: Fonts.size.small,
    fontWeight: 'normal'
  },
  innerWrapper: {
    paddingLeft: isIphoneX() ? 40 : 0,
    // width: 680,
    flex: 1,
    paddingBottom: isIphoneX() ? 30 : 0
  },
  playerName: {
    lineHeight: 24
  }
});
