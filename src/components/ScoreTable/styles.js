// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles } from "../../theme";

const scoreCircleSize = 46;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  overflowHidden: {
    overflow: "hidden"
  },
  OuterCircle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,

  },
  OuterCirclefortwoPlayer: {
    alignSelf: 'center',

    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,

  },
  header: {
    backgroundColor: Colors.background.secondary,
    paddingTop: 12,
    paddingBottom: 12,
    ...AppStyles.mBottom5
  },
  wholeNumber: {
    width: 45
  },
  par: {
    width: 45,
    borderRightWidth: 1,
    borderColor: Colors.greyTint
  },
  score: {
    height: scoreCircleSize,
    width: scoreCircleSize,
    borderRadius: scoreCircleSize / 2,
    ...AppStyles.centerInner
  },
  row: {
    borderLeftColor: Colors.red2,
    borderLeftWidth: 4,
    borderRightWidth: 4
  }
});
