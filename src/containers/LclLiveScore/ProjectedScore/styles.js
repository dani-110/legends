// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles } from "../../../theme";

const scoreSize = 46;

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    paddingTop: 40,
    ...AppStyles.pBottom10,
    ...AppStyles.mBottom30,
    ...AppStyles.shadow2,
    elevation:40
  },
  score: {
    width: scoreSize,
    height: scoreSize,
    borderRadius: scoreSize / 2,
    ...AppStyles.centerInner
  }
});
