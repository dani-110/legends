import { Platform } from "react-native";
import { Metrics, Colors } from "./";
import Fonts from "./Fonts";

// @flow

const flex = {
  flex: 1
};
const flex2 = {
  flex: 2
};
const flex3 = {
  flex: 3
};
const flex7 = {
  flex: 7
};
const flexRow = {
  flexDirection: "row"
};
const spaceBetween = {
  justifyContent: "space-between"
};
const spaceAround = {
  justifyContent: "space-around"
};

/* const shadow1 = {
  shadowColor: "rgba(76, 76, 76, 0.26)",
  shadowOffset: {
    width: 0,
    height: 8
  },
  shadowOpacity: 0.44,
  shadowRadius: 10.32,
  elevation: 16
}; */

const shadow1 = {
  shadowColor: Colors.grey5,
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.1,
  shadowRadius: 3.84,

  elevation: 5
};

const shadow2 = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.1,
  shadowRadius: 4.84,

  elevation: 2
};

const emptyListContainerStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center"
};

// Margins
// Margin TOP
const mTop0 = {
  marginTop: 0
};
const lHeight20 = {
  lineHeight: 20
};
const lHeight22 = {
  lineHeight: 22
};
const lHeight10 = {
  lineHeight: 15
};
const mTop5 = {
  marginTop: 5
};
const mTop10 = {
  marginTop: 10
};
const mTop15 = {
  marginTop: 15
};
const mTop20 = {
  marginTop: 20
};
const mTop25 = {
  marginTop: 25
};
const mTop30 = {
  marginTop: 30
};
const mTop35 = {
  marginTop: 35
};
const mTop40 = {
  marginTop: 40
};
const mTopBase = {
  marginTop: Metrics.baseMargin
};

// Margin BOTTOM
const mBottom0 = {
  marginBottom: 0
};
const mBottom5 = {
  marginBottom: 5
};
const mBottom10 = {
  marginBottom: 10
};
const mBottom15 = {
  marginBottom: 15
};
const mBottom20 = {
  marginBottom: 20
};
const mBottom25 = {
  marginBottom: 25
};
const mBottom30 = {
  marginBottom: 30
};

const mBottom35 = {
  marginBottom: 35
};

const mBottom40 = {
  marginBottom: 40
};
const mBottom45 = {
  marginBottom: 45
};
const mBottom50 = {
  marginBottom: 50
};
const mBottomBase = {
  marginBottom: Metrics.baseMargin
};
const mBottomListBottom = { marginBottom: Metrics.listBottomPadding };

// Margin RIGHT
const mRight0 = {
  marginRight: 0
};
const mRight5 = {
  marginRight: 5
};
const mRight10 = {
  marginRight: 10
};

const height200 = {
  height: 200
};
const mRight15 = {
  marginRight: 15
};
const mRight20 = {
  marginRight: 20
};
const mRight25 = {
  marginRight: 25
};
const mRight30 = {
  marginRight: 30
};
const mRightBase = {
  marginRight: Metrics.baseMargin
};

// Margin LEFT
const mLeft0 = {
  marginLeft: 0
};
const mLeft5 = {
  marginLeft: 5
};
const mLeft10 = {
  marginLeft: 10
};
const mLeft15 = {
  marginLeft: 15
};
const mLeft20 = {
  marginLeft: 20
};
const mLeft25 = {
  marginLeft: 25
};
const mLeft30 = {
  marginLeft: 30
};
const mLeftBase = {
  marginLeft: Metrics.baseMargin
};
// Margin ALL SIDES
const margin5 = {
  margin: 5
};
const margin10 = {
  margin: 10
};
const margin15 = {
  margin: 15
};
const margin20 = {
  margin: 20
};
const margin25 = {
  margin: 25
};
const margin30 = {
  margin: 30
};
const marginHorizontalBase = {
  marginRight: Metrics.baseMargin,
  marginLeft: Metrics.baseMargin
};
const marginHorizontalsmall = {
  marginRight: Metrics.baseMargin,
  marginLeft: Metrics.baseMargin
};

const marginVerticalBase = {
  marginTop: Metrics.baseMargin,
  marginBottom: Metrics.baseMargin
};

// Padding
// padding TOP
const pTop0 = {
  paddingTop: 0
};
const pTop5 = {
  paddingTop: 5
};
const pTop10 = {
  paddingTop: 10
};
const pTop15 = {
  paddingTop: 15
};
const pTop20 = {
  paddingTop: 20
};
pTop25 = {
  paddingTop: 25
};
const pTop30 = {
  paddingTop: 30
};
const pTopBase = {
  paddingTop: Metrics.baseMargin
};
// padding BOTTOM
const pBottom0 = {
  paddingBottom: 0
};
const pBottom5 = {
  paddingBottom: 5
};
const pBottom10 = {
  paddingBottom: 10
};
const pBottom15 = {
  paddingBottom: 15
};
const pBottom20 = {
  paddingBottom: 20
};
const pBottom25 = {
  paddingBottom: 25
};
const pBottom30 = {
  paddingBottom: 30
};
const pBottom100 = {
  paddingBottom: 100
};
const pTopBottom = {
  paddingTop: Metrics.baseMargin
};
const pBottomBase = {
  paddingBottom: Metrics.baseMargin
};

