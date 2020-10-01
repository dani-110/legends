// @flow
import { StyleSheet } from "react-native";
import { Colors, AppStyles, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  userDetailsWrapper: {
    backgroundColor: Colors.grey4,
    paddingTop: Metrics.statusBarHeight + 20,
    paddingBottom: 30,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: Colors.separator,
    ...AppStyles.centerInner
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: "hidden",
    ...AppStyles.mBottom20
  },
  userImage: { width: 100, height: 100, backgroundColor: Colors.grey2 },
  listItem: {
    padding: 15
  }
});
