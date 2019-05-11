// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  image: { width: 200, height: 200, ...AppStyles.mBottom30 },
  imageBackground: { width: "100%", height: "98%", ...AppStyles.centerInner }
});
