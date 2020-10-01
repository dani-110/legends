// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles, Fonts } from "../../../theme";
import Font from "../../../theme/Fonts"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  Title: {
    fontFamily: Font.type.base,
    fontSize: Fonts.size.large
  },
  listHeaderWrapper: {
    ...AppStyles.flexRow,
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 15,
    paddingVertical: 10
  }
});
