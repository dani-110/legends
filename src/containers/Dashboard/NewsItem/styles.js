// @flow
import { StyleSheet } from "react-native";
import { Metrics } from "../../../theme";

export default StyleSheet.create({
  innerWrapper: {
    borderRadius: Metrics.borderRadius,
    height: 160,
    overflow: "hidden"
  },
  image: { width: 125, height: "100%" }
});
