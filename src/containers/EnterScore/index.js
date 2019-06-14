// @flow
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View, Image as RNImage, ScrollView , TouchableOpacity} from "react-native";
import Swiper from "react-native-swiper";
import { Text, CustomNavbar, ButtonView ,CustomKeyboard} from "../../components";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";
import Tabbar from "../../components/Tabbar";
import { AppStyles, Colors, Images } from "../../theme";
import { Actions } from "react-native-router-flux";

const rowData = [
  ["Name", "KK", "AH", "AB", "SA"],
  ["Stroke", 3, 4, 5, 4],
  [
    "FIR",
    <RNImage source={Images.cross} />,
    <RNImage source={Images.cross} />,
    "",
    <RNImage source={Images.check} />
  ],
  ["GIR", "", "", ""],
  ["Putts", 3, 4, 5, 4],
  ["Net", -1, -4, -1, -1],
  ["Gross", +2, +5, +2, +2]
];

class EnterScore extends React.Component {
  static propTypes = {};

  static defaultProps = {};

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

  _renderScoreTable() {
    return (
      <View>
        {rowData.map((row, index) => (
          <View
            key={`row-${index}`}
            style={[
              (index === 0 || index === 5 || index === 6) && styles.background,
              AppStyles.borderBottomGrey,
              AppStyles.flexRow,
              AppStyles.basePadding,
              AppStyles.alignItemsCenter
            ]}
          >
            {row.map((item, itemIndex) => (
              <View
                key={`item-${itemIndex}`}
                style={[itemIndex === 0 ? AppStyles.flex2 : styles.column]}
              >
                {React.isValidElement(item) ? (
                  <View style={AppStyles.centerInner}>{item}</View>
                ) : (
                  <TouchableOpacity>
                  <Text
                    textAlign={itemIndex === 0 ? "left" : "center"}
                    style={itemIndex !== 0 && AppStyles.centerInner}
                  >
                    {item}
                  </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ))}
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

  render() {
    const holeInfo1 = [13, 10, 4];
    const holeInfo2 = [14, 10, 4];
    const holeInfo3 = [15, 10, 4];

    return (
      <View style={[styles.container, AppStyles.pBottomListBottom]}>
        <CustomNavbar
          title="DMP Better Ball"
          subtitle="DHA Golf Club"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        <Swiper
          ref={swiper => {
            this._swiper = swiper;
          }}
          showsButtons={false}
          loop={false}
          showsPagination={false}
        >
          <ScrollView>
            <View style={[AppStyles.flex]}>
              {this._renderHoleInfo(holeInfo1)}
              {this._renderScoreTable()}
            </View>
          </ScrollView>
          <ScrollView>
            <View style={[AppStyles.flex]}>
              {this._renderHoleInfo(holeInfo2)}
              {this._renderScoreTable()}
            </View>
          </ScrollView>
          <ScrollView>
            <View style={[AppStyles.flex]}>
              {this._renderHoleInfo(holeInfo3)}
              {this._renderScoreTable()}
            </View>
          </ScrollView>
        </Swiper>
        {this._renderButton()}
        <CustomKeyboard/>
      </View>
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
