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
    fontSize: 13,
    fontWeight: "bold",
    color: '#555'
  },
  searchBox: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
    backgroundColor: Colors.white,

  },
  square: {
    width: 100,
    height: 30,
    marginLeft: 15,
    borderRadius: 20,
    backgroundColor: Colors.greenTint,

  },
  absoluteContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center'
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
  searchshadow: {
    position: 'absolute',
    width: 220,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: .01,
    shadowRadius: 16.00,
    zIndex: -1,
    elevation: 24,
  },
  dropdownShadow: {
    width: 220,
    height: 40,
    right: 0,
    backgroundColor: Colors.transparent,
    borderRadius: 50,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    // shadowOpacity: .01,
    // shadowRadius: 16.00,
    // zIndex: -1,
    // elevation: 24,
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    backgroundColor: 'yellow',
    right: 15,
    alignSelf: 'flex-end',
    zIndex: 15,
  },

});
