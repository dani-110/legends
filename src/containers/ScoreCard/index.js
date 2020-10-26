// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, ScrollView, Alert, Image, TouchableOpacity } from "react-native";
import Orientation from "react-native-orientation";
import PropTypes from "prop-types";
import { CustomNavbar, Text, ScoreValue, Loader } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import {
  getPotyUserScoreCardRequest,
  getHoleDataForTournamentRequest,
  getPotyGroupScoreCardRequest,
  getLclGroupScoreCardRequest,
  getLmpGroupScoreCardRequest,
  getDmpGroupScoreCardRequest,
} from "../../actions/ScoreCardActions";
import styles from "./styles";
import { AppStyles, Colors, Fonts, Images } from "../../theme";
import { toggleTabbar } from "../../actions/GeneralActions";
import util from "../../util";
import { Actions } from "react-native-router-flux";


class ScoreCard extends Component {
  static propTypes = {
    scoreCardData: PropTypes.object,
    toggleTabbar: PropTypes.func.isRequired,
    act: PropTypes.object,
    getPotyGroupScoreCardRequest: PropTypes.func.isRequired,
    getLclGroupScoreCardRequest: PropTypes.func.isRequired,
    getLmpGroupScoreCardRequest: PropTypes.func.isRequired,
    getDmpGroupScoreCardRequest: PropTypes.func.isRequired,
    getPotyUserScoreCardRequest: PropTypes.func.isRequired
  };

  static defaultProps = {
    scoreCardData: {},
    act: {}
  };

  static onEnter() {
    if (ScoreCard.instance) {
      ScoreCard.instance._onEnter();
    }
  }

  static onExit() {
    if (ScoreCard.instance) {
      ScoreCard.instance._onExit();
    }
  }

  constructor(props) {
    super(props);
    ScoreCard.instance = this;
    this.state = {
      loading: false,
      scoreCardData: props.scoreCardData
    };
  }

  componentWillMount() {
    Orientation.lockToLandscapeRight();
  }

  componentDidMount() {
    const { act } = this.props;
    debugger
    if (act) {
      switch (act.action) {
        case "potySingleUSer": {
          util.showLoader(this);
          const subroute = `${act.id}`;
          this.props.getPotyUserScoreCardRequest(subroute, data => {
            if (data) {
              util.hideLoader(this);
              const scoreCardData = util.generateScoreCardData(
                data.data,
                act.userName
              );
              this.setState({ scoreCardData });
            }
          });
          break;
        }
        case "GetHoleDataForTournament": {
          if (act.type === "poty") {
            util.showLoader(this);
            this.props.getPotyGroupScoreCardRequest(data => {
              if (data) {
                util.hideLoader(this);
                const scoreCardData = util.generateScoreCardData(data);
                this.setState({ scoreCardData });
              }
            });
          } else if (act.type === "lcl") {
            util.showLoader(this);

            const subroute = `${act.match_id}/${act.schedule_id}/${act.season_id}/${act.team1_p1}/${act.team2_p1}/${act.team1_p2}/${act.team2_p2}`;
            this.props.getLclGroupScoreCardRequest(subroute, data => {
              if (data) {
                util.hideLoader(this);
                const scoreCardData = util.generateScoreCardData(data);
                this.setState({ scoreCardData });
              }
            });
          }

          else if (act.type === "lmp") {
            util.showLoader(this);

            const subroute = `${act.match_id}/${act.schedule_id}/${act.season_id}`;
            this.props.getLmpGroupScoreCardRequest(subroute, data => {
              if (data) {
                util.hideLoader(this);
                const scoreCardData = util.generateScoreCardData(data);

                this.setState({ scoreCardData });
              }
            });
          }
          else if (act.type === "dmp") {
            util.showLoader(this);

            const subroute = `${act.match_id}/${act.schedule_id}/${act.season_id}/${act.team1_p1}/${act.team2_p1}/${act.team1_p2}/${act.team2_p2}`;
            this.props.getDmpGroupScoreCardRequest(subroute, data => {
              if (data) {
                util.hideLoader(this);
                const scoreCardData = util.generateScoreCardData(data);

                this.setState({ scoreCardData });
              }
            });
          }
          break;
        }

        default:
          break;
      }
    }
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }
  _onEnter() {
    this.props.toggleTabbar(false);
  }

  _onExit() {
    this.props.toggleTabbar(true);
  }


  _sumValues(array, startFrom = null, endTo = null) {

    if (_.isInteger(startFrom) && _.isInteger(endTo)) {
      return _.sum(array.slice(startFrom, endTo));
    }
    return _.sum(array);

  }

  _showSumOfArray(array, startFrom = null, endTo = null) {


    var total = 0;
    var arrayLength = array.length;
    if (endTo !== null) {
      var arrayLength = endTo;
    }

    for (var i = startFrom; i < arrayLength; i++) {
      if (isNaN(array[i])) {
        continue;
      }
      total += Number(array[i]);
    }
    return total;
  }

