// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  image: { width: 300, height: 250, marginBottom: 70 },
  imageBackground: { width: "100%", height: "98%", ...AppStyles.centerInner }
});
