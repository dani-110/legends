// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";
import Orientation from "react-native-orientation";
import { setSelectedTab } from "../../actions/GeneralActions";
import {
  Text,
  CustomNavbar,
  ButtonView,
  SimpleLoader,
  EmptyStateText
} from "../../components";
import { getDmpResultsRequest } from "../../actions/TournamentActions";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";
import { Colors, AppStyles } from "../../theme";

const ROUND_NAMES = {
  round1: "Round 1",
  round2: "Round 2",
  round3: "Round 3",
  quater_final: "Quarter Final",
  semi_final: "S/Final",
  final: "Final",
  winner: "Winner"
};

const ROUND_TABS = [
  "Round 1",
  "Round 2",
  "Round 3",
  "Quarter Final",
  "S/Final",
  "Final",
  "Winner"
];

const ITEM_WIDTH = 187;

class Dmp extends React.Component {
  static propTypes = {
    dmpTournamentData: PropTypes.object.isRequired,
    isFetchingData: PropTypes.bool.isRequired,
    getDmpResultsRequest: PropTypes.func.isRequired,
    setSelectedTab: PropTypes.func.isRequired
  };

  static defaultProps = {};

  state = {
    selectedTabIndex: 0
  };

  onTabChangeMode = false;

  componentWillMount() {
    Orientation.lockToLandscapeRight();
    this.props.getDmpResultsRequest();
    this.props.setSelectedTab(-1);
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  _onTabPress = index => {
    this.onTabChangeMode = true;
    const { selectedTabIndex } = this.state;
    const isLastTab = index === ROUND_TABS.length - 1;

    const isFirstTab = index === 0;
    if (selectedTabIndex !== index) {
      this.setState({
        selectedTabIndex: index
      });

      if (isLastTab) {
        this.horizontalScroll.scrollToEnd({ animated: true });
      } else if (isFirstTab) {
        this.horizontalScroll.scrollTo({ x: 0, animated: true });
      } else {
        this.horizontalScroll.scrollTo({
          x: index * ITEM_WIDTH,
          animated: true
        });
      }
    }

    setTimeout(() => {
      this.onTabChangeMode = false;
    }, 1000);
  };
  _onHorizontalScoll = event => {
    if (!this.onTabChangeMode) {
      const { selectedTabIndex } = this.state;
      const scrollValue = event.nativeEvent.contentOffset.x;
      const isFirstTab = scrollValue <= 0;
      let index = _.clone(selectedTabIndex);

      if (isFirstTab) {
        index = 0;
      } else {
        index = parseInt((scrollValue + 50) / ITEM_WIDTH);
      }

      if (selectedTabIndex !== index) {
        this.setState({
          selectedTabIndex: index
        });
      }
    }
  };

  _renderHeader = () => {
    const { dmpTournamentData } = this.props;
    const rounds = Object.keys(dmpTournamentData);
    return (
      <View style={[AppStyles.flexRow, AppStyles.mBottom20]}>
        {rounds.map((item, index) => (
          <View
            style={[
              styles.headerItemWrapper,
              index === rounds.length - 1 && styles.headerLastItemWrapper
            ]}
            key={`sec-${index}`}
          >
            <Text color={Colors.grey6} textAlign="center" type="bold">
              {`${ROUND_NAMES[item]} ${
                dmpTournamentData[item].length > 1
                  ? `(${dmpTournamentData[item].length})`
                  : ""
              }`}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  _renderChart = () => {
    const { dmpTournamentData } = this.props;
    const rounds = Object.keys(dmpTournamentData);

    return (
      <React.Fragment>
        {this._renderHeader()}

        <View style={[styles.tournamentBracket]}>
          {rounds.map((item, tournamentIndex) =>
            this._renderColumn(dmpTournamentData[item], tournamentIndex)
          )}
        </View>
      </React.Fragment>
    );
  };

  _renderColumn = (col, index) => (
    <View key={`col-${index}`} style={styles.column}>
      {col.map((item, colIndex) => this._renderPair(item, colIndex))}
    </View>
  );

  _renderPair = (pair, index) => (
    <View key={`pair-${index}`} style={[styles.pair]}>
      {pair.team1_name && pair.team2_name && (
        <React.Fragment>
          <View style={[styles.pairBorder]} />
          <View style={[styles.pairConnector]} />
        </React.Fragment>
      )}
      {this._renderItem(pair.team1_name, pair.winning_team == 1)}
      {this._renderItem(pair.team2_name, pair.winning_team == 2)}
    </View>
  );

  _renderItem(item, won) {
    if (item) {
      return (
        <View key={`item-${item}`} style={[styles.itemWrapper]}>
          <View style={[styles.item, won && styles.itemWon]}>
            <Text color={Colors.white} size="xxSmall">
              {item || ""}
            </Text>
          </View>
        </View>
      );
    }
  }

  _renderTabs(selectedTabIndex) {
    return (
      <View
        style={[
          AppStyles.flexRow,
          AppStyles.centerInner,
          styles.tabsItemsWrapper
        ]}
      >
        {ROUND_TABS.map((item, index) => (
          <ButtonView
            style={[
              styles.tabsItemWrapper,
              index === selectedTabIndex && styles.tabsSelectedItemWrapper
            ]}
            key={`tab-${index}`}
          >
            <Text
              color={index === selectedTabIndex ? Colors.white : Colors.black}
              textAlign="center"
              type="bold"
            >
              {item}
            </Text>
          </ButtonView>
        ))}
      </View>
    );
  }

  render() {
    const { selectedTabIndex } = this.state;
    const { dmpTournamentData, isFetchingData } = this.props;

    return (
      <View style={[styles.container]}>
        <CustomNavbar
          title="DMP Result"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="left"
          isLandscape
        />
        <View
          style={[
            AppStyles.baseMargin,
            AppStyles.pBottomListBottom,
            styles.innerWrapper
          ]}
        >
          {isFetchingData && _.isEmpty(dmpTournamentData) && <SimpleLoader />}
          {_.isEmpty(dmpTournamentData) && !isFetchingData && (
            <EmptyStateText />
          )}
          {!_.isEmpty(dmpTournamentData) && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              ref={ref => {
                this.horizontalScroll = ref;
              }}
              onScroll={this._onHorizontalScoll}
              scrollEventThrottle={5}
            >
              <ScrollView>{this._renderChart()}</ScrollView>
            </ScrollView>
          )}

          {/* {this._renderTabs(selectedTabIndex)} */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ tournament }) => ({
  dmpTournamentData: tournament.dmp.tournaments,
  isFetchingData: tournament.dmp.isFetchingLeaderboard
});

const actions = { getDmpResultsRequest, setSelectedTab };

export default connect(
  mapStateToProps,
  actions
)(Dmp);
