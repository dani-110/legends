// @flow
import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
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
  titleText: {
    fontSize: 23,
    fontWeight: "bold"
  },
  innerText: {
    fontSize: 17,
    fontWeight: "bold",
    color: '#555'
  },
  square: {
    width: 100,
    height: 30,
    marginLeft: 15,
    borderRadius: 20,
    backgroundColor: Colors.greenTint,

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
