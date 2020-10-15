// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles } from "../../theme";

const scoreCircleSize = 46;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  header: {
    backgroundColor: Colors.background.secondary,
    paddingTop: 12,
    paddingBottom: 12,
  },
  score: {
    height: scoreCircleSize,
    width: scoreCircleSize,
    borderRadius: scoreCircleSize / 2,
    ...AppStyles.centerInner
  },
  wholeNumber: {
    width: 45,
    paddingLeft: 8
  },
  textStyle: {
    color: Colors.black
  }
});
