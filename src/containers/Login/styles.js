// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    ...AppStyles.pBottom0
  },

  logo: { width: 96, height: 112 },
  heroBg: { width: "100%", height: 350 },
  logoImage: {
    marginTop: Metrics.navBarHeight,
    width: 120,
    height: 120
  },
  cardBoard: {
    paddingTop: 70,
    marginHorizontal: 25,
    paddingBottom: 50
  },
  inputStyle1: {
    fontFamily: "CircularStd-Book",
    fontSize: Fonts.size.normal,
    borderWidth: 1,
    borderColor: Colors.grey2,
    paddingHorizontal: 10,
    ...AppStyles.mBottom10,
    borderRadius: Metrics.borderRadius,
    paddingVertical: 12
  }
});
