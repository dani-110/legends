// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles, Metrics } from "../../../../theme";

const playersSepWidth = 30;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    ...AppStyles.centerInner
  },
  matchCard: {
    backgroundColor: Colors.white,
    ...AppStyles.shadow2
  },
  roundNumber: {
    width: 130,
    height: 30,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: Colors.greyTint,
    borderRadius: 20,
    padding: 8
  },
  playersSep: {
    backgroundColor: Colors.green,
    width: playersSepWidth,
    height: playersSepWidth,
    borderRadius: playersSepWidth / 2,
    ...AppStyles.centerInner
  }
});
