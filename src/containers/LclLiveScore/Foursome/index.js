// @flow
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";
import ScoreTable from "../../../components/ScoreTable";
import ProjectedScore from "../ProjectedScore";

class Foursome extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.object.isRequired
  };

  static defaultProps = {};

  _renderProjectedScore() {
    const { liveScoreData } = this.props;
    return <ProjectedScore liveScoreData={liveScoreData} />;
  }

  _renderScoreTable() {
    const { liveScoreData } = this.props;
    return <ScoreTable liveScoreData={liveScoreData} />;
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderProjectedScore()}
        {this._renderScoreTable()}
      </View>
    );
  }
}

const mapStateToProps = ({ liveScore }) => ({
  liveScoreData: liveScore.lclFoursome
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Foursome);
