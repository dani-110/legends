// @flow
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Image as RNImage,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Swiper from "react-native-swiper";
import {
  Text,
  CustomNavbar,
  ButtonView,
  CustomKeyboard
} from "../../components";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";
import Tabbar from "../../components/Tabbar";
import { AppStyles, Colors, Images } from "../../theme";
import { Actions } from "react-native-router-flux";
import _ from "lodash";

// const rowData = [
//   ["Name", "KK", "AH", "AB", "SA"],
//   ["Stroke", 7, 4, 5, 4],
//   [
//     "FIR",
//     <RNImage source={Images.cross} />,
//     <RNImage source={Images.cross} />,
//     "",
//     <RNImage source={Images.check} />
//   ],
//   ["GIR", "", "", ""],
//   ["Putts", 3, 4, 5, 4],
//   ["Net", -1, -4, -1, -1],
//   ["Gross", +2, +5, +2, +2]
// ];

class EnterScore extends React.Component {
  static propTypes = {};

  static defaultProps = {};
  constructor(props) {
    super(props);
    var RCTUIManager = require("NativeModules").UIManager;
    this.state = {
      showKeyBoard: false,
      miniKeyBoard: false,
      current: -1,
      index: -1,
      rowData: [
        ["Name", "KK", "AH", "AB", "SA"],
        ["Stroke", 7, 4, 5, 4],
        ["FIR", "cross", "cross", "noImage", "check"],
        ["GIR", "check", "cross", "cross", "noImage"],
        ["Putts", 3, 4, 5, 4],
        ["Net", -1, -4, -1, -1],
        ["Gross", +2, +5, +2, +2]
      ]
    };
  }

  _renderHoleInfo(holeInfo) {
    return (
      <View
        style={[
          AppStyles.flexRow,
          AppStyles.marginVerticalBase,
          AppStyles.alignItemsCenter,
          AppStyles.spaceAround
        ]}
      >
        <View>
          <Text textAlign="center" size="small" color={Colors.grey}>
            Hole
          </Text>
          <Text textAlign="center" size="xxxLarge">
            {holeInfo[0]}
          </Text>
        </View>
        <View>
          <Text textAlign="center" size="small" color={Colors.grey}>
            Index
          </Text>
          <Text textAlign="center" size="xxxLarge">
            {holeInfo[1]}
          </Text>
        </View>
        <View>
          <Text textAlign="center" size="small" color={Colors.grey}>
            Par
          </Text>
          <Text textAlign="center" size="xxxLarge">
            {("0" + holeInfo[2]).slice(-2)}
          </Text>
        </View>
      </View>
    );
  }
  _showKeyBoard(mini, current, index) {
    this.myScroll.scrollToEnd({ animated: true });
    this.setState({ showKeyBoard: true, miniKeyBoard: mini, current, index });
  }

