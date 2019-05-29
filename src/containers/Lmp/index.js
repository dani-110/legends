// @flow
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";
import Orientation from "react-native-orientation";
import { Text, CustomNavbar } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";
import { Colors, AppStyles } from "../../theme";

const staticHTML = (
  <ScrollView>
    <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
      <View style={[styles.blockContainer]}>
        <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
          <View style={[styles.blockContainer]}>
            <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
              <View style={[styles.blockContainer]}>
                <View style={styles.itemWrapper}>
                  <View
                    style={[styles.horizontalBorder, styles.verticalBorder]}
                  />
                  <View style={styles.item}>
                    <Text color={Colors.white} size="xxSmall">
                      Team 1
                    </Text>
                  </View>
                </View>
                <View style={styles.itemWrapper}>
                  <View style={[styles.horizontalBorder]} />
                  <View style={styles.item}>
                    <Text color={Colors.white} size="xxSmall">
                      Team 2
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.itemWrapper}>
                <View
                  style={[styles.horizontalBorder, styles.verticalBorder]}
                />
                <View style={styles.item}>
                  <Text color={Colors.white} size="xxSmall">
                    Team 1
                  </Text>
                </View>
              </View>
            </View>

            <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
              <View style={[styles.blockContainer]}>
                <View style={styles.itemWrapper}>
                  <View
                    style={[styles.horizontalBorder, styles.verticalBorder]}
                  />
                  <View style={styles.item}>
                    <Text color={Colors.white} size="xxSmall">
                      Team 3
                    </Text>
                  </View>
                </View>
                <View style={styles.itemWrapper}>
                  <View style={[styles.horizontalBorder]} />
                  <View style={styles.item}>
                    <Text color={Colors.white} size="xxSmall">
                      Team 4
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.itemWrapper}>
                <View style={[styles.horizontalBorder]} />
                <View style={styles.item}>
                  <Text color={Colors.white} size="xxSmall">
                    Team 3
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.itemWrapper}>
            <View style={[styles.horizontalBorder, styles.verticalBorder]} />
            <View style={styles.item}>
              <Text color={Colors.white} size="xxSmall">
                Team 1
              </Text>
            </View>
          </View>
        </View>

        <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
          <View style={[styles.blockContainer]}>
            <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
              <View style={[styles.blockContainer]}>
                <View style={styles.itemWrapper}>
                  <View
                    style={[styles.horizontalBorder, styles.verticalBorder]}
                  />
                  <View style={styles.item}>
                    <Text color={Colors.white} size="xxSmall">
                      Team 5
                    </Text>
                  </View>
                </View>
                <View style={styles.itemWrapper}>
                  <View style={[styles.horizontalBorder]} />
                  <View style={styles.item}>
                    <Text color={Colors.white} size="xxSmall">
                      Team 6
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.itemWrapper}>
                <View
                  style={[styles.horizontalBorder, styles.verticalBorder]}
                />
                <View style={styles.item}>
                  <Text color={Colors.white} size="xxSmall">
                    Team 5
                  </Text>
                </View>
              </View>
            </View>

            <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
              <View style={[styles.blockContainer]}>
                <View style={styles.itemWrapper}>
                  <View
                    style={[styles.horizontalBorder, styles.verticalBorder]}
                  />
                  <View style={styles.item}>
                    <Text color={Colors.white} size="xxSmall">
                      Team 7
                    </Text>
                  </View>
                </View>
                <View style={styles.itemWrapper}>
                  <View style={[styles.horizontalBorder]} />
                  <View style={styles.item}>
                    <Text color={Colors.white} size="xxSmall">
                      Team 8
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.itemWrapper}>
                <View style={[styles.horizontalBorder]} />
                <View style={styles.item}>
                  <Text color={Colors.white} size="xxSmall">
                    Team 7
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.itemWrapper}>
            <View style={[styles.horizontalBorder]} />
            <View style={styles.item}>
              <Text color={Colors.white} size="xxSmall">
                Team 5
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.itemWrapper}>
        <View style={[styles.horizontalBorder]} />
        <View style={styles.item}>
          <Text color={Colors.white} size="xxSmall">
            Team 5
          </Text>
        </View>
      </View>
    </View>
  </ScrollView>
);

class Lmp extends React.Component {
  static propTypes = {
    lmpTournamentData: PropTypes.object.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    Orientation.lockToLandscapeRight();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  _renderChart = () => {
    const {
      lmpTournamentData: { tournaments }
    } = this.props;
    return (
      <View style={[styles.tournamentBracket]}>
        {tournaments.map((item, tournamentIndex) =>
          this._renderColumn(item, tournamentIndex)
        )}
      </View>
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

  render() {
    return (
      <View style={[styles.container]}>
        <CustomNavbar
          title="LMP Result"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="left"
          isLandscape
        />
        <View style={[AppStyles.baseMargin, AppStyles.pBottomListBottom]}>
          <ScrollView>{this._renderChart()}</ScrollView>
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
