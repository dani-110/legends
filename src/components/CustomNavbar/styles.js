// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles } from "../../theme";
import Fonts from "../../theme/Fonts";


export default StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.background.primary,
    paddingTop: Metrics.statusBarHeight || 20,
    paddingBottom: Metrics.baseMargin,
    height: Metrics.navBarHeight * .5,
    justifyContent: "center",
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.green
  },
  btnImage: {
    width: 35,
    height: 35
  },
  btnWrapper: {
    padding: Metrics.smallMargin,
    justifyContent: "center",
    minWidth: 50
  },
  rightBtn: {
    alignItems: "flex-end"
  },
  searchHeader: {
    height: Metrics.navBarHeight + 50
  },
  titleContainer: {
    paddingHorizontal: 20
  },
  title: { fontFamily: Fonts.type.base, fontSize: Fonts.size.xLarge }
});
