// @flow
import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import {
  View, FlatList, Picker, Image as RNImage, Linking, Alert, TouchableOpacity
  , Platform
} from "react-native";
import PropTypes from "prop-types";
import { setSelectedTab } from "../../actions/GeneralActions";
import { getPlayersDirectoryRequest } from "../../actions/PlayersDirectoryActions";
import {
  CustomNavbar,
  Text,
  EmptyStateText,
  SimpleLoader,
  TopTabs,
  TextInput, ButtonView
} from "../../components";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";
import Util from "../../util";
import { AppStyles, Colors, Images } from "../../theme";
import AlphabetSectionList from 'react-native-alphabet-sectionlist';

const dataAlphabet = {
  'A': [{ name: 'A1' }, { name: 'A2' }, { name: 'A3' }],
  'B': [{ name: 'A1' }, { name: 'A2' }, { name: 'A3' }],
  "E": [{ name: 'E1' }, { name: 'E2' }, { name: 'E3' }, { name: 'E4' }],
  'F': [{ name: 'F1' }, { name: 'F2' }, { name: 'F3' }],
  'H': [{ name: 'H1' }, { name: 'H2' }, { name: 'H3' }, { name: 'H5' }],
  'J': [{ name: 'J1' }, { name: 'J2' }, { name: 'J3' }, { name: 'J5' }],
  'K': [{ name: 'K1' }, { name: 'K2' }, { name: 'K3' }, { name: 'K5' }],
  'N': [{ name: 'N1' }, { name: 'N2' }, { name: 'N3' }, { name: 'N5' }],
  'Y': [{ name: 'Y1' }, { name: 'Y2' }, { name: 'Y3' }, { name: 'Y5' }, { name: 'Y6' }],
};

class playersDirectory extends Component {

  static propTypes = {
    setSelectedTab: PropTypes.func.isRequired,
    playersDirectory: PropTypes.object.isRequired,
    getPlayersDirectoryRequest: PropTypes.func.isRequired
  };


  state = { playersDirectoryData: [], selectedValue: "java" };
  playersDirectoryData = [];

  componentWillMount() {
    this.props.setSelectedTab(-1);
    this.props.getPlayersDirectoryRequest(data => {
      this.setState({
        playersDirectoryData: data.data
      });
    });
  }

  _renderSearchBar() {
    const { playersDirectoryData } = this.state;

    return (
      <View style={{
        flexDirection: 'row',
      }}>
        <View style={[AppStyles.basePadding, styles.searchBarContainer], {
          flex: 2,
          marginTop: 10
        }}>
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

        <View style={{ flex: 1 }}>
          <Text style={{ height: 19, fontSize: 15, color: Colors.black2Tinted }}>
            Sort by:
            </Text>
          <Picker mode="dropdown"
            selectedValue={this.state.selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ selectedValue: itemValue });
            }}
          >
            <Picker.Item label="Name" value="name" />
            <Picker.Item label="Index" value="index" />
          </Picker>
        </View>
      </View>

    );
  }

  _renderPlayersList() {
    const { playersDirectoryData } = this.state;

    //SORT DATA BY INDEX AND NAME..
    if (this.state.selectedValue === "index") {
      for (var i of Object.keys(playersDirectoryData)) {
        playersDirectoryData[i] = Object.values(playersDirectoryData[i]).sort((a, b) => a.current_handicap - b.current_handicap)
      }
    }
    else {
      for (var i of Object.keys(playersDirectoryData)) {
        playersDirectoryData[i] = Object.values(playersDirectoryData[i]).sort((a, b) => a.name.localeCompare(b.name))
      }
    }
    return (
      <View style={[AppStyles.flex, styles.overflowHidden]}>
        {this._renderSearchBar()}

        <AlphabetSectionList
          data={playersDirectoryData}
          renderItem={renderItem}
          renderHeader={renderHeader}
          // custom section header
          renderSectionHeader={renderSectionHeader}
          sectionHeaderTextStyle={{ fontSize: 60, color: 'red' }} />

        {/* <FlatList
          style={[AppStyles.flex]}
          data={playersDirectoryData}
          renderItem={this._renderRow}
          keyExtractor={Util.keyExtractor}
          ListHeaderComponent={this._renderHeader}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={() => <EmptyStateText />}
        /> */}
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
    let alphabet = searchText.length > 0 ? searchText[0].toUpperCase() : "";
    let consonant = data;

    if (alphabet.length > 0) {
      for (var i of Object.keys(consonant)) {
        consonant[i] = consonant[i].filter(e => (e.name.startsWith(alphabet)))
        if (!consonant[i][0]) delete consonant[i]
      }

      // for (var i of Object.keys(consonant)) {
      //   consonant[i] = consonant[i].filter(e => (e.name.toUpperCase().includes(searchText.toUpperCase())))
      //   if (!consonant[i][0]) delete consonant[i]
      // }
    }
    return consonant;
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


        {console.log("i am here ")}
        {/* {isFetching && playersDirectoryData.length === 0}
        {!isFetching && this._renderPlayersList()} */}
        {this._renderPlayersList()}
      </View>
    );
  }
}
//&& <SimpleLoader />
const mapStateToProps = ({ playersDirectory }) => ({
  playersDirectory
});

const actions = { setSelectedTab, getPlayersDirectoryRequest };

export default connect(
  mapStateToProps,
  actions
)(playersDirectory);


// blue_tee_handicap: "4"
// current_handicap: "4.200000"
// first_last_letter: "AL"
// name: "ABDULLAH  ADIL"
// number: "0"
// picture: "https://legendstourgolf.com/images/player_images/1552744619_IMG_1360.JPG"
// white_tee_handicap: "4"

//////////////////////////// ALPHABET LIST //////////////////////
renderItem = ({ item }) => {
  return (

    <View>
      <View style={{ flex: 1, flexDirection: 'row', padding: 15, justifyContent: 'space-between', }}>

        {/* //image View */}
        <View style={{ flexDirection: 'row', }}>
          <RNImage
            source={{ uri: item.picture }}
            style={{ width: 80, height: 80, borderRadius: 50 }}
          />
          <View>
            <View style={{
              marginLeft: 10,
              paddingVertical: 10,
              flex: 1,
              flexDirection: 'row'
            }}>

              <Text style={styles.innerText}>{item.name + " - " + item.first_last_letter}</Text>
            </View>
            <View style={{ flexDirection: "row", flex: 1 }}>

              <View style={styles.square} >
                <Text style={{
                  textAlign: 'center', paddingTop: 3, fontSize: 15, color: '#555'
                }}>
                  {/* index:9.6 */}
                index:{parseFloat(item.current_handicap).toFixed(2)}
                </Text>
              </View>

            </View>
          </View>

        </View>
        {/* //Extra Items */}


        <TouchableOpacity onPress={() => {
          if (Platform.OS === 'ios') {
            number = `telprompt:${item.number}`;
          }
          else {
            number = `tel:${item.number}`;
          }
          Linking.openURL(number);
        }}>
          <RNImage
            source={Images.phone_icon}
            style={{ width: 20, height: 20, marginTop: 30, marginRight: 20 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

renderHeader = () => {
  return (
    <View>
      {/* <Text >header1</Text>
      <Text>header2</Text> */}
    </View>
  )
}

renderSectionHeader = ({ section: { title } }) => {
  return (
    <View style={{
      paddingLeft: 10,
      paddingVertical: 5,
    }}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  )
}
