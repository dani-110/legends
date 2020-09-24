// @flow
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View, RefreshControl } from "react-native";
import { getScoreLclFoursomeRequest } from "../../../actions/LiveMatchesActions";
import styles from "./styles";
import { ScoreTable, SimpleLoader, EmptyStateText } from "../../../components";
import ProjectedScore from "../ProjectedScore";
import { POLLING_TIME } from "../../../constants";
import { Actions } from "react-native-router-flux";
import { ScrollView } from "react-native-gesture-handler";



class Foursome extends React.Component {
  static propTypes = {
    selectedIndex: PropTypes.string.isRequired,
    liveScoreData: PropTypes.object.isRequired,
    getScoreLclFoursomeRequest: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    isFetchingData: PropTypes.bool.isRequired,
    isLoadedOnce: PropTypes.bool.isRequired
  };

  static defaultProps = {};

  state = {
    dataLastUpdatedOn: ""
  };

  //////////////////////////////  INTERVALS ///////////////////////////////

  componentDidMount() {
    this.dataPolling = setInterval(() => {
      this._getScoreLclFoursomeRequest();
    }, POLLING_TIME);
  }

  componentWillUnmount() {
    clearInterval(this.dataPolling);
  }


  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this._getScoreLclFoursomeRequest()
  }


  ///////////////////////////////// INTERVALS /////////////////////////////

  componentWillMount() {
    this._getScoreLclFoursomeRequest();
    // this.dataPolling = setInterval(() => {
    //   if (this.props.selectedIndex === 2) this._getScoreLclFoursomeRequest();
    // }, POLLING_TIME);
  }

  componentWillUnmount() {
    clearInterval(this.dataPolling);
  }

  _getScoreLclFoursomeRequest() {
    debugger
    const { match_id, schedule_id, season_id, id } = this.props.data;
    const { dataLastUpdatedOn } = this.state;
    // const param = `${match_id}/${schedule_id}/${season_id || id}${dataLastUpdatedOn ? `/${dataLastUpdatedOn}` : ``
    //   }`;
    const param = `${match_id}/${schedule_id}/${season_id || id}`;

    this.props.getScoreLclFoursomeRequest(param, data => {
      this.setState({
        dataLastUpdatedOn: moment().unix(),
        refreshing: false
      });
    });
  }

  _renderProjectedScore() {
    const { liveScoreData } = this.props;
    return <ProjectedScore liveScoreData={liveScoreData} />;
  }

  _renderScoreTable() {
    const { liveScoreData } = this.props;
    return <ScoreTable liveScoreData={liveScoreData} />;
  }

  render() {
    const { isFetchingData, isLoadedOnce, liveScoreData } = this.props;

    return (

      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
        />
      }>
        <View style={styles.container}>

          {_.isEmpty(liveScoreData) && !isFetchingData && <EmptyStateText />}

          {!isLoadedOnce && <SimpleLoader />}
          {isLoadedOnce &&
            !_.isEmpty(liveScoreData) &&
            this._renderProjectedScore()}
          {isLoadedOnce && !_.isEmpty(liveScoreData) && this._renderScoreTable()}

        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ liveScore, general }) => ({
  liveScoreData: liveScore.lcl.fourSome,
  isFetchingData: liveScore.lcl.isFetchingFourSome,
  isLoadedOnce: liveScore.lcl.isLodedOnceFourSome,
  selectedIndex: general.selectedIndex
});

const actions = { getScoreLclFoursomeRequest };

export default connect(
  mapStateToProps,
  actions
)(Foursome);
