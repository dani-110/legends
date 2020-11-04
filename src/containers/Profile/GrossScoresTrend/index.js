// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View, Dimensions } from "react-native";
// import {
//   StackedAreaChart,
//   YAxis,
//   Grid,
//   LineChart
// } from "react-native-svg-charts";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import * as shape from "d3-shape";
import { Text } from "../../../components";
import styles from "./styles";
import { AppStyles, Colors } from "../../../theme";

class GrossScoresTrend extends React.PureComponent {
  static propTypes = {
    activeGraph: PropTypes.string,
    graphData: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      titleData: ""
    };
  }

  static defaultProps = {
    activeGraph: "grossScoreTrend"
  };
  chartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3

    useShadowColorFromDataset: false // optional
  };
  _renderGraph() {

    const screenWidth = Dimensions.get("window").width;
    const { graphData, activeGraph, user } = this.props;
    let YAxisData = [];
    let XAxisData = [];

    if (user.Graph[activeGraph].length <= 0)
      return

    const uniqByData = _.uniqBy(user.Graph[activeGraph], "year");
    YAxisData = uniqByData.map(element => parseInt(element.year));
    XAxisData = user.Graph[activeGraph].map(element => parseInt(element.value));
    titleData_ = user.Graph[activeGraph][0].titleData;//map(element => (element.titleData[0]));
    this.setState({ titleData: titleData_ })
    const data = {
      labels: YAxisData,
      datasets: [
        {
          data: XAxisData,
          color: (opacity = 1) => Colors.red2, // optional
          strokeWidth: 1 // optional
        }
      ],

    };
    return (
      <View style={{ ...styles.container }}>
        <View style={{ flex: 1, flexDirection: 'row-reverse', height: 20, margin: 10, }}>
          <Text>{this.state.titleData}</Text>
          <View style={{ width: 10, marginRight: 10, height: 10, backgroundColor: Colors.red2, borderRadius: 20, marginTop: 5 }}>

          </View>
        </View>
        <LineChart
          data={data}
          width={screenWidth * .8}
          height={256}
          verticalLabelRotation={30}
          chartConfig={this.chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    );
  }

  render() {

    return (
      <View>
        {/* <View style={{ flex: 1, flexDirection: 'row-reverse', width: '88%', height: 20, margin: 10, }}>
          <Text>{this.state.titleData}</Text>
          <View style={{ width: 10, marginRight: 10, height: 10, backgroundColor: Colors.red2, borderRadius: 20, marginTop: 5 }}>

          </View>

        </View> */}
        {this._renderGraph()}

      </View>
    );
  }
}

const mapStateToProps = ({ user }, { activeGraph }) => ({
  userData: user,
  graphData:
    activeGraph === "grossScoreTrend"
      ? user.profileData.gross_score_trend
      : user.profileData.trending_handicap,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(GrossScoresTrend);
