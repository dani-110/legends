// @flow
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Text, SimpleLoader, EmptyStateText } from "../../../components";
import styles from "./styles";
import Util from "../../../util";
import { AppStyles, Colors } from "../../../theme";

export default class PotyScoreTable extends React.Component {
  static propTypes = {
    liveScoreData: PropTypes.array.isRequired,
    isFetchingData: PropTypes.bool.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    //
    // this.props.getPotyScoreNetRequest();
  }

  _renderTable() {
    const { liveScoreData } = this.props;

    return (
      <View style={[styles.overflowHidden, AppStyles.mTop10]}>
        <FlatList
          data={liveScoreData}
          renderItem={this._renderRow}
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
      <View width={65}>
        <Text textAlign="center">Score</Text>
      </View>
      <View width={45}>
        <Text textAlign="center">To Par</Text>
      </View>
      <View width={70}>
        <Text textAlign="center">Thru</Text>
      </View>
    </View>
  );

  _renderRow({ item, index }) {
    return (
      <View
        style={[
          styles.row,
          AppStyles.flexRow,
          AppStyles.spaceBetween,
          AppStyles.alignItemsCenter
        ]}
      >
        <View width={60}>
          <Text textAlign="center">{index}</Text>
        </View>
        <View style={[AppStyles.flex2]}>
          <Text>{item.name || " "}</Text>
        </View>
        <View width={65}>
          <Text textAlign="center">{item.score || " "}</Text>
        </View>
        <View
          width={45}
          style={[styles.score, item.topar < 0 && styles.negativePar]}
        >
          <Text
            size="xLarge"
            style={[item.topar < 0 && styles.negativeParText]}
          >
            {item.topar || item.par || " "}
          </Text>
        </View>
        <View width={70}>
          <Text textAlign="center">{item.net_score || item.thru || " "}</Text>
        </View>
      </View>
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

// const mapStateToProps = ({ liveScore }) => ({
//   liveScoreData: liveScore.poty.net,
//   isFetchingData: liveScore.poty.isFetchingNet
// });

// const actions = { getPotyScoreNetRequest };

// export default connect(
//   mapStateToProps,
//   actions
// )(PotyScoreTable);
