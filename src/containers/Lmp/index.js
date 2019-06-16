// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";
import Orientation from "react-native-orientation";
import { Text, CustomNavbar, ButtonView } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";
import { Colors, AppStyles } from "../../theme";

const ROUND_NAMES = [
  "Round 1 (32)",
  "Round 2 (16)",
  "Round 3 (8)",
  "S/Final (4)",
  "Final (2)",
  "Winner"
];

const ROUND_TABS = [
  "Round 1",
  "Round 2",
  "Round 3",
  "S/Final",
  "Final",
  "Winner"
];

const ITEM_WIDTH = 187;

class Lmp extends React.Component {
  static propTypes = {
    lmpTournamentData: PropTypes.object.isRequired
  };

  static defaultProps = {};

  state = {
    selectedTabIndex: 0
  };

  onTabChangeMode = false;

  componentWillMount() {
    Orientation.lockToLandscapeRight();
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

  _renderHeader = () => (
    <View style={[AppStyles.flexRow, AppStyles.mBottom20]}>
      {ROUND_NAMES.map((item, index) => (
        <View
          style={[
            styles.headerItemWrapper,
            index === ROUND_NAMES.length - 1 && styles.headerLastItemWrapper
          ]}
          key={`sec-${index}`}
        >
          <Text color={Colors.grey6} textAlign="center" type="bold">
            {item}
          </Text>
        </View>
      ))}
    </View>
  );

  _renderChart = () => {
    const {
      lmpTournamentData: { tournaments }
    } = this.props;
    return (
      <React.Fragment>
        {this._renderHeader()}

        <View style={[styles.tournamentBracket]}>
          {tournaments.map((item, tournamentIndex) =>
            this._renderColumn(item, tournamentIndex)
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
      {pair.length > 1 && (
        <React.Fragment>
          <View style={[styles.pairBorder]} />
          <View style={[styles.pairConnector]} />
        </React.Fragment>
      )}
      {pair.map((item, itemIndex) => this._renderItem(item, itemIndex))}
    </View>
  );

  _renderItem(item, index) {
    return (
      <View key={`item-${index}`} style={[styles.itemWrapper]}>
        <View style={[styles.item, item.won && styles.itemWon]}>
          <Text color={Colors.white} size="xxSmall">
            {item.name}
          </Text>
        </View>
      </View>
    );
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
            onPress={() => this._onTabPress(index)}
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
    return (
      <View style={[styles.container]}>
        <CustomNavbar
          title="LMP Result"
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

          {/* {this._renderTabs(selectedTabIndex)} */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ tournament }) => ({
  lmpTournamentData: tournament.lmp
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Lmp);
