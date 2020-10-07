// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  image: {
    width: "100%",
    height: Metrics.screenWidth * 1
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  }
});
