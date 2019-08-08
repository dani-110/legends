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
import { NAVBAR_THEME, POLLING_TIME } from "../../constants";
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
    }, POLLING_TIME);

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  componentDidMount() {
    this._onSwipe();
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

    if (!this.state.showKeyBoard) {
      this.props.getEnterScoreDataRequest(param, data => {
        this.setState({ scoreCard: this._manipulateDataForScoreCard(data) });
      });
    }
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
    this._swiper.scrollBy(toIndex, true);
  };

  _isButtonDisabled = buttonType => {
    // If swiper has not initiated yet.
    if (!this._swiper) return true;

    const { index, total } = this._swiper.state;

    if (buttonType === "prev") return index < 1;

    return index > total - 1;
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
    const { current_match } = this.props;
    const { type } = current_match[0];
    let swipe = false;
    const { current, index, scoreCard, miniKeyBoard } = this.state;
    const tempData = _.cloneDeep(scoreCard);
    const holeIndex = this._swiper.state.index;

    if (miniKeyBoard) {
      tempData[holeIndex][current][index] = text;
    } else if (text !== "DEL" && text !== "-") {
      if (tempData[holeIndex][current][index] === 1) {
        tempData[holeIndex][current][index] = `${
          tempData[holeIndex][current][index]
        }${text}`;
      } else {
        tempData[holeIndex][current][index] = text;
      }
    } else if (text === "DEL") {
      tempData[holeIndex][current][index] = "";
    } else if (text === "-") {
      tempData[holeIndex][current][index] = "-";
    }

    if (
      current === "FIR" ||
      current === "GIR" ||
      (text !== "DEL" && text !== 1)
    ) {
      let newIndex = index;
      let newCurrent = current;

      if (type === "poty") {
        if (current === "Stroke") {
          newCurrent = "FIR";
        } else if (current === "FIR") {
          newCurrent = "GIR";
        } else if (current === "GIR") {
          newCurrent = "Putts";
        } else if (current === "Putts") {
          newIndex = index + 1;
          newCurrent = "Stroke";
          if (index === scoreCard[0].Name.length - 1 && holeIndex < 17) {
            newIndex = 0;
            swipe = true;
          }
        }
      } else {
        newIndex = index + 1;
        if (index === scoreCard[0].Name.length - 1 && holeIndex < 17) {
          newIndex = 0;
          swipe = true;
        }
      }

      let newMini = false;
      if (newCurrent === "FIR" || newCurrent === "GIR") {
        newMini = true;
      }
      let newShowKeyboard = true;
      if (holeIndex === 17 && index === 3 && current === "Putts") {
        (newShowKeyboard = false), (newMini = false);
      }

      if (swipe) {
        this._swiper.scrollBy(1, true);
      }
      this.setState(
        {
          scoreCard: tempData,
          miniKeyBoard: newMini,
          showKeyBoard: newShowKeyboard
        },
        () => {
          this._updateGrossNetScores().then(() => {
            this.setState(
              {
                current: newCurrent,
                index: newIndex
              },
              () => {
                this._postData(holeIndex, current, index, tempData, text);
              }
            );
          });
        }
      );
    } else {
      this.setState({ scoreCard: tempData }, () => {
        this._updateGrossNetScores().then(() => {
          this._postData(holeIndex, current, index, tempData, text);
        });
      });
    }
  }

  /**
   * @state : {
   *  index: active column
   *  scoreCard: Complete scores | eg: [0:{hole_number: 1}]
   * }
   * @holeIndex : Current hole index starting with 0
   */
  async _updateGrossNetScores() {
    const { index, scoreCard } = this.state;
    const {
      enterScoreData: {
        holeData: { holes }
      }
    } = this.props;
    const tempData = _.cloneDeep(scoreCard);
    const { Name } = scoreCard[0];

    let gross = 0;
    let net = 0;

    for (let i = 0; i < 18; i += 1) {
      const { Stroke } = scoreCard[i];
      const par = holes[i].par;
      const holeIndex = holes[i].index;
      const handicap = Name[index].handicap || 0;
      const holeStroke = holeIndex <= handicap ? 1 : 0;
      const previousGross =
        i < 1
          ? 0
          : tempData[i - 1].Gross[index] &&
            _.isInteger(tempData[i - 1].Gross[index])
          ? tempData[i - 1].Gross[index]
          : 0;
      const previousNet =
        i < 1
          ? 0
          : tempData[i - 1].Net[index] &&
            _.isInteger(tempData[i - 1].Net[index])
          ? tempData[i - 1].Net[index]
          : 0;

      gross =
        Stroke[index] && _.isInteger(Stroke[index])
          ? Stroke[index] - par + previousGross
          : previousGross;
      net =
        Stroke[index] && _.isInteger(Stroke[index])
          ? Stroke[index] - par - holeStroke + previousNet
          : previousNet;
      tempData[i].Gross[index] = gross;
      tempData[i].Net[index] = net;
    }
    for (let i = 0; i < 18; i++) {
      if (_.isInteger(scoreCard[i].Stroke[index])) {
        tempData[i].Gross[index] = gross;
      }
      if (_.isInteger(scoreCard[i].Stroke[index])) {
        tempData[i].Net[index] = net;
      }
    }

    await this.setStateAsync({ scoreCard: tempData });
  }

  _manipulateDataForScoreCard(data) {
    const { players } = data;

    const updatedData = [];

    let dataLength = 1;
    players.map(player => {
      if (player.scorecard.length > dataLength) {
        dataLength = player.scorecard.length;
      }
    });

    for (let i = 0; i < 18; i++) {
      updatedData.push({
        Name: ["", "", "", ""],
        Stroke: ["", "", "", ""],
        FIR: ["", "", "", ""],
        GIR: ["", "", "", ""],
        Putts: ["", "", "", ""],
        Net: ["", "", "", ""],
        Gross: ["", "", "", ""]
      });
    }

    players.map((player, playerIndex) => {
      updatedData[0].Name[playerIndex] = {
        id: player.íd || player.id,
        initials: player.initials,
        handicap: player.handicap
      };
      player.scorecard.map((score, index) => {
        updatedData[score.hole_number - 1].Stroke[playerIndex] = score.strokes;
        updatedData[score.hole_number - 1].FIR[playerIndex] = score.fir;
        updatedData[score.hole_number - 1].GIR[playerIndex] = score.gir;
        updatedData[score.hole_number - 1].Putts[playerIndex] = score.putts;
        updatedData[score.hole_number - 1].Net[playerIndex] = score.net_score;
        updatedData[score.hole_number - 1].Gross[playerIndex] = score.score;
      });
    });
    return updatedData;
  }

  _postData(holeIndex, current, indexParam, scoreCardd, value) {
    const keyBindings = {
      Stroke: "strokes",
      FIR: "fir",
      GIR: "gir",
      Putts: "putts"
    };
    const {
      current_match,
      enterScoreData: { holeData }
    } = this.props;
    const { index, par } = holeData.holes[holeIndex];
    const { scoreCard } = this.state;
    const handicap = scoreCard[0].Name[indexParam].handicap || 0;
    const { id, type, match_id, schedule_id } = current_match[0];
    const playerIndex = {
      1: [0, "", 1],
      2: [2, 0, 0],
      3: [1, "", 3],
      4: [2, 1, 2]
    };
    const score_array = {};
    const netscore_array = {};

    for (let i = holeIndex; i < 18; i++) {
      score_array[`hole${i + 1}`] = scoreCard[i].Stroke[indexParam]
        ? scoreCard[i].Gross[indexParam]
        : "";
      netscore_array[`hole${i + 1}`] = scoreCard[i].Stroke[indexParam]
        ? scoreCard[i].Net[indexParam]
        : "";
    }

    let payload = {};
    const adj_score = this._calculateAdjScore(handicap, par, value);

    if (type === "poty") {
      payload = {
        adj_score,
        hole_number: holeIndex + 1,
        index,
        key: keyBindings[current] || null,
        net_score: scoreCard[holeIndex].Net[indexParam] || null,
        par,
        score: scoreCard[holeIndex].Gross[indexParam] || 0,
        tournament_id: parseInt(id, 10) || null,
        user_id: scoreCard[0].Name[indexParam].id || null,
        value: _.isInteger(value) ? parseInt(value, 10) : value,
        netscore_array,
        score_array
      };
    } else if (type === "lcl") {
      payload = {
        adj_score,
        hole_number: holeIndex + 1,
        index,
        par,
        value: _.isInteger(value) ? parseInt(value, 10) : value,
        match_id: parseInt(match_id, 10) || null,
        opponent_id: scoreCard[0].Name[playerIndex[indexParam + 1][2]].id,
        player: `p${playerIndex[indexParam + 1][0]}${
          playerIndex[indexParam + 1][1]
        }`,
        player1_stroke: !(indexParam % 2) ? value : "",
        player2_stroke: indexParam % 2 ? value : "",
        player_id: scoreCard[0].Name[indexParam].id || null,
        schedule_id: parseInt(schedule_id, 10) || null,
        season_id: parseInt(id, 10) || null
      };
    } else {
      payload = {
        match_id,
        schedule_id,
        hole_number: holeIndex + 1,
        index,
        par,
        user_id: scoreCard[0].Name[indexParam].id || null,
        player_id: scoreCard[0].Name[indexParam].id || null,
        tournament_id: parseInt(id, 10) || null,
        key: keyBindings[current] || null,
        value: _.isInteger(value) ? parseInt(value, 10) : value,
        score: scoreCard[holeIndex].Gross[indexParam] || 0,
        net_score: scoreCard[holeIndex].Net[indexParam] || null,
        netscore_array,
        score_array,
        player: `p${playerIndex[indexParam + 1][0]}${
          playerIndex[indexParam + 1][1]
        }`,
        player1_stroke: !(indexParam % 2) ? value : "",
        player2_stroke: indexParam % 2 ? value : "",
        season_id: parseInt(id, 10) || null,
        opponent_id: scoreCard[0].Name[playerIndex[indexParam + 1][2]].id
      };
    }
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

  _calculateAdjScore(current_handicap, par, stroke) {
    let adj_score = "";
    let checkValue = "";

    if (current_handicap <= 9) {
      checkValue = par + 2;
    } else if (current_handicap >= 10 && current_handicap <= 19) {
      checkValue = 7;
    } else if (current_handicap >= 20 && current_handicap <= 29) {
      checkValue = 8;
    } else if (current_handicap >= 30 && current_handicap <= 39) {
      checkValue = 9;
    } else if (current_handicap >= 40) {
      checkValue = 10;
    }

    if (checkValue < stroke) {
      adj_score = checkValue;
    } else {
      adj_score = stroke;
    }

    if (adj_score === 0) return "EVEN";
    return adj_score;
  }

  /**
   * This methd takes array and checks if it contains any scores
   *
   * @param array the array to be checked.
   * @returns Returns `2` if the array has all the scores filled, `1` if it has any score else `0`.
   */
  _arrayHasScores(array) {
    let countValues = 0;
    array.forEach(item => {
      _.isInteger(item) && countValues++;
    });
    if (countValues === 4) return 2;
    if (countValues > 0) return 1;
    return 0;
  }

  _renderTitle() {
    const { current_match } = this.props;
    const { id, type, match_id, schedule_id } = current_match[0];
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
        rightBtnImage={Images.scoreCard}
        rightBtnPress={() => {
          Actions.scorecard({
            act: {
              action: "GetHoleDataForTournament",
              // id: id,
              type: "poty"
              // season_id: parseInt(id, 10),
              // match_id: match_id ? match_id : "",
              // schedule_id: schedule_id ? schedule_id : ""
            }
          });
        }}
      />
    );
  }

  _renderSwiper(players, holes) {
    const dataLength = 0;
    // players &&
    //   players.map(player => {
    //     if (player.scorecard.length > dataLength) {
    //       dataLength = player.scorecard.length;
    //     }
    //   });

    const lastEditableKey = "Putts";

    const { scoreCard } = this.state;

    if (!scoreCard.length) {
      return (
        <View style={[AppStyles.flex, AppStyles.doubleBaseMargin]}>
          <SimpleLoader />
        </View>
      );
    }

    /**
     * TODO: This needs to be handled properly.
     */

    // for (let i = 0, l = scoreCard.length; i < l; i++) {
    //   const { Stroke, FIR, GIR, Putts } = scoreCard[i];

    //   if (
    //     (((this._arrayHasScores(Stroke) === this._arrayHasScores(FIR)) ===
    //       this._arrayHasScores(GIR)) ===
    //       this._arrayHasScores(Putts)) ===
    //     2
    //   ) {
    //     dataLength = dataLength < 17 ? i + 1 : dataLength;
    //   } else if (
    //     (((this._arrayHasScores(Stroke) === this._arrayHasScores(FIR)) ===
    //       this._arrayHasScores(GIR)) ===
    //       this._arrayHasScores(Putts)) ===
    //     1
    //   ) {
    //     dataLength = i;
    //   } else {
    //     break;
    //   }
    // }

    const holeScreens = [];

    for (let i = 0; i <= 17; i += 1) {
      holeScreens.push(
        <View>
          <View>
            {this._renderHoleInfo(holes[i])}
            {this._renderScoreTable(holes[i], i)}
          </View>
        </View>
      );
    }

    return (
      <Swiper
        style={{ height: 450 }}
        // index={dataLength}
        ref={swiper => {
          this._swiper = swiper;
        }}
        showsButtons={false}
        loop={false}
        showsPagination={false}
        onIndexChanged={() => this._onSwipe()}
      >
        {holeScreens}
      </Swiper>
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
            {("0" + hole_number).slice(-2)}
          </Text>
        </View>
        <View>
          <Text textAlign="center" size="small" color={Colors.grey}>
            Index
          </Text>
          <Text textAlign="center" size="xxxLarge">
            {("0" + index).slice(-2)}
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
              // key={`row-${key}`}
              style={[
                (key === "Name" || key === "Net" || key === "Gross") &&
                  styles.background,
                styles.rowStyles
              ]}
            >
              {this._renderRowLabel(key)}
              {key === "Name"
                ? this._renderRowHeader()
                : this._renderRowValues(manipulatedData, key)}
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
    // this.setState({
    //   current: "Stroke",
    //   index: 0,
    //   showKeyBoard: true,
    //   miniKeyBoard: false
    // });
  }
  _renderRowHeader() {
    const { scoreCard } = this.state;

    const { Name } = scoreCard[0];

    return Name.map(item => (
      <View style={[AppStyles.centerInner, styles.rowItemStyles]}>
        <Text textAlign="center" style={AppStyles.centerInner}>
          {item.initials}
        </Text>
      </View>
    ));
  }
  _renderRowValues(data, key) {
    const { current, index, scoreCard } = this.state;
    const { Name } = scoreCard[0];

    return Name.map((nameItem, nameIndex) => {
      const rowItem = data[key][nameIndex];
      return (
        <TouchableOpacity
          style={[
            AppStyles.centerInner,
            styles.rowItemStyles,
            nameIndex === index &&
              key === current &&
              styles.rowItemActiveStyles,
            nameIndex === index && styles.activeColRowItemActiveStyles
          ]}
          onPress={() =>
            this._isEditable(key) &&
            this._showKeyBoard(key === "FIR" || key === "GIR", key, nameIndex)
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
              {key === "Gross" || key === "Net"
                ? rowItem === 0
                  ? "E"
                  : Math.sign(rowItem) === 1
                  ? `+${rowItem}`
                  : rowItem
                : rowItem}
            </Text>
          )}
        </TouchableOpacity>
      );
    });
  }

  _renderButton = () => (
    <View style={[AppStyles.baseMargin]}>
      <View style={[AppStyles.centerInner]}>
        <View style={[styles.buttonGroup]}>
          <ButtonView
            style={[styles.button, styles.buttonActive]}
            color={Colors.white}
            onPress={() => this._onClickScroll(-1)}
            // isDisabled={this._isButtonDisabled("prev")}
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
            onPress={() => this._onClickScroll(1)}
            // isDisabled={this._isButtonDisabled("next")}
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

    const { holes, players } = holeData;

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
              {this._renderSwiper(players, holes)}
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
