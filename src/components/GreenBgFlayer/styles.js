// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0 // Metrics.navBarHeight
  },
  image: {
    width: Metrics.screenWidth,
    height: 205
  }
});
