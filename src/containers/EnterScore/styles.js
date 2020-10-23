// @flow
import { StyleSheet, Dimensions } from "react-native";
import { Colors, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  Modal: {
    width: '70%',
    height: '50%',

  }, dialogBoxStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * .7,
    height: Dimensions.get('window').width * .4,

  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    left: 0,
    height: 10,
    width: 10,
  },
  label: {
    margin: 8,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  titleHeader: {
    fontSize: 18,
    fontWeight: 'bold',

  },
  buttonStyle: {
    backgroundColor: Colors.green,
    borderRadius: 15,
    height: 40,
    width: 200,
  },
  column: {
    width: 40
  },
  buttonSubmit: {
    padding: 12,
    borderRadius: 20,
    ...AppStyles.flexRow,
    ...AppStyles.centerInner
  },
  background: {
    backgroundColor: Colors.background.secondary
  },
  buttonGroup: {
    width: 210,
    borderRadius: 20,
    borderColor: Colors.grey2,
    borderWidth: 1,
    ...AppStyles.mTop30,
    ...AppStyles.flexRow,
    ...AppStyles.centerInner
  },
  button: {
    padding: 12,
    borderRadius: 20,
    ...AppStyles.flex,
    ...AppStyles.flexRow,
    ...AppStyles.centerInner
  },
  buttonActive: {
    marginTop: -1,
    marginBottom: -1,
    marginLeft: -1,
    marginRight: -10,
    backgroundColor: Colors.green
  },

  buttonInActive: {
    backgroundColor: Colors.transparent
  },
  buttonIcon: {
    position: "absolute"
  },
  buttonIconLeft: {
    left: 14
  },
  buttonIconRight: {
    right: 14
  },
  scoreCardButton: {
    backgroundColor: Colors.darkBlue,
    borderRadius: 20,
    padding: 15
  },

  rowStyles: {
    ...AppStyles.borderBottomGrey,
    ...AppStyles.flexRow,
    // ...AppStyles.basePadding,
    ...AppStyles.alignItemsCenter
  },
  rowItemStyles: {
    borderColor: Colors.transparent,
    borderWidth: 0.5,
    ...AppStyles.basePadding,
    height: 52,
    width: 60,
    justifyContent: "center"
  },
  rowItemActiveStyles: {
    borderColor: Colors.grey
  },
  activeColRowItemActiveStyles: {
    backgroundColor: Colors.greenTint
  }
});
