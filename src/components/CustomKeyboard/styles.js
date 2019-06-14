// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
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
    height: 80,
    width: "100%",
    backgroundColor: "white"
  },
  numericButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: "16.66%",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.greyTint,
    borderEndWidth: 0.5,
    borderEndColor: Colors.greyTint
  },
  noBorderBottom : {
    borderBottomWidth: 0,
  },
  rowView : {
    flexDirection : "row"
  }
});