  _renderHeader({ holeNumber, index, par, players }, startFrom, endTo, type) {
    const mapData = holeNumber.slice(startFrom, endTo);

    return (
      <View>
        <View
          style={[AppStyles.flexRow, styles.headerWrapper1, AppStyles.flex]}
        >
          <Text style={styles.width1}>{` `}</Text>
          {mapData.map((holeItem, holeIndex) => (
            <View key={holeIndex}>
              <View style={{ ...styles.width2, }}>
                <Text style={{ ...styles.scoreText, color: Colors.white }} type="normal" >
                  {holeItem}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.width2}>
            <Text style={{ ...styles.scoreText, color: Colors.white }}>
              {type}
            </Text>
          </View>
          <View style={styles.width3}>
            <Text type="normal" size="small" style={{ color: Colors.white }}>
              Total
            </Text>
          </View>
        </View>
        <View style={[AppStyles.flexRow, AppStyles.flex]}>
          <Text style={{ ...styles.width1, }} size="small" type="normal">
            Index
          </Text>
          {mapData.map((holeItem, holeIndex) => (
            <View key={holeIndex}>
              <View style={{ ...styles.width2, }}>
                <Text type="normal" color={Colors.text.secondary} size="small">
                  {index[holeItem - 1]}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.width2}>
            <Text type="normal" color={Colors.text.secondary} size="small">
              {``}
            </Text>
          </View>
          <View style={styles.width3}>
            <Text type="normal" color={Colors.text.secondary} size="small">
              {""}
            </Text>
          </View>
        </View>
        <View
          style={[
            AppStyles.flexRow,
            AppStyles.flex,
            AppStyles.borderBottomGrey,

          ]}
        >
          <Text style={styles.width1} size="small" type="normal">
            Par
          </Text>
          {mapData.map((holeItem, holeIndex) => (
            <View key={holeIndex}>
              <View style={{ ...styles.width2, }}>
                <Text color={Colors.text.secondary} size="small" type="normal">
                  {par[holeItem - 1]}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.width2}>
            <Text color={Colors.text.secondary} size="small" type="normal">
              {this._showSumOfArray(par, startFrom, endTo)}
            </Text>
          </View>

          <View style={styles.width3}>
            <Text color={Colors.text.secondary} size="small" type="normal">
              {this._showSumOfArray(par, 0)}
            </Text>
          </View>
        </View>
      </View >
    );
  }

  _renderPlayersScore({ holeNumber, index, par, players }, startFrom, endTo) {
    return (
      <View style={[AppStyles.flexRow, styles.scoreRowWrapper]}>
        <View style={{ ...AppStyles.flex }}>
          {players.map((playerItem, playerIndex) => {
            const mapData = playerItem.score.slice(startFrom, endTo);
            const mappedHoleNumber = holeNumber.slice(startFrom, endTo);

            return (
              <View
                style={[AppStyles.flexRow, AppStyles.borderBottomGrey]}
                key={playerIndex}
              >
                <View style={{ ...AppStyles.flex, justifyContent: 'center', alignItems: 'flex-start' }}>
                  <Text
                    style={[styles.playerName, { left: 5 }]}
                    size="small"
                    type="normal"
                  >
                    {playerItem.name}
                  </Text>
                </View>

                <View style={AppStyles.flexRow}>
                  {mapData.map((scoreItem, itemIndex) => {
                    return (
                      <View style={{ ...styles.width2, }} key={itemIndex}>
                        <ScoreValue
                          size="small"
                          type="normal"
                          score={scoreItem}
                          par={par[mappedHoleNumber[itemIndex] - 1]}
                        />
                      </View>
                    );
                  })}
                </View>
                <View style={styles.width2}>
                  <Text color={Colors.text.secondary} size="small" type="normal">
                    {this._showSumOfArray(mapData, 0)}
                  </Text>
                </View>
                <View style={styles.width3}>
                  <Text color={Colors.text.secondary} size="small" type="normal">
                    {this._showSumOfArray(playerItem.score, 0)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View >
    );
  }

  _renderView(data, startFrom, endTo, type) {
    return (
      <View style={{ borderBottomWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, borderColor: Colors.greyTint }}>
        {this._renderHeader(data, startFrom, endTo, type)}
        {this._renderPlayersScore(data, startFrom, endTo)}
      </View>
    );
  }

  render() {
    const { loading, scoreCardData } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', height: 30 }}>
          <TouchableOpacity onPress={() => { Actions.pop() }} style={{
            width: 40,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            left: 10
          }}>
            <Image source={Images.back_icon} />
          </TouchableOpacity>
          <Text style={{ left: 40, }} size={Fonts.size.xLarge} type={Fonts.type.base}>
            {scoreCardData.course_name}
          </Text>
        </View>
        {!_.isEmpty(scoreCardData) && (
          <View style={{ ...styles.innerWrapper, marginHorizontal: 50, right: 5, marginBottom: 10 }}>
            <ScrollView contentContainerStyle={{ width: 'auto' }}>
              {this._renderView(scoreCardData, 0, 9, "Out")}
              <View style={AppStyles.mBottom20} />
              {this._renderView(scoreCardData, 9, 18, "In")}
            </ScrollView>
          </View>
        )}

        <Loader loading={loading} />
      </View>
    );
  }
}

const mapStateToProps = ({ scoreCard }, { scoreCardData }) => ({
  scoreCardData: _.isEmpty(scoreCardData) ? scoreCard.data : scoreCardData
});

const actions = {
  toggleTabbar,
  getPotyUserScoreCardRequest,
  getPotyGroupScoreCardRequest,
  getLclGroupScoreCardRequest,
  getLmpGroupScoreCardRequest,

  getDmpGroupScoreCardRequest,
  getHoleDataForTournamentRequest,
};

export default connect(
  mapStateToProps,
  actions
)(ScoreCard);
