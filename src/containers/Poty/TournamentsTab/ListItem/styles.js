// @flow
import { StyleSheet, Dimensions } from "react-native";
import { Colors, AppStyles } from "../../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    ...AppStyles.centerInner
  },
  statusWrapper: {
    backgroundColor: Colors.red,
    paddingVertical: 3,
    borderRadius: 15,
    width: 90
  },
  buttonStyle: {
    backgroundColor: Colors.green,
    borderRadius: 15,
    height: 60,
    width: 200,
  },
  buttonText: {
    position: 'absolute',
    color: Colors.white,
    textAlign: 'center',
  },
  dialogBoxStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * .7,
    height: Dimensions.get('window').width * .4,

  }
});
