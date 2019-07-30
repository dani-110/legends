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
    const { current_match } = this.props;
    const { type } = current_match[0];
    let swipe = false;
    const { current, index, scoreCard, miniKeyBoard } = this.state;
    const tempData = _.cloneDeep(scoreCard);
    const holeIndex = this._swiper.state.index;

    if (miniKeyBoard) {
      tempData[holeIndex][current][index] = text;
    } else {
      if (text != "DEL" && text != "-") {
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
    }
    if (
      current === "FIR" ||
      current === "GIR" ||
      (text !== "DEL" && text !== "-" && text !== 1)
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
        this._onClickScroll(this._swiper.state.index + 1);
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
    const handicap = scoreCard[0].Name[index].handicap || 0;
    const gross =
      holeStroke && _.isInteger(holeStroke)
        ? holeStroke - holePar + previousGross
        : previousGross;
    const net = gross - handicap;

    const Player_Hole_Score = holeStroke;
    const Hole_Par = holePar;
    const Hole_Strokes = index <= handicap ? 1 : 0;
    const Previous_Net_Score =
      (scoreCard[holeIndex - 1] && scoreCard[holeIndex - 1].Net[index]) || 0;

    const Current_Net_Score =
      Player_Hole_Score && _.isInteger(Player_Hole_Score)
        ? Player_Hole_Score - Hole_Par - Hole_Strokes + Previous_Net_Score
        : Previous_Net_Score;

    for (let i = 0; i < 18; i++) {
      tempData[i].Gross[index] = gross;
      tempData[i].Net[index] = Current_Net_Score;
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
      updatedData[0].Name.push({
        id: player.íd || player.id,
        initials: player.initials,
        handicap: player.handicap
      });
      player.scorecard.map((score, index) => {
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

  _postData(current, indexParam, scoreCardd, value) {
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
    const { hole_number, index, par } = holeData.holes[
      this._swiper.state.index
    ];
    const { scoreCard } = this.state;
    const { id, type, match_id, schedule_id } = current_match[0];
    const playerIndex = {
      1: [0, "", 1],
      2: [2, 0, 0],
      3: [1, "", 3],
      4: [2, 1, 2]
    };
    const score_array = {};
    const netscore_array = {};

    for (let i = 0; i < 18; i++) {
      score_array[`hole${i + 1}`] = scoreCard[i].Gross[indexParam];
      netscore_array[`hole${i + 1}`] = scoreCard[i].Net[indexParam];
    }

    // const adj_score = this._calculateAdjScore;

    let payload = {};
    if (type === "poty") {
      payload = {
        adj_score: 0,
        hole_number,
        index,
        key: keyBindings[current] || null,
        net_score: scoreCard[hole_number - 1].Net[indexParam] || null,
        par,
        score: scoreCard[hole_number - 1].Gross[indexParam] || 0,
        tournament_id: parseInt(id, 10) || null,
        user_id: scoreCard[0].Name[indexParam].id || null,
        value: _.isInteger(value) ? parseInt(value, 10) : value,
        netscore_array,
        score_array
      };
    } else {
      payload = {
        match_id,
        schedule_id,
        hole_number,
        index,
        par,
        user_id: scoreCard[0].Name[indexParam].id || null,
        player_id: scoreCard[0].Name[indexParam].id || null,
        tournament_id: parseInt(id, 10) || null,
        key: keyBindings[current] || null,
        value: _.isInteger(value) ? parseInt(value, 10) : value,
        score: scoreCard[hole_number - 1].Gross[indexParam] || 0,
        net_score: scoreCard[hole_number - 1].Net[indexParam] || null,
        netscore_array,
        score_array,
        player: `p${playerIndex[indexParam + 1][0]}${
          playerIndex[indexParam + 1][1]
        }`,
        player1_stroke: !(indexParam % 2) ? value : "",
        player2_stroke: indexParam % 2 ? value : "",
        season_id: parseInt(id, 10) || null,
        opponent_id: scoreCard[0].Name[playerIndex[indexParam + 1][2]].id,
        adj_score: 0
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
        /*  rightBtnImage={Images.scoreCard}
        rightBtnPress={() => {
          Actions.scorecard({
            act: {
              action: "GetHoleDataForTournament",
              id: id,
              type: "poty",
              season_id: parseInt(id, 10),
              match_id: match_id ? match_id : "",
              schedule_id: schedule_id ? schedule_id : ""
            }
          });
        }} */
      />
    );
  }

  _renderSwiper(players, holes) {
    let dataLength = 1;
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

    const playerCount = scoreCard[0].Name.length;
    for (let i = 0, l = scoreCard.length; i < l; i++) {
      if (scoreCard[i][lastEditableKey].length === playerCount) {
        dataLength = dataLength < 17 ? i + 1 : dataLength;
      } else {
        break;
      }
    }

    const holeScreens = [];

    for (let i = 0; i <= 17; i++) {
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
        index={dataLength}
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
              {key === "Gross"
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

    // return data[key].map((rowItem, rowItemIndex) => (
    //   <View key={`scorecard=${rowItemIndex}`}>
    //     <TouchableOpacity
    //       style={[
    //         AppStyles.centerInner,
    //         styles.rowItemStyles,
    //         rowItemIndex === index &&
    //           key === current &&
    //           styles.rowItemActiveStyles
    //       ]}
    //       onPress={() =>
    //         this._isEditable(key) &&
    //         this._showKeyBoard(
    //           key === "FIR" || key === "GIR",
    //           key,
    //           rowItemIndex
    //         )
    //       }
    //     >
    //       {key === "FIR" || key === "GIR" ? (
    //         rowItem === 1 ? (
    //           <RNImage source={Images.check} />
    //         ) : rowItem === 0 ? (
    //           <RNImage source={Images.cross} />
    //         ) : (
    //           <RNImage
    //             style={{ height: 18, width: 38 }}
    //             source={Images.no_image}
    //           />
    //         )
    //       ) : (
    //         <Text textAlign="center" style={AppStyles.centerInner}>
    //           {rowItem}
    //         </Text>
    //       )}
    //     </TouchableOpacity>
    //   </View>
    // ));
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
