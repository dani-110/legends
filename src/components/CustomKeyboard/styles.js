// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -5
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5
  },
  numericWraper: {
    height: 180,
    width: "100%",
    backgroundColor: "white"
  },
  numericButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: "25%",
    margin: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.greyTint,
    borderEndWidth: 0.5,
    borderEndColor: Colors.greyTint
  },
  noBorderBottom: {
    borderBottomWidth: 0
  },
  rowView: {
    flexDirection: "row"
  },
  miniWraper: {
    height: 80,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row"
  },
  miniKeyBoardButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: "33.33%",
    borderEndWidth: 0.5,
    borderEndColor: Colors.greyTint
  }
});
