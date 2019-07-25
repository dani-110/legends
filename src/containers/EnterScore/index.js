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
import {
  getEnterScoreDataRequest,
  postPotyScoreRequest,
  postLclScoreRequest,
  postLmpScoreRequest,
  postDmpScoreRequest
} from "../../actions/EnterScoreActions";
import {
  Text,
  CustomNavbar,
  ButtonView,
  CustomKeyboard,
  SimpleLoader,
  EmptyStateText
} from "../../components";
import { NAVBAR_THEME, ENTER_SCORE_POLLING_TIME } from "../../constants";
import styles from "./styles";
import Tabbar from "../../components/Tabbar";
import { AppStyles, Colors, Images } from "../../theme";
import { setTabbarType } from "../../actions/GeneralActions";

class EnterScore extends React.Component {
  static propTypes = {
    setTabbarType: PropTypes.func.isRequired,
    current_match: PropTypes.array.isRequired,
    userData: PropTypes.object.isRequired,
    getEnterScoreDataRequest: PropTypes.func.isRequired,
    postPotyScoreRequest: PropTypes.func.isRequired,
    postLclScoreRequest: PropTypes.func.isRequired,
    postLmpScoreRequest: PropTypes.func.isRequired,
    postDmpScoreRequest: PropTypes.func.isRequired,
    enterScoreData: PropTypes.object.isRequired
  };

  static defaultProps = {};

  static onEnter() {
    if (EnterScore.instance) {
      EnterScore.instance._onEnter();
    }
  }

