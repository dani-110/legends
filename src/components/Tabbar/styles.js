// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    height: Metrics.tabBarHeight,
    paddingBottom: 34,
    /* height: 49,
    marginBottom: 34, */
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingLeft: 10,
    paddingRight: 20,
    ...AppStyles.flexRow,
    ...AppStyles.spaceAround
    // ...AppStyles.alignItemsCenter
  },
  btn1: {
    width: 50,
    height: 35,
    ...AppStyles.centerInner
  },
  btn2: {
    backgroundColor: Colors.greenTint,
    padding: 7,
    paddingHorizontal: 10,
    justifyContent: "center",
    ...AppStyles.flexRow,
    borderRadius: 20,
    height: 34,
    ...AppStyles.centerInner
  },
  btn2Image: {
    marginRight: 5
  },
  selectedBar: {
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.green,
    position: "absolute",
    top: 0
  },
  itemWrapper: { paddingTop: 10, alignItems: "center" }
});
