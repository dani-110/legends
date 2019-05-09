const white = "#FFFFFF";
const black = "#000000";
const grey = "#707070";
const yellow = "#ffc415";
const green = "#00bc56";

const iceblue = "#f5f8ff";

const transparent = "rgba(0,0,0,0)";
const red = "#f94242";
const blue = "#4965b3";
const primary = white;
const secondary = white;
const tertiary = black;
const quaternary = grey;

const background = {
  primary,
  secondary: "#f2f2f2",
  tertiary: "#00000057"
};

const text = {
  primary: "#212121",
  secondary: "#bcbcbc",
  tertiary: primary,
  quaternary: "#707070",
  accent: "#ff2824"
};

const navbar = {
  background: background.primary,
  text: text.primary
};

const dateColors = [
  red,
  yellow,
  blue,
  blue,
  yellow,
  green,
  blue,
  blue,
  green,
  yellow,
  green,
  red,
  yellow,
  blue,
  green,
  yellow,
  iceblue
];
const border = "#f2f2f2";
const separator = "#f2f2f2";

const windowTint = "rgba(0, 0, 0, 0.4)";
const windowTintWhite = "rgba(255, 255, 255, 0.1)";

export default {
  white,
  black,
  grey,
  yellow,
  transparent,
  red,
  blue,
  green,
  primary,
  secondary,
  tertiary,
  quaternary,
  background,
  navbar,
  text,
  border,
  separator,
  windowTint,
  windowTintWhite,
  dateColors
};
