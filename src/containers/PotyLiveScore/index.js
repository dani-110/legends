// @flow
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { View, ScrollView, RefreshControl, Text, Alert } from "react-native";
import styles from "./styles";
import {
  getPotyScoreNetRequest,
  getPotyScoreGrossRequest
} from "../../actions/LiveMatchesActions";
import { CustomNavbar, TopTabs } from "../../components";
import { Actions } from "react-native-router-flux";
import { NAVBAR_THEME, POLLING_TIME } from "../../constants";
import Tabbar from "../../components/Tabbar";
import PotyScoreTable from "./PotyScoreTable";
import Util from "../../util";
import { setTabbarType, enableEnterScore } from "../../actions/GeneralActions";
import { AppStyles, Colors, Fonts, Images } from "../../theme";

class PotyLiveScore extends React.Component {
  static propTypes = {
    setTabbarType: PropTypes.func.isRequired,
    enableEnterScore: PropTypes.func.isRequired,
    liveScoreDataNet: PropTypes.array.isRequired,
    liveScoreDataGross: PropTypes.array.isRequired,
    isFetchingNet: PropTypes.bool.isRequired,
    isFetchingGross: PropTypes.bool.isRequired,
    getPotyScoreNetRequest: PropTypes.func.isRequired,
    getPotyScoreGrossRequest: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    current_match: PropTypes.array.isRequired
  };

  static defaultProps = {};

  //////////////////////////////  INTERVALS ///////////////////////////////

  componentDidMount() {
    this.dataPolling = setInterval(() => {
      if (this.state.activeTabIndex === 0)
        this._getPotyScoreNetRequest();
      else
        this.props.getPotyScoreGrossRequest();
    }, POLLING_TIME);
  }

  componentWillUnmount() {
    clearInterval(this.dataPolling);
  }

  _onRefresh() {
    this.setState({ refreshing: false });
    if (this.state.activeTabIndex === 0)
      this._getPotyScoreNetRequest();
    else
      this.props.getPotyScoreGrossRequest();
  }


  ///////////////////////////////// INTERVALS /////////////////////////////

  static onEnter() {
    if (PotyLiveScore.instance) {
      PotyLiveScore.instance._onEnter();
    }
  }

  static onExit() {
    if (PotyLiveScore.instance) {
      PotyLiveScore.instance._onExit();
    }
  }

  constructor(props) {
    super(props);
    PotyLiveScore.instance = this;
  }

  state = {
    activeTabIndex: 0
  };

  componentWillMount() {
    this._getPotyScoreNetRequest();

    if (this.props.current_match.length) {
      this.props.enableEnterScore(
        this.props.data.id === this.props.current_match[0].id
      );
    }
  }

  componentWillUnmount() {
    // clearInterval(this.dataPollingNet);
    // clearInterval(this.dataPollingGross);
  }

  _renderTabsHeader() {
    return (
      <TopTabs data={this.TABS_DATA} activeIndex={this.state.activeTabIndex} />
    );
  }

  TABS_DATA = [
    {
      title: "Net",
      onPress: () => {
        this._getPotyScoreNetRequest();
        Util.setSelectedTabIndex(this, 0);
      }
    },
    {
      title: "Gross",
      onPress: () => {
        this.props.getPotyScoreGrossRequest();
        Util.setSelectedTabIndex(this, 1);
      }
    }
  ];
  _renderChildHeader(type_) {
    let typeofData = (type_ === 0) ? "net" : "gross"
    return (
      <View
        style={[
          styles.header,
          AppStyles.flexRow,
          AppStyles.spaceBetween,
          AppStyles.alignItemsCenter,
        ]}
      >
        <View width={60} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text textAlign="center" style={{ color: Colors.black }}>#</Text>
        </View>
        <View style={[AppStyles.flex2]}>
          <Text style={{ color: Colors.black }}>Name</Text>
        </View>
        {
          typeofData === "gross" ? (<View width={65}>
            <Text textAlign="center" style={{ color: Colors.black }} >Score</Text>
          </View>) : null
        }

        <View width={45}>
          <Text textAlign="center" style={styles.headerText}>To Par</Text>
        </View>
        <View width={70} style={{ paddingLeft: 20 }}>
          <Text textAlign="center" style={{ color: Colors.black }} >Thru</Text>
        </View>
      </View>
    );

  }
  _getPotyScoreNetRequest() {
    const { netLastUpdatedOn } = this.state;
    const param = "";//netLastUpdatedOn ? `${netLastUpdatedOn}` : "";
    this.props.getPotyScoreNetRequest(param, data => {
      this.setState({
        netLastUpdatedOn: moment().unix()
      });
    });
  }

  _onEnter() {
    this.dataPollingNet = setInterval(() => {
      this._getPotyScoreNetRequest();
    }, POLLING_TIME);
    this.dataPollingGross = setInterval(() => {
      this.props.getPotyScoreGrossRequest();
    }, POLLING_TIME);
    this.props.setTabbarType(false);
  }

  _onExit() {
    this.props.setTabbarType(true);
    clearInterval(this.dataPollingNet);
    clearInterval(this.dataPollingGross);
  }

  render() {
    const {
      liveScoreDataNet,
      liveScoreDataGross,
      isFetchingNet,
      isFetchingGross,
      data: { name, venue, id, type, match_id, schedule_id }
    } = this.props;
    debugger
    const { activeTabIndex } = this.state;

    return (
      <View style={styles.container}>
        <CustomNavbar
          title={name}
          subtitle={venue}
          hasBorder={false}
          //rightBtnImage={Images.scoreCardBlackWithBg}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
          rightBtnPress={() => {
            Actions.scorecard({
              act: {
                action: "GetHoleDataForTournament",
                id,
                type,
                season_id: parseInt(id, 10),
                match_id,
                schedule_id,
                team1_p1: players && players[0] && players[0].id,
                team2_p1: players && players[1] && players[1].id,
                team1_p2: players && players[2] && players[2].id,
                team2_p2: players && players[3] && players[3].id
              }
            });
          }}
        />
        {this._renderTabsHeader()}
        {this._renderChildHeader(activeTabIndex)}
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          {activeTabIndex === 0 && (
            <PotyScoreTable
              liveScoreData={liveScoreDataNet}
              isFetchingData={isFetchingNet}
              type={"net"}
            />
          )}
          {activeTabIndex === 1 && (
            <PotyScoreTable
              liveScoreData={liveScoreDataGross}
              isFetchingData={isFetchingGross}
              type={"gross"}
            />
          )}
        </ScrollView>

        {/* <Tabbar defaultTabbar={false} /> */}
      </View>
    );
  }
}

const mapStateToProps = ({ liveScore, general }) => ({
  liveScoreDataNet: liveScore.poty.net,
  liveScoreDataGross: liveScore.poty.gross,
  isFetchingNet: liveScore.poty.isFetchingNet,
  isFetchingGross: liveScore.poty.isFetchingGross,
  current_match: general.current_match
});

const actions = {
  setTabbarType,
  enableEnterScore,
  getPotyScoreNetRequest,
  getPotyScoreGrossRequest
};

export default connect(
  mapStateToProps,
  actions
)(PotyLiveScore);
