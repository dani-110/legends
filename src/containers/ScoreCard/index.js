// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import Orientation from "react-native-orientation";
import PropTypes from "prop-types";
import { CustomNavbar, Text, ScoreValue } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";
import { AppStyles, Colors } from "../../theme";
import { toggleTabbar } from "../../actions/GeneralActions";

class ScoreCard extends Component {
  static propTypes = {
    scoreCardData: PropTypes.object.isRequired,
    toggleTabbar: PropTypes.func.isRequired
  };

  static defaultProps = {};

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
  }

  componentWillMount() {
    Orientation.lockToLandscapeRight();
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

  _renderHeader({ holeNumber, index, par, players }, startFrom, endTo, type) {
    const mapData = holeNumber.slice(startFrom, endTo);

    return (
      <View>
        <View
          style={[AppStyles.flexRow, styles.headerWrapper1, AppStyles.flex]}
        >
          <Text style={styles.width1}>{` `}</Text>
          {mapData.map((holeItem, holeIndex) => (
            <View>
              <View style={styles.width2}>
                <Text type="bold" size="xxSmall">
                  {holeItem}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.width3}>
            <Text type="bold" size="xxSmall">
              {type}
            </Text>
          </View>
          <View style={styles.width3}>
            <Text type="bold" size="xxSmall">
              Total
            </Text>
          </View>
        </View>
        <View style={[AppStyles.flexRow, AppStyles.flex]}>
          <Text style={styles.width1} size="xSmall">
            Index
          </Text>
          {mapData.map((holeItem, holeIndex) => (
            <View>
              <View style={styles.width2}>
                <Text color={Colors.text.secondary} size="xxSmall">
                  {index[holeIndex]}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.width3}>
            <Text color={Colors.text.secondary} size="xxSmall">
              {``}
            </Text>
          </View>
          <View style={styles.width3}>
            <Text color={Colors.text.secondary} size="xxSmall">
              {""}
            </Text>
          </View>
        </View>
        <View
          style={[
            AppStyles.flexRow,
            AppStyles.flex,
            AppStyles.borderBottomGrey
          ]}
        >
          <Text style={styles.width1} size="xSmall">
            Par
          </Text>
          {mapData.map((holeItem, holeIndex) => (
            <View>
              <View style={styles.width2}>
                <Text color={Colors.text.secondary} size="xxSmall">
                  {par[holeIndex]}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.width3}>
            <Text color={Colors.text.secondary} size="xxSmall">
              {_.sum(par)}
            </Text>
          </View>

          <View style={styles.width3}>
            <Text color={Colors.text.secondary} size="xxSmall">
              {_.sum(par)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  _renderPlayersScore({ holeNumber, index, par, players }, startFrom, endTo) {
    return (
      <View style={[AppStyles.flexRow, styles.scoreRowWrapper]}>
        <View style={AppStyles.flex}>
          {players.map(playerItem => {
            const mapData = playerItem.score.slice(startFrom, endTo);

            return (
              <View style={[AppStyles.flexRow, AppStyles.borderBottomGrey]}>
                <View style={AppStyles.flex}>
                  <Text style={styles.width1} size="xSmall">
                    {playerItem.name}
                  </Text>
                </View>

                <View style={AppStyles.flexRow}>
                  {mapData.map((scoreItem, itemIndex) => {
                    return (
                      <View style={styles.width2}>
                        <ScoreValue
                          size="xxSmall"
                          score={scoreItem}
                          par={par[itemIndex]}
                        />
                      </View>
                    );
                  })}
                </View>
                <View style={styles.width3}>
                  <Text color={Colors.text.secondary} size="xxSmall">
                    32
                  </Text>
                </View>
                <View style={styles.width3}>
                  <Text color={Colors.text.secondary} size="xxSmall">
                    82
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  _renderView(data, startFrom, endTo, type) {
    return (
      <View>
        {this._renderHeader(data, startFrom, endTo, type)}
        {this._renderPlayersScore(data, startFrom, endTo)}
      </View>
    );
  }

  render() {
    const { scoreCardData } = this.props;
    return (
      <View style={styles.container}>
        <CustomNavbar
          title="Karachi Golf Club - Red & Yellow Screen"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          isLandscape
          titleAlign="left"
        />
        <View style={styles.innerWrapper}>
          <ScrollView contentContainerStyle={{ minWidth: 660 }}>
            {this._renderView(scoreCardData, 0, 9, "Out")}
            <View style={AppStyles.mBottom20} />
            {this._renderView(scoreCardData, 9, 18, "In")}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ scoreCard }) => ({
  scoreCardData: scoreCard.data
});

const actions = { toggleTabbar };

export default connect(
  mapStateToProps,
  actions
)(ScoreCard);
