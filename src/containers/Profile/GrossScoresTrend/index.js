// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import {
  StackedAreaChart,
  YAxis,
  Grid,
  LineChart
} from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Text } from "../../../components";
import styles from "./styles";
import { AppStyles, Colors } from "../../../theme";

class GrossScoresTrend extends React.PureComponent {
  static propTypes = {
    activeGraph: PropTypes.string,
    graphData: PropTypes.array.isRequired
  };

  static defaultProps = {
    activeGraph: "grossScoreTrend"
  };

  _renderGraph() {
    const { graphData, activeGraph } = this.props;
    let YAxisData = [];
    let XAxisData = [];
    if (activeGraph === "grossScoreTrend") {
      const uniqByData = _.uniqBy(graphData, "strokes");
      YAxisData = uniqByData.map(element => element.strokes);
      XAxisData = graphData.map(element => element.strokes);
    } else {
      const uniqByData = _.uniqBy(graphData, "current_handicap");
      YAxisData = uniqByData.map(element => element.current_handicap);
      XAxisData = graphData.map(element => element.current_handicap);
    }

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

          <LineChart
            style={[AppStyles.flex, AppStyles.mLeft15, { height: 200 }]}
            data={XAxisData}
            svg={{ stroke: Colors.graphColorThree, strokeWidth: 3 }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <Grid />
          </LineChart>
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

const mapStateToProps = ({ user }, { activeGraph }) => ({
  userData: user.data,
  graphData:
    activeGraph === "grossScoreTrend"
      ? user.profileData.gross_score_trend
      : user.profileData.trending_handicap
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(GrossScoresTrend);
