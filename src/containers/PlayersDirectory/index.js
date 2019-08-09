// @flow
import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { View, FlatList, Image as RNImage } from "react-native";
import PropTypes from "prop-types";
import { setSelectedTab } from "../../actions/GeneralActions";
import { getPlayersDirectoryRequest } from "../../actions/PlayersDirectoryActions";
import {
  CustomNavbar,
  Text,
  EmptyStateText,
  SimpleLoader,
  TopTabs,
  TextInput
} from "../../components";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";
import Util from "../../util";
import { AppStyles, Colors, Images } from "../../theme";

class Lcl extends Component {
  static propTypes = {
    setSelectedTab: PropTypes.func.isRequired,
    playersDirectory: PropTypes.object.isRequired,
    getPlayersDirectoryRequest: PropTypes.func.isRequired
  };

  state = { playersDirectoryData: [] };

  componentWillMount() {
    this.props.setSelectedTab(-1);
    this.props.getPlayersDirectoryRequest(data => {
      this.setState({
        playersDirectoryData: data.data
      });
    });
  }

  _renderSearchBar() {
    return (
      <View style={[AppStyles.basePadding, styles.searchBarContainer]}>
        <TextInput
          onChangeText={text => {
            this._onSearchPress(text);
          }}
          placeholder="Seach..."
          style={styles.searchBar}
        />
        <RNImage
          height={18.75}
          width={18.75}
          style={styles.searchIcon}
          source={Images.search_icon}
        />
      </View>
    );
  }

  _renderPlayersList() {
    const { playersDirectoryData } = this.state;
    return (
      <View style={[AppStyles.flex, styles.overflowHidden]}>
        {this._renderSearchBar()}
        <FlatList
          style={[AppStyles.flex]}
          data={playersDirectoryData}
          renderItem={this._renderRow}
          keyExtractor={Util.keyExtractor}
          ListHeaderComponent={this._renderHeader}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={() => <EmptyStateText />}
        />
      </View>
    );
  }

  _renderHeader() {
    return (
      <View style={[AppStyles.flexRow, styles.headerRow]}>
        <Text
          style={[AppStyles.pRight5, { width: 60 }]}
          textAlign="center"
          color={Colors.text.secondary}
        >
          #
        </Text>
        <Text style={AppStyles.flex} color={Colors.text.secondary}>
          Name
        </Text>
        <Text
          style={{ width: 90 }}
          textAlign="center"
          color={Colors.text.secondary}
        >
          HDCP
        </Text>
      </View>
    );
  }

  _renderRow({ item, index }) {
    return (
      <View style={[AppStyles.flexRow, AppStyles.mTop5, styles.row]}>
        <Text
          style={[AppStyles.pRight5, { width: 60 }]}
          textAlign="center"
          color={Colors.text.secondary}
        >
          {index + 1}
        </Text>
        <Text
          style={[AppStyles.flex, AppStyles.capitalize]}
          color={Colors.text.secondary}
        >
          {item.name}
        </Text>
        <Text
          style={{ width: 90 }}
          textAlign="center"
          color={Colors.text.secondary}
        >
          {item.current_handicap}
        </Text>
      </View>
    );
  }

  _onSearchPress(text) {
    const {
      playersDirectory: { data }
    } = this.props;
    const tempData = _.cloneDeep(data);

    const filteredData = this._filterData(text, tempData);

    this.setState({
      playersDirectoryData: filteredData
    });
  }

  _filterData(searchText, data) {
    const filteredData = [];
    data.forEach(element => {
      if (_.includes(element.name.toUpperCase(), searchText.toUpperCase())) {
        filteredData.push(element);
      }
    });
    return filteredData;
  }

  render() {
    const {
      playersDirectory: { isFetching }
    } = this.props;
    const { playersDirectoryData } = this.state;
    return (
      <View style={styles.container}>
        <CustomNavbar
          title="Players Directory"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />

        {isFetching && playersDirectoryData.length === 0 && <SimpleLoader />}
        {!isFetching && this._renderPlayersList()}
      </View>
    );
  }
}

const mapStateToProps = ({ playersDirectory }) => ({
  playersDirectory
});

const actions = { setSelectedTab, getPlayersDirectoryRequest };

export default connect(
  mapStateToProps,
  actions
)(Lcl);
