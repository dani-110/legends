// @flow
import { StyleSheet } from "react-native";
import { Colors } from "../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.greyTint,
    paddingRight: 38,
    backgroundColor: Colors.background.primary
  },
  InnerContainer: {
    flex: 1,
    alignSelf: 'center',
  }

});
