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
    graphData: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
  };

  static defaultProps = {
    activeGraph: "grossScoreTrend"
  };

  _renderGraph() {
    debugger
    const { graphData, activeGraph, user } = this.props;
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    let YAxisData = [];
    let XAxisData = [];
    console.log("-------------------" + graphData);
    debugger
    if (activeGraph === "handicap") {
      const uniqByData = _.uniqBy(user.Graph.handicap, "year");
      YAxisData = uniqByData.map(element => parseInt(element.year));
      XAxisData = user.Graph.handicap.map(element => parseInt(element.season_id));
      debugger;
      console.log(YAxisData);
      console.log(XAxisData);
    } else if (activeGraph === "putts") {
      const uniqByData = _.uniqBy(user.Graph.putts, "year");
      YAxisData = uniqByData.map(element => parseInt(element.year));
      XAxisData = user.Graph.putts.map(element => parseInt(element.season_id));
      console.log(YAxisData);
      console.log(XAxisData);
    }
    else if (activeGraph === "fir") {
      const uniqByData = _.uniqBy(user.Graph.fir, "year");
      YAxisData = uniqByData.map(element => parseInt(element.year));
      XAxisData = user.Graph.fir.map(element => parseInt(element.season_id));
      console.log(YAxisData);
      console.log(XAxisData);
    }
    else if (activeGraph === "gir") {
      const uniqByData = _.uniqBy(user.Graph.gir, "year");
      YAxisData = uniqByData.map(element => parseInt(element.year));
      XAxisData = user.Graph.gir.map(element => parseInt(element.season_id));
      console.log(YAxisData);
      console.log(XAxisData);
    }

    const contentInset = { top: 20, bottom: 20 };
    //debugger;
    return (
      <View>

        {/* <LineChart
          style={{ height: 200 }}
          data={XAxisData}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid />
        </LineChart> */}

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
            svg={{ stroke: Colors.red, strokeWidth: 3 }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <Grid />
          </LineChart>
        </View>
        <Text textAlign="center" size="large" color={Colors.grey3}>
          Seasons
        </Text>
      </View>
    );
  }

  render() {
    debugger
    return (
      <View style={[styles.container, AppStyles.baseMargin]}>
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
