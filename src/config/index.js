// @flow
import { LogBox, YellowBox } from "react-native";
import DebugSettings from "./DebugSettings";

export default () => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.disableYellowBox = !DebugSettings.yellowBox;
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
    YellowBox.ignoreWarnings(['Warning: ...']);
  }
};
