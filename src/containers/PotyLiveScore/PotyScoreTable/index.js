// @flow
import { connect } from "react-redux";
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Text,
  SimpleLoader,
  EmptyStateText,
  ButtonView
} from "../../../components";
import { getPotyUserScoreCardRequest } from "../../../actions/ScoreCardActions";
import styles from "./styles";
import Util from "../../../util";
import { AppStyles, Colors } from "../../../theme";
import { Actions } from "react-native-router-flux";
class PotyScoreTable extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.array.isRequired,
    isFetchingData: PropTypes.bool.isRequired
  };

  static defaultProps = {};

  state = {
    rank: 1
  };

  componentWillMount() {
    //
    // this.props.getPotyScoreNetRequest();
  }
  _getScoreCard(id) {
    let subroute = `${id}`;
    this.props.getPotyUserScoreCardRequest(subroute, data => { });
  }
  _formatPar(value) {
    if (value > 0) return `+${value}`;

    if (value === 0) return "E";

    return value;
  }
  _renderTable() {
    const { liveScoreData } = this.props;
    this.state.rank = 1;

    return (
      <View style={[styles.overflowHidden, AppStyles.mTop10]}>
        <FlatList
          data={liveScoreData}
          renderItem={(item, index) => this._renderRow(item, index)}
          keyExtractor={Util.keyExtractor}
          ListHeaderComponent={this._renderHeader}
          stickyHeaderIndices={[0]}
          ItemSeparatorComponent={() => (
            <View style={[AppStyles.borderBottomGrey]} />
          )}
        />
      </View>
    );
  }

  _renderHeader = () => (
    <View
      style={[
        styles.header,
        AppStyles.flexRow,
        AppStyles.spaceBetween,
        AppStyles.alignItemsCenter
      ]}
    >
      <View width={60}>
        <Text textAlign="center">#</Text>
      </View>
      <View style={[AppStyles.flex2]}>
        <Text>Name</Text>
      </View>
      {
        this.props.type === "gross" ? (<View width={65}>
          <Text textAlign="center">Score</Text>
        </View>) : null
      }

      <View width={45}>
        <Text textAlign="center">To Par</Text>
      </View>
      <View width={70}>
        <Text textAlign="center">Thru</Text>
      </View>
    </View>
  );

  _renderRow({ item, index }) {
    const { liveScoreData } = this.props;

    if (
      index > 0 &&
      (liveScoreData[index - 1].net_score !== item.net_score ||
        liveScoreData[index - 1].par !== item.par)
    ) {
      this.state.rank++;
    }
    const rowID = _.clone(this.state.rank);

    return (
      <ButtonView
        style={[
          styles.row,
          AppStyles.flexRow,
          AppStyles.spaceBetween,
          AppStyles.alignItemsCenter
        ]}
        onPress={() =>
          Actions.scorecard({
            act: { action: "potySingleUSer", id: item.id, userName: item.name }
          })
        }
      >
        <View width={60}>
          <Text textAlign="center">{rowID}</Text>
        </View>
        <View style={[AppStyles.flex2]}>
          <Text>
            {Util.titleCase(item.name.replace(/\s+/g, " ").trim()) || " "}
          </Text>
        </View>
        {
        this.props.type === "gross" ? (<View width={65}>
          <Text textAlign="center">{item.score || " "}</Text>
        </View>) : null
      }
        <View
          width={45}
          style={[styles.score, item.net_score < 0 && styles.negativePar]}
        >
          <Text
            size="xLarge"
            style={[item.net_score < 0 && styles.negativeParText]}
          >
            {this._formatPar(item.net_score) ||
              this._formatPar(item.par) ||
              "E"}
          </Text>
        </View>
        <View width={70}>
          <Text textAlign="center">{item.topar || item.thru || " "}</Text>
        </View>
      </ButtonView>
    );
  }

  render() {
    const { liveScoreData, isFetchingData } = this.props;
    return (
      <View style={styles.container}>
        {isFetchingData && liveScoreData.length === 0 && <SimpleLoader />}
        {liveScoreData.length === 0 && !isFetchingData && <EmptyStateText />}
        {liveScoreData.length > 0 && this._renderTable()}
      </View>
    );
  }
}
const mapStateToProps = () => ({});

const actions = { getPotyUserScoreCardRequest };

export default connect(
  mapStateToProps,
  actions
)(PotyScoreTable);
