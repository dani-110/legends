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
    ...AppStyles.shadowNew
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
  circle:
  {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: Colors.blue,
    borderRadius: 50,
  },
  textStyle:
  {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.grey5,
    marginBottom: 15,
  },
  squir: {
    width: 25,
    height: 20,
    backgroundColor: Colors.black,
    marginLeft: 15,
    justifyContent: 'flex-start',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playersSep: {
    backgroundColor: Colors.green,
    width: playersSepWidth,
    height: playersSepWidth,
    borderRadius: playersSepWidth / 2,
    ...AppStyles.centerInner
  },
  backgroundColorForWinner:
  {

  }
});
