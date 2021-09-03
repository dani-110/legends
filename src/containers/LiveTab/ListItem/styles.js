// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles, Fonts } from "../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.red,
    borderRadius: Metrics.borderRadius,
    // padding: 14,
    position: "relative",
    ...AppStyles.mBottom10
  },
  lmpText: {
    fontSize: 16
  },
  textTitle: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 14,
    fontWeight: "normal",

  },
  textTitle2: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 14,
    fontWeight: "normal",
  },
  arrow_right: {
    position: "absolute",
    right: 20,
    height: 10,
    top: "50%",
    transform: [{ translateY: 9 }]
  },
  RectangleShape: {
    // marginTop: 20,
    width: 25 * 2,
    height: 25,
    // backgroundColor: '#BABECD'
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderRadius: 50,

  }
});
