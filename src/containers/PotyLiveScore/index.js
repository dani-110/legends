// @flow
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { View } from "react-native";
import styles from "./styles";
import {
  getPotyScoreNetRequest,
  getPotyScoreGrossRequest
} from "../../actions/LiveMatchesActions";
import { CustomNavbar, TopTabs } from "../../components";
import { NAVBAR_THEME, POLLING_TIME } from "../../constants";
import Tabbar from "../../components/Tabbar";
import PotyScoreTable from "./PotyScoreTable";
import Util from "../../util";
import { setTabbarType, enableEnterScore } from "../../actions/GeneralActions";

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

  _getPotyScoreNetRequest() {
    const { netLastUpdatedOn } = this.state;
    const param = netLastUpdatedOn ? `${netLastUpdatedOn}` : "";
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
      data: { name, venue }
    } = this.props;
    const { activeTabIndex } = this.state;

    return (
      <View style={styles.container}>
        <CustomNavbar
          title={name}
          subtitle={venue}
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        {this._renderTabsHeader()}

        {activeTabIndex === 0 && (
          <PotyScoreTable
            liveScoreData={liveScoreDataNet}
            isFetchingData={isFetchingNet}
          />
        )}
        {activeTabIndex === 1 && (
          <PotyScoreTable
            liveScoreData={liveScoreDataGross}
            isFetchingData={isFetchingGross}
          />
        )}

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
