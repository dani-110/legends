// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles } from "../../../theme";

const scoreCircleSize = 46;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  overflowHidden: {
    overflow: "hidden"
  },
  header: {
    backgroundColor: Colors.background.secondary,
    ...AppStyles.pBottom15,
    ...AppStyles.pTop15
  },
  row: {
    ...AppStyles.pTop10,
    ...AppStyles.pBottom10
  },
  score: {
    height: scoreCircleSize,
    width: scoreCircleSize,
    borderRadius: 23,//scoreCircleSize / 2,
    ...AppStyles.centerInner
  },
  negativePar: {
    backgroundColor: Colors.redDark
  },
  negativeParText: {
    color: Colors.white
  }
});
