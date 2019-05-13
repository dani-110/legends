// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: Metrics.navBarHeight
  },
  image: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth * 0.73
  }
});