  _renderScoreTable() {
    const { rowData } = this.state;
    return (
      <View>
        {rowData.map((row, index) => {
          return (
            <View
              key={`row-${index}`}
              style={[
                (index === 0 || index === 5 || index === 6) &&
                  styles.background,
                AppStyles.borderBottomGrey,
                AppStyles.flexRow,
                AppStyles.basePadding,
                AppStyles.alignItemsCenter
              ]}
            >
              {row.map((item, itemIndex) => {
                return (
                  <View
                    key={`item-${itemIndex}`}
                    style={[itemIndex === 0 ? AppStyles.flex2 : styles.column]}
                  >
                    {isNaN(item) &&
                    (item === "check" ||
                      item === "cross" ||
                      item === "noImage") ? (
                      <View
                        style={
                          index == this.state.current &&
                          itemIndex == this.state.index
                            ? {
                                borderColor: Colors.grey,
                                borderWidth: 0.5,
                                height: 20,
                                width: 40,
                                justifyContent: "center"
                              }
                            : {
                                borderColor: Colors.transparent,
                                borderWidth: 0.5,
                                height: 20,
                                width: 40,
                                justifyContent: "center"
                              }
                        }
                      >
                        <TouchableOpacity
                          style={AppStyles.centerInner}
                          onPress={() =>
                            this._showKeyBoard(true, index, itemIndex)
                          }
                        >
                          {item === "cross" && (
                            <RNImage source={Images.cross} />
                          )}
                          {item === "check" && (
                            <RNImage source={Images.check} />
                          )}
                          {item === "noImage" && (
                            <RNImage
                              style={{ height: 18, width: 38 }}
                              source={Images.no_image}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={
                          index == this.state.current &&
                          itemIndex == this.state.index
                            ? {
                                borderColor: Colors.grey,
                                borderWidth: 0.5,
                                height: 20,
                                minWidth: 40,
                                justifyContent: "center"
                              }
                            : {
                                borderColor: Colors.transparent,
                                borderWidth: 0.5,
                                height: 20,
                                minWidth: 40,
                                justifyContent: "center"
                              }
                        }
                      >
                        {isNaN(item) ? (
                          <Text
                            textAlign={itemIndex === 0 ? "left" : "center"}
                            style={itemIndex !== 0 && AppStyles.centerInner}
                          >
                            {item}
                          </Text>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              this._showKeyBoard(false, index, itemIndex)
                            }
                          >
                            <Text
                              textAlign={itemIndex === 0 ? "left" : "center"}
                              style={itemIndex !== 0 && AppStyles.centerInner}
                            >
                              {item}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }

  _renderButton = () => (
    <View>
      <View style={[AppStyles.centerInner]}>
        <View style={[styles.buttonGroup]}>
          <ButtonView
            style={[styles.button, styles.buttonActive]}
            color={Colors.white}
            onPress={() => this._onClickScroll(this._swiper.state.index - 1)}
          >
            <RNImage
              style={[styles.buttonIcon, styles.buttonIconLeft]}
              source={Images.arrow_left_white}
            />
            <Text size="xSmall" color={Colors.white}>
              Previous
            </Text>
          </ButtonView>
          <ButtonView
            style={[styles.button, styles.buttonInActive]}
            onPress={() => this._onClickScroll(this._swiper.state.index + 1)}
          >
            <Text size="xSmall">Next</Text>
            <RNImage
              style={[styles.buttonIcon, styles.buttonIconRight]}
              source={Images.arrow_right}
            />
          </ButtonView>
        </View>
      </View>
      <View style={[AppStyles.baseMargin]}>
        <ButtonView
          style={[styles.scoreCardButton]}
          onPress={() => Actions.live_tab_scorecard()}
        >
          <Text textAlign="center" color={Colors.white}>
            View Full Score Card
          </Text>
        </ButtonView>
      </View>
    </View>
  );

  _onClickScroll = toIndex => {
    const { index, total } = this._swiper.state;
    const countSlides = total - 1;
    if (this.state.showKeyBoard) {
      this.setState({
        showKeyBoard: false,
        miniKeyBoard: false,
        current: -1,
        index: -1
      });
    }
    if (index !== toIndex && toIndex >= 0 && toIndex <= countSlides) {
      let resultSlide = 0;
      if (toIndex > index && toIndex !== countSlides) {
        resultSlide = toIndex - index;
        this._swiper.scrollBy(resultSlide, true);
      } else if (toIndex > index && toIndex === countSlides) {
        resultSlide = index + 1;
        this._swiper.scrollBy(resultSlide, true);
      } else if (toIndex < index && toIndex !== 0) {
        resultSlide = (index - toIndex) * -1;
        this._swiper.scrollBy(resultSlide, true);
      } else if (toIndex < index && toIndex === 0) {
        resultSlide = index * -1;
        this._swiper.scrollBy(resultSlide, true);
      }
    }
  };
  _hideKeyboard() {
    if (this.state.showKeyBoard) {
      this.setState({
        showKeyBoard: false,
        miniKeyBoard: false,
        current: -1,
        index: -1
      });
    }
  }
  _keyPress(text) {
    const { current, index, rowData, miniKeyBoard } = this.state;
    tempData = _.cloneDeep(rowData);
    currentText = tempData[current][index];
    if (miniKeyBoard) {
      tempData[current][index] = text;
    } else {
      if (text != "Del" && text != "-") {
        tempData[current][index] = text;
      } else if (text === "Del") {
        tempData[current][index] = "";
      }
    }
    this.setState({ rowData: tempData });
  }

  render() {
    const holeInfo1 = [13, 10, 4];
    const holeInfo2 = [14, 10, 4];
    const holeInfo3 = [15, 10, 4];

    return (
      <TouchableOpacity
        activeOpacity={9}
        onPress={() => this._hideKeyboard()}
        style={styles.container}
      >
        <CustomNavbar
          title="DMP Better Ball"
          subtitle="DHA Golf Club"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        <ScrollView
          ref={ref => {
            this.myScroll = ref;
          }}
        >
          <Swiper
            style={{ height: 450 }}
            ref={swiper => {
              this._swiper = swiper;
            }}
            showsButtons={false}
            loop={false}
            showsPagination={false}
          >
            <View>
              <View>
                {this._renderHoleInfo(holeInfo1)}
                {this._renderScoreTable()}
              </View>
            </View>
            <View>
              <View>
                {this._renderHoleInfo(holeInfo2)}
                {this._renderScoreTable()}
              </View>
            </View>
            <View>
              <View>
                {this._renderHoleInfo(holeInfo3)}
                {this._renderScoreTable()}
              </View>
            </View>
          </Swiper>
        </ScrollView>
        {this._renderButton()}
        <CustomKeyboard
          visible={this.state.showKeyBoard}
          mini={this.state.miniKeyBoard}
          onKeyPress={text => {
            this._keyPress(text);
          }}
        />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = ({ liveScore }) => ({
  liveScoreData: liveScore.lmp
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(EnterScore);
