// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert, View } from "react-native";
import styles from "./styles";
import { CustomNavbar, TopTabs, CourseSelection } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import Util from "../../util";
import SinglesOne from "./SinglesOne";
import Foursome from "./Foursome";
import SinglesTwo from "./SinglesTwo";
import { setTabbarType, enableEnterScore } from "../../actions/GeneralActions";
import { Images } from "../../theme";
import { Actions } from "react-native-router-flux";

class LclLiveScore extends Component {
  static propTypes = {
    setTabbarType: PropTypes.func.isRequired,
    enableEnterScore: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    current_match: PropTypes.array.isRequired
  };

  static defaultProps = {};

  static onEnter() {
    if (LclLiveScore.instance) {
      LclLiveScore.instance._onEnter();
    }
  }

  static onExit() {
    if (LclLiveScore.instance) {
      LclLiveScore.instance._onExit();
    }
  }

  constructor(props) {
    super(props);
    LclLiveScore.instance = this;
  }

  state = {
    activeTabIndex: 0,
    stateVenue: ""
  };

  componentWillMount() {
    // 
    if (this.props.current_match.length > 0)
      this.props.enableEnterScore(
        this.props.data.id === this.props.current_match[0].id
      );
  }

  _onEnter() {
    this.props.setTabbarType(false);
  }

  _onExit() {
    this.props.setTabbarType(true);
  }

  TABS_DATA = [
    {
      title: "Singles 1",
      onPress: () => Util.setSelectedTabIndex(this, 0)
    },
    {
      title: "Foursome",
      onPress: () => Util.setSelectedTabIndex(this, 1)
    },
    {
      title: "Singles 2",
      onPress: () => Util.setSelectedTabIndex(this, 2)
    }
  ];

  updateTees(txt) {
    this.setState({ stateVenue: txt })
  }
  _renderTabsHeader() {
    return (
      <>
        {/* <CourseSelection data={this.props} setTees={(e) => { this.updateTees(e) }} /> */}
        <TopTabs data={this.TABS_DATA} activeIndex={this.state.activeTabIndex} />
      </>
    );
  }


  render() {
    const { activeTabIndex } = this.state;
    const {
      data: { title, name, venue }
    } = this.props;

    const { id, match_id, schedule_id,type,team1_p1, team1_p2, team2_p1, team2_p2}=this.props.data
    console.log("props--->",this.props);

    teamName1 = this.props.current_match.length <= 0 ? this.props.data.team1_name : this.props.current_match[0].team1_name
    teamName2 = this.props.current_match.length <= 0 ? this.props.data.team2_name : this.props.current_match[0].team2_name
    return (
      <View style={[styles.container]}>
        <CustomNavbar
          title={title || teamName1 + " vs " + teamName2}
          subtitle={this.state.stateVenue || venue}
          rightBtnImage={Images.scoreCardBlackWithBg}
          rightBtnPress={() => {
            Actions.scorecard({
              act: {
                action: "GetHoleDataForTournament",
                id,
                type,
                season_id: parseInt(id, 10),
                match_id,
                schedule_id,
                team1_p1: team1_p1.trim(),
                team2_p1: team2_p1.trim(),
                team1_p2: team1_p2.trim(),
                team2_p2: team2_p2.trim()

              }
            });
          }}
          // rightBtnImage={Images.change_Icon}
          // rightBtnPress={() => { <CourseSelection data={this.props} /> }}
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
          fontType="large"
        />
        {this._renderTabsHeader()}
        {activeTabIndex === 0 && <SinglesOne data={this.props.data} />}
        {activeTabIndex === 1 && <Foursome data={this.props.data} />}
        {activeTabIndex === 2 && <SinglesTwo data={this.props.data} />}
      </View>
    );
  }
}

const mapStateToProps = ({ general }) => ({
  current_match: general.current_match
});

const actions = { setTabbarType, enableEnterScore };

export default connect(
  mapStateToProps,
  actions
)(LclLiveScore);
