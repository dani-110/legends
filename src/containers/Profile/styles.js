// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles } from "../../theme";

const DPSize = 100;
const editButtonWrapperSize = 28;
const editButtonSize = 12;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  userDetailsWrapper: {
    paddingBottom: 25,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: Colors.separator,
    ...AppStyles.centerInner
  },
  imageContainer: {
    position: "relative"
  },
  editProfileWrapper: {
    backgroundColor: Colors.green,
    borderRadius: editButtonWrapperSize / 2,
    width: editButtonWrapperSize,
    height: editButtonWrapperSize,
    position: "absolute",
    right: 0,
    bottom: 0,
    ...AppStyles.centerInner
  },
  imageWrapper: {
    width: DPSize,
    height: DPSize,
    borderRadius: DPSize / 2,
    overflow: "hidden"
  },
  editProfile: {
    width: editButtonSize,
    height: editButtonSize
  },
  userImage: { width: DPSize, height: DPSize },
  scoreCardButton: {
    borderRadius: 20,
    height: 40,
    backgroundColor: Colors.green
  },
  scoreCardButtonIcon: {
    position: "absolute"
  },
  calendarImage: {
    position: "absolute",
    left: 40
  }
});
