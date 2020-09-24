// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.background.primary,
    paddingTop: Metrics.statusBarHeight || 20,
    paddingBottom: Metrics.baseMargin,
    height: Metrics.navBarHeight,
    justifyContent: "center"
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.green
  },
  btnImage: {
    width: 20,
    height: 20
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
  }
  // title: { width: "100%", paddingHorizontal: 15 }
});
