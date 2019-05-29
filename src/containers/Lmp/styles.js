// @flow
import { StyleSheet } from "react-native";
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
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 14,
    backgroundColor: Colors.grey2,
    ...AppStyles.centerInner
  },
  itemWon: {
    backgroundColor: Colors.green
  }
});