const pBottomListBottom = { paddingBottom: Metrics.listBottomPadding };
const pBottomListBottomWithTabbar = {
  paddingBottom: Metrics.listBottomPadding + Metrics.tabBarHeight
};
// padding RIGHT
const pRight0 = {
  paddingRight: 0
};
const pRight5 = {
  paddingRight: 5
};
const pRight10 = {
  paddingRight: 10
};
const pRight15 = {
  paddingRight: 15
};
const pRight20 = {
  paddingRight: 20
};
const pRight25 = {
  paddingRight: 25
};
const pRight30 = {
  paddingRight: 30
};
const pRightBase = {
  paddingRight: Metrics.baseMargin
};
// padding LEFT
const pLeft0 = {
  paddingLeft: 0
};
const pLeft5 = {
  paddingLeft: 5
};
const pLeft10 = {
  paddingLeft: 10
};
const pLeft15 = {
  paddingLeft: 15
};
const pLeft20 = {
  paddingLeft: 20
};
const pLeft25 = {
  paddingLeft: 25
};
const pLeft30 = {
  paddingLeft: 30
};
const pLeftBase = {
  paddingLeft: Metrics.baseMargin
};
// padding ALL SIDES
const padding0 = {
  padding: 0
};
const padding5 = {
  padding: 5
};
const padding10 = {
  padding: 10
};
const padding15 = {
  padding: 15
};
const padding20 = {
  padding: 20
};
const padding25 = {
  padding: 25
};
const padding30 = {
  padding: 30
};

const paddingHorizontalBase = {
  paddingRight: Metrics.baseMargin,
  paddingLeft: Metrics.baseMargin
};

const paddingVerticalBase = {
  paddingTop: Metrics.baseMargin,
  paddingBottom: Metrics.baseMargin
};

// styleConstantValue

const constant = {
  formInputSize: 17,
  labelSize: 15
};
const letterSpace3 = {
  letterSpacing: 3
};

// styles
const centerInner = {
  justifyContent: "center",
  alignItems: "center"
};
const alignItemsCenter = {
  alignItems: "center"
};
const baseAlign = {
  alignSelf: "baseline"
};
const alignItemsFlexEnd = {
  alignItems: "flex-end"
};
const alignItemsFlexStart = {
  alignItems: "flex-start"
};

const basePadding = {
  padding: Metrics.baseMargin
};
const baseMargin = {
  margin: Metrics.baseMargin
};
const primaryBackground = {
  backgroundColor: Colors.background.primary
};

const cardView = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
  backgroundColor: Colors.white,
  ...margin20,
  ...basePadding,
  borderRadius: Metrics.borderRadius
};

const inputStyle1 = {
  fontFamily: "CircularStd-Book",
  fontSize: Fonts.size.normal,
  borderWidth: 1,
  borderColor: Colors.grey2,
  paddingHorizontal: 10,
  ...mBottom10,
  borderRadius: Metrics.borderRadius,
  paddingVertical: 12
};

const borderBottomGrey = {
  borderBottomWidth: 1,
  borderBottomColor: Colors.grey2
};

export default {
  flex,
  flex2,
  flex3,
  flex7,
  flexRow,
  spaceBetween,
  spaceAround,
  shadow1,
  shadow2,
  emptyListContainerStyle,

  // Margins
  // Margin TOP
  mTop0,
  mTop5,
  mTop10,
  mTop15,
  mTop20,
  mTop25,
  mTop30,
  mTop35,
  mTop40,
  mTopBase,

  // Margin BOTTOM
  mBottom0,
  mBottom5,
  mBottom10,
  mBottom15,
  mBottom20,
  mBottom25,
  mBottom30,
  mBottom35,
  mBottom40,
  mBottom45,
  mBottom50,
  pBottom100,
  mBottomBase,
  mBottomListBottom,
  // Margin RIGHT
  mRight0,
  mRight5,
  mRight10,
  mRight15,
  mRight20,
  mRight25,
  mRight30,
  mRightBase,

  // Margin LEFT
  mLeft0,
  mLeft5,
  mLeft10,
  mLeft15,
  mLeft20,
  mLeft25,
  mLeft30,
  mLeftBase,
  // Margin ALL SIDES
  margin5,
  margin10,
  margin15,
  margin20,
  margin25,
  margin30,
  marginHorizontalBase,

  marginVerticalBase,
  marginHorizontalsmall,

  // Padding
  // padding TOP
  pTop0,
  pTop5,
  pTop10,
  pTop15,
  pTop20,
  pTop25,
  pTop30,
  pTopBase,
  // padding BOTTOM
  pBottom0,
  pBottom5,
  pBottom10,
  pBottom15,
  pBottom20,
  pBottom25,
  pBottom30,
  pTopBottom,
  pBottomBase,
  pBottomListBottom,
  pBottomListBottomWithTabbar,
  // padding RIGHT
  pRight0,
  pRight5,
  pRight10,
  pRight15,
  pRight20,
  pRight25,
  pRight30,
  pRightBase,
  // padding LEFT
  pLeft0,
  pLeft5,
  pLeft10,
  pLeft15,
  pLeft20,
  pLeft25,
  pLeft30,
  pLeftBase,
  // padding ALL SIDES
  padding0,
  padding5,
  padding10,
  padding15,
  padding20,
  padding25,
  padding30,
  paddingHorizontalBase,
  paddingVerticalBase,

  // styleConstantValue
  constant,
  letterSpace3,

  // styles
  centerInner,
  alignItemsCenter,
  baseAlign,
  alignItemsFlexEnd,
  alignItemsFlexStart,
  basePadding,
  baseMargin,
  primaryBackground,
  height200,
  lHeight20,
  lHeight22,
  lHeight10,
  cardView,
  inputStyle1,
  borderBottomGrey
};
