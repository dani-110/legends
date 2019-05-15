// @flow
import { StyleSheet } from "react-native";
import { AppStyles, Colors } from "../../../theme";

const circleSize = 57;

export default StyleSheet.create({
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15
  }
});
