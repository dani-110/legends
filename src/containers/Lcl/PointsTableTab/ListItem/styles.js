// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles, Fonts } from "../../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    ...AppStyles.centerInner
  },
  innerText: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    color: Colors.black,
  },
  points: {


    width: 68,
    height: 22,
    textAlign: "center"
  },
  listHeaderWrapper: {
    ...AppStyles.flexRow,
    paddingHorizontal: 15,
    paddingVertical: 10
  }
});
