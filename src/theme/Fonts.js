// @flow

import { Platform } from "react-native";
import Util from "../util";
const type = {
  base: "CircularStd-Book",
  bold: "CircularStd-Medium"
};

// Metrics.generatedFontSize(ios, android)

const getFontSize = size => (Util.isPlatformAndroid() ? size * 0.9 : size);

const size = {
  xxxxSmall: getFontSize(10),
  xxxSmall: getFontSize(11),
  xxSmall: getFontSize(13),
  xSmall: getFontSize(14),
  small: getFontSize(15),
  normal: getFontSize(16),
  medium: getFontSize(17),
  large: getFontSize(18),
  xLarge: getFontSize(22),
  xxLarge: getFontSize(24),
  xxxLarge: getFontSize(30),
  xxxxLarge: getFontSize(46)
};

export default {
  type,
  size
};
