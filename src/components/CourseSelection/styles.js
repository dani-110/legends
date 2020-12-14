// @flow
import { StyleSheet, Dimensions } from "react-native";
import { Colors, AppStyles } from "../../theme";

export default StyleSheet.create({

  item: {
    fontSize: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  titleTees: {
    marginTop: 20,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonTitleText: {
    fontWeight: 'bold',
    textAlign: 'center',


  },
  PlayerNameStyle: {
    fontSize: 18,
    paddingTop: 10,
    fontWeight: 'bold',
    marginLeft: 20,
    color: Colors.grey,
  },
  dialogStyle: {
    ...AppStyles.centerInner,
    // height: Dimensions.get('window').height * .5,
    width: Dimensions.get('window').width * .9,
  },
  dropDownLargeStyle: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    width: 300,
    height: 50,
    marginTop: 20
  },
  buttonGreenStyle: {
    borderRadius: 15,
    backgroundColor: Colors.green,
    ...AppStyles.centerInner
  },

  containerInner: {
    backgroundColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    zIndex: 1,
    position: 'relative'

  },
  textdropDown: {
    color: Colors.black,
    textAlign: 'left',
    marginLeft: 20
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonStyle: {
    marginTop: 10,
    position: 'absolute',
    width: 50,
    height: 50,
    top: -50,
    right: 10,
    color: Colors.white,
  },
  icon: {
    marginRight: 5
  }
});
