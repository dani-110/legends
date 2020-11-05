// @flow
import { StyleSheet } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { Colors, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },

  tournamentBracket: {
    alignItems: "stretch",
    ...AppStyles.flexRow
  },
  pair: {
    position: "relative",
    height: 150,
    marginRight: 10,
    paddingRight: 10,
    ...AppStyles.flex,
    ...AppStyles.spaceAround
  },
  pairBorder: {
    position: "absolute",
    height: "50%",
    width: "100%",
    top: "25%",
    transform: [{ translateY: -1 }],
    right: 0,
    borderColor: Colors.grey2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5
  },
  pairConnector: {
    position: "absolute",
    top: "50%",
    margin: "auto",
    height: 1,
    width: 10,
    backgroundColor: Colors.grey2,
    right: -10,
    transform: [{ translateY: -1 }]
  },
  itemWrapper: {
    position: "relative",
    ...AppStyles.mBottom5
  },
  item: {
    width: 167,
    height: 50,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 7,
    backgroundColor: Colors.grey2,
    ...AppStyles.centerInner
  },
  itemWon: {
    backgroundColor: Colors.green
  },

  innerWrapper: {
    paddingLeft: isIphoneX() ? 40 : 0,
    flex: 1,
    paddingBottom: isIphoneX() ? 30 : 0,
    // maxWidth: 581,
    alignSelf: "center"
  },
  headerItemWrapper: {
    width: 177,
    borderRightWidth: 1,
    borderRightColor: Colors.black,
    paddingRight: 10,
    marginRight: 10
  },
  headerLastItemWrapper: {
    borderRightWidth: 0
  },
  tabsItemWrapper: {
    backgroundColor: Colors.background.secondary,
    marginHorizontal: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    width: 85
  },
  tabsItemsWrapper: {
    borderTopWidth: 1,
    borderTopColor: Colors.grey2
  },
  tabsSelectedItemWrapper: {
    backgroundColor: Colors.black2
  }
});
