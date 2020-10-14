// @flow
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import util from "../../util";
import { BASE_URL } from '../../config/WebService';
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import {
  View,
  Image as RNImage,
  ScrollView,
  TouchableOpacity,
  BackHandler, Dimensions, Alert, FlatList,
  CheckBox, StyleSheet, ActivityIndicator
} from "react-native";
import Swiper from "react-native-swiper";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import {
  getEnterScoreDataRequest,
  postPotyScoreRequest,
  postLclScoreRequest,
  postLmpScoreRequest,
  postDmpScoreRequest,
  updateRefresh
} from "../../actions/EnterScoreActions";
import {
  Text,
  CustomNavbar,
  ButtonView,
  CustomKeyboard,
  SimpleLoader,
  EmptyStateText,
} from "../../components";
import { NAVBAR_THEME, POLLING_TIME, NOT_SHOW_MSG, ERROR_API, REFRESH_DATA } from "../../constants";
import styles from "./styles";
import Tabbar from "../../components/Tabbar";
import { AppStyles, Colors, Fonts, Images } from "../../theme";
import { setTabbarType } from "../../actions/GeneralActions";
import { ViewPropTypes } from "react-native";
import Util from "../../util";

let newIndex = 1;
isAlreadyCalled = false;
let indexer = 0;
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

  //HOLD PAYLOAD DATA..
  tmpData = [];
  state = {
    currntEntryPoint: 0,
    userName: "",
    userID: 0,
    isAlreadyUpdated: false,
    currentWithdrawStatus: false,
    showLongPressPopUp: false,
    visible: false,
    showSubmitButton: false,
    showConformPopUp: false,
    dataSource: [],
    checked: false,
    colorChanged: false,
    score_lock: 0
  }

  //
  /***
    check current hole of team and update to that position  */


  _showSubmitScore(toIndex) {

  }

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

  /***
   *-----------------------  condition changed -----------------------
   */
  static getDerivedStateFromProps(props, state) {
    if (props.enterScoreData.named === NOT_SHOW_MSG || props.enterScoreData.named === ERROR_API || props.enterScoreData.named === REFRESH_DATA) {

      if (props.enterScoreData.named === ERROR_API)
        Util.topAlertError("not update", ERROR_API);

      if (state.isLoading) {
        props.updateRefresh()
        console.log("next index is:" + newIndex);
        return { isLoading: false, index: newIndex, colorChanged: props.enterScoreData.poty_complete === "not-complete" ? false : true }
      }
    }

    if (!_.isEqual(props.enterScoreData, state.prevEnterScoreData)) {

      return {
        prevEnterScoreData: props.enterScoreData,
        scoreCard: manipulateDataForScoreCard(props.enterScoreData.holeData),
        colorChanged: props.enterScoreData.holeData.AllPotyHole === "not-complete" ? false : true,
        isLoading: false
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      showKeyBoard: false,
      miniKeyBoard: false,
      current: -1,
      index: -1,
      scoreCard: [],
      isLoading: false
    };
    newIndex = 0;
    EnterScore.instance = this;
  }

  state = {
    lastUpdatedOn: null
  };

  componentDidMount() {
    this.getLatestScores();

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this._onSwipe();
  }

  componentWillUnmount() {
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
    const { showKeyBoard, lastUpdatedOn } = this.state;
    this.setState({ showSubmitButton: false })
    // if (showKeyBoard) return;
    let param = "";
    if (type === "poty") {
      param = `${type}/${id}`;
      this.setState({ showSubmitButton: true })
    }
    else if (type === "lmp") {
      param = `${type}/${id}/${schedule_id && ` /${schedule_id}`}${match_id &&
        `/${match_id}`}`;//${lastUpdatedOn ? `/${lastUpdatedOn}` : ``}
    }
    else if (type === "dmp") {
      param = `${type}/${id}/${schedule_id && ` /${schedule_id}`}${match_id &&
        `/${match_id}`}`;//${lastUpdatedOn ? `/${lastUpdatedOn}` : ``}
    }
    else if (type === "lcl") {
      param = `${type}/${id}/${schedule_id && ` /${schedule_id}`}${match_id &&
        `/${match_id}`}`;//${lastUpdatedOn ? `/${lastUpdatedOn}` : ``}
    }
    else {
      param = `${type}/${id}${schedule_id && `/${schedule_id}`}${match_id &&
        `/${match_id}`}${lastUpdatedOn ? `/${lastUpdatedOn}` : ``}`;
    }

    this.props.getEnterScoreDataRequest(param, type, data => {
      this.setState({
        lastUpdatedOn: moment().unix()
        // scoreCard: this._manipulateDataForScoreCard(data)
      });
    });
  };

  _onEnter() {

    this.props.setTabbarType(false);
    this.dataPolling = setInterval(() => {

      this.getLatestScores();
    }, POLLING_TIME);
  }

  _onExit() {
    this.props.setTabbarType(true);
    this.setState({ isAlreadyUpdated: false })
    clearInterval(this.dataPolling);
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

  _onClickScroll(toIndex_, hole_number) {
    //Alert.alert(("0" + hole_number).slice(-2))
    if ((hole_number).slice(-2) == 18 && toIndex_ == 1) {
      this._swiper.scrollTo(0, true);
    } else if ((hole_number).slice(-2) == 1 && toIndex_ == -1) {
      this._swiper.scrollTo(18, true);
    }
    else {
      this._swiper.scrollBy(toIndex_, true);
    }

  }

  _CheckEntryPoint(entryPoint) {
    //  if (!isAlreadyCalled) {
    // isAlreadyCalled = true;
    //  this._swiper.scrollTo(entryPoint, true)

    //  }
  }

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

  //this.setState({ visible: true });
  _keyPress(text) {
    console.log("keyboard data is:" + text)
    const { current_match } = this.props;
    const { type } = current_match[0];
    let swipe = false;
    debugger
    const { current, index, scoreCard, miniKeyBoard } = this.state;
    let withdrawPos = this.state.scoreCard[0].Name[(index === (scoreCard[0].Name.length - 1)) ? 0 : index + 1].withdraw;;
    const tempData = _.cloneDeep(scoreCard);
    const holeIndex = this._swiper.state.index;


    if (miniKeyBoard) {
      tempData[holeIndex][current][index] = text;
    } else if (text !== "DEL" && text !== "-") {
      if (tempData[holeIndex][current][index] === 1) {
        tempData[holeIndex][current][
          index
        ] = `${tempData[holeIndex][current][index]}${text}`;
      } else {
        tempData[holeIndex][current][index] = text;
      }
    } else if (text === "DEL") {
      tempData[holeIndex][current][index] = "";
    } else if (text === "-") {
      tempData[holeIndex][current][index] = "-";
    }

    console.log("current is:" + current);
    if (
      current === "FIR" ||
      current === "GIR" ||
      current === "Putts" ||
      (text !== "DEL" && text !== 1)
    ) {
      //let newIndex = index;
      newIndex = index;
      let newCurrent = current;

      // if (type === "poty") {
      //   if (current === "Stroke") {
      //     newCurrent = "FIR";
      //   } else if (current === "FIR") {
      //     newCurrent = "GIR";
      //   } else if (current === "GIR") {
      //     newCurrent = "Putts";
      //   } else if (current === "Putts") {
      //     newIndex = index + 1;
      //     newCurrent = "Stroke";
      //     if (index === scoreCard[0].Name.length - 1 && holeIndex < 17) {
      //       newIndex = 0;
      //       swipe = true;
      //     }
      //   }
      // } else {
      //   newIndex = index + 1;
      //   if (index === scoreCard[0].Name.length - 1 && holeIndex < 17) {
      //     newIndex = 0;
      //     swipe = true;
      //   }
      // }

      if (withdrawPos === "0") {
        newIndex = index + 1;
      } else {
        newIndex = index + 2;
      }

      if (index === scoreCard[0].Name.length - 1 && holeIndex < 17) {
        newIndex = 0;
        swipe = true;
      }

      let newMini = false;
      if (newCurrent === "FIR" || newCurrent === "GIR") {
        newMini = true;
      }
      let newShowKeyboard = true;
      if (holeIndex === 17 && index === 3 && current === "Putts") {
        (newShowKeyboard = false), (newMini = false);
      }

      console.log("next index increment:-->" + newIndex);

      if (swipe) {

        debugger;
        newIndex = 0;
        for (let i = 0; i <= scoreCard[0].Name.length - 1; i++) {
          withdrawPos = this.state.scoreCard[0].Name[i].withdraw;
          if (withdrawPos === "0") {
            newIndex = newIndex;
            break;
          } else {
            newIndex += 1;
          }
        }

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
                index: swipe ? newIndex : index
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

  _postData(holeIndex, current, indexParam, scoreCardd, value) {
    console.log("hole index is:" + holeIndex);
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
        player: `p${playerIndex[indexParam + 1][0]}${playerIndex[indexParam + 1][1]
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
        player: `p${playerIndex[indexParam + 1][0]}${playerIndex[indexParam + 1][1]
          }`,
        player1_stroke: !(indexParam % 2) ? value : "",
        player2_stroke: indexParam % 2 ? value : "",
        season_id: parseInt(id, 10) || null,
        opponent_id: scoreCard[0].Name[playerIndex[indexParam + 1][2]].id
      };
    }
    this._postDataByType[type](payload);
    this.setState({ isLoading: true });
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
    const {
      current_match,
      enterScoreData: {
        holeData: { tournament_name, course_name, players }
      }
    } = this.props;
    const { type, id, schedule_id, match_id } = current_match[0];

    return (
      <View style={{ paddingBottom: 10, paddingTop: 10, backgroundColor: Colors.green }}>
        <CustomNavbar
          title={tournament_name}
          subtitle={course_name}
          hasBorder={true}
          subt
          theme={NAVBAR_THEME.GREEN}
          titleAlign="center"
          fontType="medium"
          rightBtnImage={Images.scoreCardBlackWithBg}
          rightBtnPress={() => {
            debugger
            Actions.scorecard({
              act: {
                action: "GetHoleDataForTournament",
                id,
                type,
                season_id: parseInt(id, 10),
                match_id,
                schedule_id,
                team1_p1: players && players[0] && players[0].id,
                team2_p1: players && players[1] && players[1].id,
                team1_p2: players && players[2] && players[2].id,
                team2_p2: players && players[3] && players[3].id
              }
            });
          }}
        />

      </View>
    );
  }

  _updateIndex(hole_starting, index_) {
    debugger
    if (!this.state.isAlreadyUpdated) {
      this.setState({ isAlreadyUpdated: true })
      indexer = parseInt(hole_starting) - 1;
    }
    return indexer;
  }
  _renderSwiper(players, holes, hole_starting) {
    let dataLength = 0;
    if (players) {
      players.map(player => {
        if (player.scorecard.length > dataLength) {
          dataLength = player.scorecard.length;
        }
      });
    }

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
        <View style={{ backgroundColor: Colors.green, }}>
          <View style={{ backgroundColor: Colors.white, marginTop: 10, borderRadius: 50 }}>
            {this._renderHoleInfo(holes[i])}
            {this._renderScoreTable(holes[i], i)}
          </View>

        </View>
      );
    }

    return (
      <View>
        <Swiper
          style={{ height: 400 }}
          index={this._updateIndex(hole_starting, 0)}
          ref={swiper => {
            this._swiper = swiper;
          }}
          loop={false}
          showsButtons={false}
          showsPagination={false}
          onIndexChanged={() => this._onSwipe()}
        >
          {holeScreens}

        </Swiper>

        <View style={{ height: '100%', flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
          {(this.state.showSubmitButton) ? (

            <ButtonView
              style={[styles.buttonSubmit, { backgroundColor: (this.state.colorChanged) ? "#9A0000" : Colors.grey, width: 250 }]}
              color={Colors.white}
              onPress={() => {

                //ADD SCORECARD CONDITION
                if (this.state.colorChanged) {
                  this.getData()
                }
              }}
            >
              <Text size="xSmall" color={Colors.white}>
                Submit
              </Text>
            </ButtonView>
          ) : (null)}


          {/* <ButtonView onPress={() => {
            Actions.scorecard({
              act: {
                action: "GetHoleDataForTournament",
                id: this.props.current_match[0].id,
                type: this.props.current_match[0].type,
                season_id: parseInt(this.props.current_match[0].id, 10),
                match_id: this.props.current_match[0].match_id,
                schedule_id: this.props.current_match[0].schedule_id,
                team1_p1: players && players[0] && players[0].id,
                team2_p1: players && players[1] && players[1].id,
                team1_p2: players && players[2] && players[2].id,
                team2_p2: players && players[3] && players[3].id
              }
            });
          }}>
            <RNImage source={Images.icon_scorecard} style={{ width: 100, height: 40, marginLeft: -40, borderRadius: 50 }} />
          </ButtonView> */}
        </View>


      </View >
    );
  }

  _renderHoleInfo(holeInfo) {
    const { hole_number, index, par } = holeInfo;
    return (
      <View
        style={[
          AppStyles.flexRow,
          // AppStyles.marginVerticalBase,
          AppStyles.mBottomBase,
          AppStyles.alignItemsCenter,
          AppStyles.spaceAround,
          { marginTop: 25 }
        ]}
      >
        <View>
          <TouchableOpacity
            onPress={() => this._onClickScroll(-1, hole_number)}
          //onPress={() => this._swiper.scrollBy(-1, true)}
          >
            <RNImage
              style={{ width: 35, height: 35 }}
              source={Images.arrow_left_circle}
            />
          </TouchableOpacity>
        </View>
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

        <View>
          <TouchableOpacity
            onPress={() => this._onClickScroll(1, hole_number)}
          >
            <RNImage
              style={{ width: 35, height: 35 }}
              source={Images.arrow_right_circle}
            />
          </TouchableOpacity>
        </View>

      </View>
    );
  }

  _renderScoreTable(holeInfo, index) {
    const manipulatedData = this.state.scoreCard[index];
    return (
      manipulatedData && (
        <View style={{ height: '100%', }}>
          {Object.keys(manipulatedData).map((key, index) => (
            <View
            // key={`row-${key}`}
            // style={[
            //   (key === "Name" || key === "Net" || key === "Gross") &&
            //   styles.background,
            //   styles.rowStyles
            // ]}
            >
              {/* {this._renderRowLabel(key)} */}
              {key === "Name" ?
                this._renderRowHeader()
                //:this._renderRowValues(manipulatedData, key)
                : key === "Stroke" ? this._renderRowValues(manipulatedData, key) : null
              }

              {/* {this._renderRowValues(manipulatedData, key)} */}

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

  /***
   *-----------------------  condition changed -----------------------
   */
  _onSwipe() {
    if (this._swiper != undefined && this._swiper.state != undefined) {
      console.log("swiper index:" + this._swiper.state.index);
    }
  }

  _renderRowHeader() {

    return (
      <View style={{ ...styles.background, paddingBottom: 5, paddingTop: 5 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={{ width: '40%' }}>Name</Text>
          <Text>Strokes</Text>
        </View>
      </View>
    )
  }
  _withdrowPlayer(userID, userName, withdraw) {
    if (withdraw !== "0") {
      return
    }
    this.setState({ userID: userID })
    this.setState({ userName: userName });
    this.setState({ showLongPressPopUp: true })

  }

  _changeActiveStatus(withdrow) {
    return (withdrow > 0) ? Colors.grey2 : Colors.transparent

  }
  _renderRowValues(data, key) {
    const { current, index, scoreCard } = this.state;
    const { Name } = scoreCard[0];
    return Name.map((nameItem, nameIndex) => {
      const rowItem = data[key][nameIndex];
      return (

        <View style={{}}>
          {/* {key === "FIR" || key === "GIR" */}
          {nameItem.name.length === 0 ? null : (
            <View style={{ backgroundColor: this._changeActiveStatus(nameItem.withdraw) }}>
              <View style={{ flexDirection: "row", justifyContent: "space-around", }}>
                <View style={{ width: '45%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <TouchableOpacity onLongPress={() =>
                    this._withdrowPlayer(nameItem.id, nameItem.name, nameItem.withdraw)
                  }>
                    <Text style={{
                      fontType: Fonts.type.base, fontSize: Fonts.size.large,
                      color: (nameItem.withdraw > 0) ? Colors.grey1 : Colors.black
                    }}> {nameItem.name}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[
                    AppStyles.centerInner,
                    styles.rowItemStyles,
                    nameIndex === index &&
                    key === current &&
                    styles.rowItemActiveStyles,
                    nameIndex === index && styles.activeColRowItemActiveStyles

                  ]}

                  onPress={() => {
                    debugger;
                    if (nameItem.withdraw !== "0") {
                      return
                    }
                    this._isEditable(key) &&
                      this._showKeyBoard(key === "FIR" || key === "GIR", key, nameIndex)
                  }
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
                      <Text textAlign="center" style={{ ...AppStyles.centerInner, fontType: Fonts.type.base, fontSize: Fonts.size.xxLarge }}>
                        {key === "Gross" || key === "Net"
                          ? rowItem === 0
                            ? "E"
                            : Math.sign(rowItem) === 1
                              ? `+${rowItem + 123}`
                              : rowItem
                          : rowItem}
                      </Text>
                    )}
                </TouchableOpacity>
              </View>
              <View style={{ height: 1, backgroundColor: Colors.greyTint }} />
            </View>
          )}


        </View >
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

  _renderKeyboard = () => {
    //if (this.tmpData.length > 0 && this.tmpData.score_lock === 1)
    console.log("keyboard:")
    debugger
    if (this.state.isLoading)
      return;
    if (this.tmpData.length > 0 && this.tmpData.score_lock === 1)
      return
    return (
      <CustomKeyboard
        visible={this.state.showKeyBoard}
        mini={this.state.miniKeyBoard}
        onKeyPress={text => {
          this._keyPress(text);
        }}
      />
    )
  };

  renderItem = ({ item }) => (

    <View key={item.key} style={{ flexDirection: 'row', marginBottom: 15 }}>
      <Text style={{ width: '70%', fontSize: 10, marginRight: -15 }} color={Colors.grey}>{item.name}</Text>
      <Text style={{ width: '15%', fontSize: 10, marginRight: 9 }} color={Colors.grey}>{item.adjusted_score}</Text>
      <Text style={{ width: '15%', fontSize: 10, textAlign: 'center' }} color={Colors.grey}>{item.net_score}</Text>
    </View>

  );


  _renderHeader() {
    return (

      <View>
        <View style={{ flexDirection: 'row', marginLeft: 15, }}>
          <Text style={{ width: '50%', marginRight: 16, fontSize: 14 }} color={Colors.grey}>Player Name</Text>
          <Text style={{ width: '20%', fontSize: 14 }} color={Colors.grey}>Gross</Text>
          <Text style={{ width: '20%', fontSize: 14, marginLeft: 3, }} color={Colors.grey}>Net</Text>
        </View>
        <View style={{ height: 1, width: 300, backgroundColor: Colors.greyTint }} />
      </View>
    );
  }

  getData(data_) {

    const { current_match } = this.props;
    const { schedule_id, match_id } = current_match[0];

    const AuthStr = util.getCurrentUserAccessToken();
    console.log("get data authentication key = >" + AuthStr);
    URL = BASE_URL + `/getGrossScoreNetScore/${match_id}/${schedule_id}`;

    axios.get(URL, { headers: { Authorization: AuthStr } }).then((response) => {

      // this.setState({ dataSource: response.data.data, visible: true });
      this.setState({ showConformPopUp: true });
    })
      .catch(function (error) {
        Alert.alert(error);
      });
    this.setState({ visible: false })
  }
  sendData() {
    const { current_match } = this.props;
    const { schedule_id, match_id } = current_match[0];

    const AuthStr = util.getCurrentUserAccessToken();
    console.log("send Data authentication key = >" + AuthStr);
    URL = BASE_URL + '/SubmitGrossScoreNetScore';

    axios.post(URL, {
      schedule_id: schedule_id,
      match_id: match_id

    },
      { headers: { Authorization: AuthStr } }).then((response) => {
        //debugger;
        console.log(response)
      })
      .catch(function (error) {
        Alert.alert(error);
      });
    this.setState({ visible: false })
  }

  sendUserData() {
    const { current_match } = this.props;
    const { id } = current_match[0];
    const AuthStr = util.getCurrentUserAccessToken();
    console.log("send Data authentication key = >" + AuthStr);
    URL = BASE_URL + '/WithdrawGroupUser';

    axios.post(URL, {
      tournament_id: id,
      user_id: this.state.userID

    },
      { headers: { Authorization: AuthStr } }).then((response) => {
        console.log(response);
        this._hideKeyboard()
        this.setState({ isLoading: true });
        this.getLatestScores();
      })
      .catch(function (error) {
        Alert.alert(error);
      });
    this.setState({ showLongPressPopUp: false })
  }
  render() {
    const {
      enterScoreData: { isFetchingData, holeData }
    } = this.props;


    const { holes, players, hole_starting } = holeData;
    debugger
    const data = [1, 2, 3, 4, 5];
    return (
      <View style={{ ...styles.container }}>
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
              onMomentumScrollBegin={(vale, text) => { }}
              onMomentumScrollEnd={(vale, text) => { }}
              onScroll={(vale, text) => {
                if (vale.nativeEvent.contentOffset.y < -30) {
                  this._hideKeyboard();
                }
              }}
            >

              {this._renderSwiper(players, holes, hole_starting)}


            </ScrollView>
            {/* {this._renderButton()} */}
            {this._renderKeyboard()}
          </React.Fragment>


        ) : (
              <EmptyStateText />
            )}
        {/* Confirmation popup */}
        <Dialog
          showConformPopUp={this.state.showConformPopUp}
          onTouchOutside={() => {
            this.setState({ showConformPopUp: false });
          }}
        >
          {/* DialogContent start */}
          <DialogContent
            style={{ justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width * .7, marginBottom: -55, }}
          >
            {/* Title start */}
            <Text style={{ ...styles.titleHeader, marginBottom: 10, marginTop: 10 }}>
              Congratulations on finishing
              your round!
              </Text>
            {/* Title End */}


            {/* Main Content to send start */}
            <View style={{ width: '100%', marginTop: 20, }}>


              {/* check Box Part */}
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>

                <Text style={{ color: Colors.grey, fontSize: 12, }}>
                  Press the ‘SUBMIT’ button to complete
                  your round once you have checked all your scores </Text>
              </View>
              {/* End CheckBox */}

              {/* bootom button Start */}
              <View style={{ alignItems: 'center' }}>
                <View style={[
                  styles.buttonStyle,

                ]}>

                  <DialogButton
                    text="Confirm" textStyle={{ color: 'white', fontSize: 15 }}
                    onPress={() => this.sendData()}
                  />
                </View>

              </View>
              {/* Bottom Bconfirm button end  */}
            </View>
          </DialogContent>
          {/* DialogContent Bconfirm button end  */}

        </Dialog>
        {/* confirmation popup end  */}
        <Dialog
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
        >
          {/* DialogContent start */}
          <DialogContent
            style={{ justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width * .7, marginBottom: -55, }}
          >
            {/* Title start */}
            <Text style={{ ...styles.titleHeader, marginBottom: 10, marginTop: 10 }}>
              Confirm Score
              </Text>
            {/* Title End */}

            {/* header start */}
            <View style={{ marginLeft: 10, height: '10%', alignItems: 'center', justifyContent: 'center' }}>
              {
                this._renderHeader()
              }
            </View>
            {/* header start */}

            {/* Main Content to send start */}
            <View style={{ width: '100%', marginTop: 20, }}>
              <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
              />

              {/* Main Content to send End */}

              {/* check Box Part */}
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <CheckBox
                  value={this.state.checked}
                  onValueChange={() => this.setState({ checked: !this.state.checked })}
                  style={{ ...styles.checkbox, alignSelf: 'flex-start', }}
                />
                {/* */}
                <View style={{ marginRight: 30 }}>
                  <Text style={{ color: Colors.grey, fontSize: 12, }}>
                    I have confirmed with each player their gross and net score and acknowledge once I submit, this scorecard cannot be amended.
                </Text>
                </View>
              </View>
              {/* End CheckBox */}

              {/* bootom button Start */}
              <View style={{ alignItems: 'center' }}>
                <View style={[
                  styles.buttonStyle,

                ]}>

                  <DialogButton
                    text="Confirm" textStyle={{ color: 'white', fontSize: 15 }}
                    onPress={() => this.sendData()}
                  />
                </View>

              </View>
              {/* Bottom Bconfirm button end  */}
            </View>
          </DialogContent>
          {/* DialogContent Bconfirm button end  */}

        </Dialog>

        {/* Long press dialog for withdrow   */}
        <Dialog
          visible={this.state.showLongPressPopUp}
          onTouchOutside={() => {
            this.setState({ showLongPressPopUp: false });
          }}
        >
          {/* DialogContent start */}
          <DialogContent
            style={{ justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width * .7, marginBottom: -10, }}
          >
            {/* Title start */}
            <Text style={{ ...styles.titleHeader, marginBottom: 10, marginTop: 10 }}>
              {this.state.userName}
            </Text>
            {/* Title End */}


            {/* Main Content to send start */}
            <View style={{ width: '100%', marginTop: 0, }}>

              {/* check Box Part */}
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <CheckBox
                  value={this.state.checked}
                  onValueChange={() => this.setState({ checked: !this.state.checked })}
                  style={{ ...styles.checkbox, alignSelf: 'flex-start', }}
                />
                {/* */}
                <View style={{ marginRight: 30, }}>
                  <Text style={{ color: Colors.grey, fontSize: 15, }}>
                    Are you sure to withdraw this player</Text>
                </View>
              </View>
              {/* End CheckBox */}

              {/* bootom button Start */}
              <View style={{ alignItems: 'center' }}>
                <View style={[
                  styles.buttonStyle,

                ]}>

                  <DialogButton
                    text="Confirm" textStyle={{ color: 'white', fontSize: 15 }}
                    onPress={() => this.sendUserData()}
                  />
                </View>

              </View>
              {/* Bottom Bconfirm button end  */}
            </View>
          </DialogContent>
          {/* DialogContent Bconfirm button end  */}

        </Dialog>

        {
          this.state.isLoading && (
            <View style={{ ...this.styleLoader.loading, width: '100%', height: '100%' }}>
              <ActivityIndicator size='large' color={Colors.green} />
            </View>
          )
        }
      </View >
    );
  }

  styleLoader = StyleSheet.create(
    {
      loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }
    });


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
  setTabbarType,
  updateRefresh
};

//for dialog modal 

/***
   *-----------------------  condition changed -----------------------
   */

function manipulateDataForScoreCard(data) {


  console.log("data status:" + data.score_lock);
  this.tmpData = data;

  const { players } = data;
  console.log("----------||-==players" + players)

  if (!players) return;

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

    for (let j = 0, l = players.length; j < l; j++) {
      for (data in updatedData[i]) {
        updatedData[i][data].push("");
      }
    }
  }

  players.map((player, playerIndex) => {
    updatedData[0].Name[playerIndex] = {
      id: player.íd || player.id,
      initials: player.initials,
      name: player.name,
      handicap: player.handicap,
      withdraw: player.withdraw
    };

    player.scorecard.map((score, inn) => {
      if (score) {
        console.log("score is:" + score);
        updatedData[score.hole_number - 1].Stroke[playerIndex] = score.strokes;
        updatedData[score.hole_number - 1].FIR[playerIndex] = score.fir;
        updatedData[score.hole_number - 1].GIR[playerIndex] = score.gir;
        updatedData[score.hole_number - 1].Putts[playerIndex] = score.putts;
        updatedData[score.hole_number - 1].Net[playerIndex] = score.net_score;
        updatedData[score.hole_number - 1].Gross[playerIndex] = score.score;
      }
    });
  });

  return updatedData;
}

export default connect(
  mapStateToProps,
  actions
)(EnterScore);