  static onExit() {
    if (EnterScore.instance) {
      EnterScore.instance._onExit();
    }
  }

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      showKeyBoard: false,
      miniKeyBoard: false,
      current: -1,
      index: -1,
      scoreCard: []
    };
    EnterScore.instance = this;
  }

  componentWillMount() {
    this.getLatestScores();
    this.dataPolling = setInterval(() => {
      this.getLatestScores();
    }, ENTER_SCORE_POLLING_TIME);

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    clearInterval(this.dataPolling);
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  getLatestScores = () => {
    const { current_match } = this.props;
    const { type, id, schedule_id, match_id, tee_off_time } = current_match[0];

    const param = `${type}/${id}${schedule_id && `/${schedule_id}`}${match_id &&
      `/${match_id}`}`;

    this.props.getEnterScoreDataRequest(param, data => {
      this.setState({ scoreCard: this._manipulateDataForScoreCard(data) });
    });
  };

  _onEnter() {
    this.props.setTabbarType(false);
  }

  _onExit() {
    this.props.setTabbarType(true);
  }

  handleBackButtonClick() {
    if (this.state.showKeyBoard) {
      this._hideKeyboard();
      return true;
    }

    return false;
  }

  _isEditable(key) {
    const { current_match } = this.props;
    const { type } = current_match[0];
    const unEditableKeys = ["Name", "Net", "Gross"];
    if (type === "lcl" || type === "lmp" || type === "dmp")
      unEditableKeys.push("FIR", "GIR", "Putts");
    return !unEditableKeys.includes(key);
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
    swipe = false;
    const { current, index, scoreCard, miniKeyBoard } = this.state;
    const tempData = _.cloneDeep(scoreCard);
    const holeIndex = this._swiper.state.index;

    if (miniKeyBoard) {
      tempData[holeIndex][current][index] = text;
    } else {
      if (text != "DEL" && text != "-") {
        tempData[holeIndex][current][index] = text;
      } else if (text === "DEL") {
        tempData[holeIndex][current][index] = "";
      }
    }
    if (
      current === "FIR" ||
      current === "GIR" ||
      (text != "DEL" && text != "-" && text != 1)
    ) {
      newIndex = index;
      newCurrent = current;
      if (current === "Stroke") {
        newCurrent = "FIR";
      } else if (current === "FIR") {
        newCurrent = "GIR";
      } else if (current === "GIR") {
        newCurrent = "Putts";
      } else if (current === "Putts") {
        newIndex = index + 1;
        newCurrent = "Stroke";
        if (index === 3 && holeIndex < 17) {
          newIndex = 0;
          swipe = true;
        }
      }
      newMini = false;
      if (newCurrent === "FIR" || newCurrent === "GIR") {
        newMini = true;
      }
      newShowKeyboard = true;
      if (holeIndex === 17 && index === 3 && current === "Putts") {
        (newShowKeyboard = false), (newMini = false);
      }

      this.setState(
        {
          scoreCard: tempData,
          current: newCurrent,
          miniKeyBoard: newMini,
          index: newIndex,
          showKeyBoard: newShowKeyboard
        },
        () => {
          this._updateGrossNetScores().then(() => {
            this._postData(current, index, tempData, text);
          });
          if (swipe) {
            this._onClickScroll(this._swiper.state.index + 1);
          }
        }
      );
    } else {
      this.setState({ scoreCard: tempData }, () => {
        this._updateGrossNetScores().then(() => {
          this._postData(current, index, tempData, text);
        });
      });
    }
  }

  async _updateGrossNetScores() {
    const { index, scoreCard } = this.state;
    const holeIndex = this._swiper.state.index;
    const tempData = _.cloneDeep(scoreCard);
    const holePar = this.props.enterScoreData.holeData.holes[holeIndex].par;
    const holeStroke = scoreCard[holeIndex].Stroke[index];
    const previousGross =
      (scoreCard[holeIndex - 1] && scoreCard[holeIndex - 1].Gross[index]) || 0;
    const handicap = scoreCard[holeIndex].Name[index].handicap || 0;
    const gross = holeStroke - holePar + previousGross;
    const net = gross - handicap;

    tempData[holeIndex].Gross[index] = gross;
    tempData[holeIndex].Net[index] = net;

    await this.setStateAsync({ scoreCard: tempData });
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
      player.scorecard.map((score, index) => {
        updatedData[index].Name.push({
          id: player.íd || player.id,
          initials: player.initials,
          handicap: player.handicap
        });
        updatedData[index].Stroke.push(score.strokes);
        updatedData[index].FIR.push(score.fir);
        updatedData[index].GIR.push(score.gir);
        updatedData[index].Putts.push(score.putts);
        updatedData[index].Net.push(score.net_score);
        updatedData[index].Gross.push(score.score);
      });
    });

    return updatedData;
  }

  _postData(current, indexParam, scoreCard, value) {
    const keyBindings = {
      Stroke: "strokes",
      FIR: "fir",
      GIR: "gir",
      Putts: "putts"
    };
    const {
      enterScoreData: { holeData }
    } = this.props;
    const { hole_number, index, par } = holeData.holes[
      this._swiper.state.index
    ];
    const { current_match } = this.props;
    const { id, type, match_id, schedule_id } = current_match[0];
    const playerIndex = {
      1: [0, "", 1],
      2: [2, 0, 0],
      3: [1, "", 3],
      4: [2, 1, 2]
    };
    const score_array = {};
    const netscore_array = {};

    for (let i = hole_number - 1; i < 18; i++) {
      score_array[`hole${i + 1}`] = scoreCard[i].Gross[indexParam];
      netscore_array[`hole${i + 1}`] = scoreCard[i].Net[indexParam];
    }

    const payload = {
      match_id,
      schedule_id,
      hole_number,
      index,
      par,
      user_id: scoreCard[hole_number - 1].Name[indexParam].id || null,
      player_id: scoreCard[hole_number - 1].Name[indexParam].id || null,
      tournament_id: parseInt(id, 10) || null,
      key: keyBindings[current] || null,
      value: parseInt(value, 10),
      score: scoreCard[hole_number - 1].Gross[indexParam] || null,
      net_score: scoreCard[hole_number - 1].Net[indexParam] || null,
      netscore_array,
      score_array,
      player: `p${playerIndex[indexParam + 1][0]}${
        playerIndex[indexParam + 1][1]
      }`,
      player1_stroke: !(indexParam % 2) ? value : "",
      player2_stroke: indexParam % 2 ? value : "",
      season_id: parseInt(id, 10) || null,
      opponent_id:
        scoreCard[hole_number - 1].Name[playerIndex[indexParam + 1][2]].id
    };
    this._postDataByType[type](payload);
  }

  _postDataByType = {
    poty: payload => {
      this.props.postPotyScoreRequest(payload);
    },
    lcl: payload => {
      this.props.postLclScoreRequest(payload);
    },
    lmp: payload => {
      this.props.postLmpScoreRequest(payload);
    },
    dmp: payload => {
      this.props.postDmpScoreRequest(payload);
    }
  };

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

    return (
      manipulatedData && (
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
      )
    );
  }

  _renderRowLabel(key) {
    return (
      <View style={[AppStyles.flex2, AppStyles.basePadding]}>
        <Text textAlign="left">{key}</Text>
      </View>
    );
  }
  _onSwipe() {
    this.setState({
      current: "Stroke",
      index: 0,
      showKeyBoard: true,
      miniKeyBoard: false
    });
  }
  _renderRowValues(data, key) {
    const { current, index } = this.state;
    return data[key].map((rowItem, rowItemIndex) => (
      <View key={`scorecard=${rowItemIndex}`}>
        <TouchableOpacity
          style={[
            AppStyles.centerInner,
            rowItemIndex === index &&
              key !== "Name" &&
              styles.activeColRowItemActiveStyles,
            styles.rowItemStyles,
            rowItemIndex === index &&
              key === current &&
              styles.rowItemActiveStyles
          ]}
          onPress={() =>
            this._isEditable(key) &&
            this._showKeyBoard(
              key === "FIR" || key === "GIR",
              key,
              rowItemIndex
            )
          }
        >
          {key === "FIR" || key === "GIR" ? (
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
    <View style={[AppStyles.baseMargin]}>
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
      {/* <View style={[AppStyles.baseMargin]}>
        <ButtonView
          style={[styles.scoreCardButton]}
          onPress={() => Actions.live_tab_scorecard()}
        >
          <Text textAlign="center" color={Colors.white}>
            View Full Score Card
          </Text>
        </ButtonView>
      </View> */}
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
      enterScoreData: { isFetchingData, holeData }
    } = this.props;

    const { holes } = holeData;

    return (
      <View style={styles.container}>
        {this._renderTitle()}
        {isFetchingData ? (
          <View style={[AppStyles.flex, AppStyles.doubleBaseMargin]}>
            <SimpleLoader />
          </View>
        ) : holeData && holes ? (
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
                onIndexChanged={() => this._onSwipe()}
              >
                {holes.map((holeInfo, index) => (
                  <View key={`holes-${index}`}>
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
        ) : (
          <EmptyStateText />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ general, liveScore, enterScore, user }) => ({
  current_match: general.current_match,
  liveScoreData: liveScore.lmp,
  enterScoreData: enterScore.data,
  userData: user.userData
});

const actions = {
  getEnterScoreDataRequest,
  postPotyScoreRequest,
  postLclScoreRequest,
  postLmpScoreRequest,
  postDmpScoreRequest,
  setTabbarType
};

export default connect(
  mapStateToProps,
  actions
)(EnterScore);
