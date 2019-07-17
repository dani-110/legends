// @flow
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Image as RNImage,
  ScrollView,
  TouchableOpacity,
  BackHandler
} from "react-native";
import Swiper from "react-native-swiper";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import { getEnterScoreDataRequest } from "../../actions/EnterScore";
import {
  Text,
  CustomNavbar,
  ButtonView,
  CustomKeyboard,
  SimpleLoader,
  EmptyStateText
} from "../../components";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";
import Tabbar from "../../components/Tabbar";
import { AppStyles, Colors, Images } from "../../theme";

class EnterScore extends React.Component {
  static propTypes = {
    current_match: PropTypes.array.isRequired,
    getEnterScoreDataRequest: PropTypes.func.isRequired,
    enterScoreData: PropTypes.object.isRequired
  };

  static defaultProps = {};
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      showKeyBoard: false,
      miniKeyBoard: false,
      current: -1,
      index: -1,
      scoreCard: []
      // rowData: [
      //   ["Name", "KK", "AH", "AB", "SA"],
      //   ["Stroke", 7, 4, 5, 4],
      //   ["FIR", "cross", "cross", "noImage", "check"],
      //   ["GIR", "check", "cross", "cross", "noImage"],
      //   ["Putts", 3, 4, 5, 4],
      //   ["Net", -1, -4, -1, -1],
      //   ["Gross", +2, +5, +2, +2]
      // ]
    };
  }

  componentWillMount() {
    const { current_match } = this.props;
    const { type, id, schedule_id, match_id, tee_off_time } = current_match[0];
    this.props.getEnterScoreDataRequest(`${type}/${id}`, data => {
      this.setState({ scoreCard: this._manipulateDataForScoreCard(data) });
    });
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    if (this.state.showKeyBoard) {
      this._hideKeyboard();
      return true;
    } else {
      return false;
    }
  }

  _showKeyBoard(mini, current, index) {
    this.setState({ showKeyBoard: true, miniKeyBoard: mini, current, index });

    setTimeout(() => {
      if (current > 4) {
        this.myScroll.scrollToEnd({ animated: true });
      }
    }, 400);
  }

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
        current: -1,
        index: -1
      });
    }
  }

  _keyPress(text) {
    const { current, index, rowData, miniKeyBoard } = this.state;
    const tempData = _.cloneDeep(rowData);
    const currentText = tempData[current][index];
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

  _manipulateDataForScoreCard(data) {
    const { players } = data;

    const updatedData = [];

    for (let i = 0; i < 18; i++) {
      updatedData.push({
        Name: [],
        Stroke: [],
        FIR: [],
        GIR: [],
        Putts: [],
        Net: [],
        Gross: []
      });
    }

    players.map(player => {
      player.scorecard.map(score => {
        updatedData[score.hole_number - 1].Name.push({
          id: players.id,
          initials: player.initials,
          handicap: players.handicap
        });
        updatedData[score.hole_number - 1].Stroke.push(score.strokes);
        updatedData[score.hole_number - 1].FIR.push(score.fir);
        updatedData[score.hole_number - 1].GIR.push(score.gir);
        updatedData[score.hole_number - 1].Putts.push(score.putts);
        updatedData[score.hole_number - 1].Net.push(score.net_score);
        updatedData[score.hole_number - 1].Gross.push(score.score);
        // updatedData[score.hole_number]
      });
    });

    return updatedData;
  }

  _renderTitle() {
    const {
      enterScoreData: {
        holeData: { tournament_name, course_name }
      }
    } = this.props;
    return (
      <CustomNavbar
        title={tournament_name}
        subtitle={course_name}
        hasBorder={false}
        theme={NAVBAR_THEME.WHITE}
        titleAlign="center"
      />
    );
  }

  _renderHoleInfo(holeInfo) {
    const { hole_number, index, par } = holeInfo;
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
            {hole_number}
          </Text>
        </View>
        <View>
          <Text textAlign="center" size="small" color={Colors.grey}>
            Index
          </Text>
          <Text textAlign="center" size="xxxLarge">
            {index}
          </Text>
        </View>
        <View>
          <Text textAlign="center" size="small" color={Colors.grey}>
            Par
          </Text>
          <Text textAlign="center" size="xxxLarge">
            {("0" + par).slice(-2)}
          </Text>
        </View>
      </View>
    );
  }

  _renderScoreTable(holeInfo, index) {
    const manipulatedData = this.state.scoreCard[index];

    // const manipulatedData = {
    //   Name: ["KK", "AH", "AB", "SA"],
    //   Stroke: [3, 4, 5, 4],
    //   FIR: [false, false, "", true],
    //   GIR: ["", "", "", ""],
    //   Putts: ["3", "4", "5", "4"],
    //   Net: ["-1", "-4", "-1", "-1"],
    //   Gross: ["2", "5", "2", "2"]
    // };

    return (
      <View>
        {Object.keys(manipulatedData).map((key, index) => (
          <View
            key={`row-${key}`}
            style={[
              (key === "Name" || key === "Net" || key === "Gross") &&
                styles.background,
              styles.rowStyles
            ]}
          >
            {this._renderRowLabel(key)}
            {this._renderRowValues(manipulatedData, key)}
          </View>
        ))}
      </View>
    );
  }

  _renderRowLabel(key) {
    return (
      <View style={AppStyles.flex2}>
        <Text textAlign="left">{key}</Text>
      </View>
    );
  }

  _renderRowValues(data, key) {
    const { current, index } = this.state;
    return data[key].map((rowItem, rowItemIndex) => (
      <View
        style={[
          styles.rowItemStyles,
          rowItemIndex === index,
          key === current && styles.rowItemActiveStyles
        ]}
      >
        <TouchableOpacity
          style={AppStyles.centerInner}
          onPress={() => this._showKeyBoard(true, key, rowItemIndex)}
        >
          {key === "FIR" ? (
            rowItem === 1 ? (
              <RNImage source={Images.check} />
            ) : rowItem === 0 ? (
              <RNImage source={Images.cross} />
            ) : (
              <RNImage
                style={{ height: 18, width: 38 }}
                source={Images.no_image}
              />
            )
          ) : (
            <Text textAlign="center" style={AppStyles.centerInner}>
              {key === "Name" ? rowItem.initials : rowItem}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    ));
  }

  _renderButton = () => (
    <View>
      <View style={[AppStyles.centerInner]}>
        <View style={[styles.buttonGroup]}>
          <ButtonView
            style={[styles.button, styles.buttonActive]}
            color={Colors.white}
            onPress={() => this._onClickScroll(this._swiper.state.index - 1)}
            // isDisabled={this._swiper.state.index <= 1}
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
            // isDisabled={this._swiper.state.index >= 18}
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

  _renderKeyboard = () => (
    <CustomKeyboard
      visible={this.state.showKeyBoard}
      mini={this.state.miniKeyBoard}
      onKeyPress={text => {
        this._keyPress(text);
      }}
    />
  );

  render() {
    const {
      enterScoreData: {
        isFetchingData,
        holeData: { holes }
      }
    } = this.props;

    return (
      <View style={styles.container}>
        {this._renderTitle()}
        {isFetchingData ? (
          <View style={[AppStyles.flex, AppStyles.doubleBaseMargin]}>
            <SimpleLoader />
          </View>
        ) : (
          <React.Fragment>
            <ScrollView
              ref={ref => {
                this.myScroll = ref;
              }}
              scrollEventThrottle={5}
              onMomentumScrollBegin={(vale, text) => {}}
              onMomentumScrollEnd={(vale, text) => {}}
              onScroll={(vale, text) => {
                if (vale.nativeEvent.contentOffset.y < -30) {
                  this._hideKeyboard();
                }
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
                {holes.map((holeInfo, index) => (
                  <View>
                    <View>
                      {this._renderHoleInfo(holeInfo)}
                      {this._renderScoreTable(holeInfo, index)}
                    </View>
                  </View>
                ))}
              </Swiper>
            </ScrollView>
            {this._renderButton()}
            {this._renderKeyboard()}
          </React.Fragment>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ general, liveScore, enterScore }) => ({
  current_match: general.current_match,
  liveScoreData: liveScore.lmp,
  enterScoreData: enterScore.data
});

const actions = { getEnterScoreDataRequest };

export default connect(
  mapStateToProps,
  actions
)(EnterScore);
