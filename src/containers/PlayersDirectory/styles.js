// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  wholeNumber: {
    width: 45
  },
  headerRow: {
    paddingVertical: 15,
    backgroundColor: Colors.background.secondary
  },
  row: {
    paddingVertical: 15
  },
  searchBarContainer: {
    position: "relative"
  },
  searchBar: {
    backgroundColor: Colors.white,
    paddingRight: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    ...AppStyles.basePadding
  },
  searchIcon: {
    position: "absolute",
    top: 30,
    right: 30
  }
});
