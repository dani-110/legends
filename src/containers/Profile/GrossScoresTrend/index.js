// @flow
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { StackedAreaChart, YAxis, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Text } from "../../../components";
import styles from "./styles";
import { AppStyles, Colors } from "../../../theme";

class GrossScoresTrend extends React.Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
    activeGraph: PropTypes.string
  };

  static defaultProps = {
    activeGraph: "grossScoreTrend"
  };

  _renderGraph() {
    const { userData, activeGraph } = this.props;

    const data = userData[activeGraph];

    const YAxisData = [1, 2, 3, 4, 5, 6, 7, 8];
    const colors = [
      Colors.graphColorOne,
      Colors.graphColorTwo,
      Colors.graphColorThree,
      Colors.graphColorFour
    ];
    const keys = ["data1", "data2", "data3", "data4"];
    const svgs = [
      { onPress: () => console.log("data1") },
      { onPress: () => console.log("data2") },
      { onPress: () => console.log("data3") },
      { onPress: () => console.log("data4") }
    ];
    const contentInset = { top: 20, bottom: 20 };
    return (
      <View>
        <View style={AppStyles.flexRow}>
          <YAxis
            data={YAxisData}
            contentInset={contentInset}
            svg={{
              fill: Colors.grey,
              fontSize: 10
            }}
            numberOfTicks={8}
            formatLabel={value => `${value}`}
          />
          <StackedAreaChart
            style={[AppStyles.flex, AppStyles.mLeft15, AppStyles.height200]}
            data={data}
            keys={keys}
            colors={colors}
            curve={shape.curveLinear}
            svgs={svgs}
          >
            <Grid />
          </StackedAreaChart>
        </View>
        <Text textAlign="center" size="xxLarge" color={Colors.grey3}>
          Tournament(s)
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.container, AppStyles.baseMargin]}>
        {this._renderGraph()}
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.data
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(GrossScoresTrend);
