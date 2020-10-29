// @flow
import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import {
  View, FlatList, Picker, Image as RNImage, Linking, Alert, TouchableOpacity
  , Platform, StyleSheet
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
import { AppStyles, Colors, Fonts, Images } from "../../theme";
import AlphabetSectionList from 'react-native-alphabet-sectionlist';

class playersDirectory extends Component {

  static propTypes = {
    setSelectedTab: PropTypes.func.isRequired,
    playersDirectory: PropTypes.object.isRequired,
    getPlayersDirectoryRequest: PropTypes.func.isRequired
  };


  state = { playersDirectoryData: [], selectedValue: "name", visible: false };
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
        flexDirection: 'row', height: 50
      }}>

        <View style={{ flex: 2, ...styles.searchBox, marginLeft: 20 }}>


          <View style={{ ...styles.searchshadow, width: '100%' }}
          >
            <TextInput style={{ height: 100 }}
              onChangeText={text => {
                this._onSearchPress(text);
              }}
              placeholder="Search..."
              style={{ width: 180 }}
            />
            <RNImage
              height={18.75}
              width={18.75}
              style={{
                ...styles.searchIcon, elevation: 24, shadowOffset: {
                  width: 0, height: 12,
                }, shadowOpacity: 1, shadowRadius: 16.00, backgroundColor: 'white',
              }}
              source={Images.search_icon}
            />


          </View>

        </View>
        {/* <View style={{ flex: 1, marginTop: 10, ...styles.dropdownShadow }}>
          <TouchableOpacity
            onPress={() => { this.setState({ visible: !this.state.visible }) }}>
            <Text id style={{ height: 50, position: 'absolute', marginLeft: 10, fontSize: 12, color: Colors.grey, fontFamily: 'CircularStd-Book' }}>
              Sort by:
            </Text>
            {this.state.visible === false ? (
              <Text style={{ marginTop: 15, paddingLeft: 10 }}>
                {this.state.selectedValue === "name" ? "Name" : "Index"}
              </Text>
            ) : null}

          </TouchableOpacity>
          {
            (this.state.visible === true) ?
              (<View style={{ width: 100, backgroundColor: Colors.WHITE, position: 'absolute', left: 60, top: -2 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ visible: false });
                    this.setState({ selectedValue: "name" });
                  }}
                >
                  <Text style={styles.pickerTextStyle}>
                    Name
              </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ visible: false });
                    this.setState({ selectedValue: "index" });
                  }}
                >
                  <Text style={styles.pickerTextStyle}>
                    Index
              </Text>
                </TouchableOpacity>
              </View>
              ) : null
          }
          <View>
            {/*          
            <Picker mode="dropdown"
              style={stylesPicker.pickerStyle}

              selectedValue={this.state.selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ selectedValue: itemValue });
              }}

            >
              <Picker.Item label="Name" value="name" />
              <Picker.Item label="Index" value="index" />
            </Picker> */}

        {/*
 </View>
        </View > * /}
 */}


      </View >

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
      // for (var i of Object.keys(consonant)) {
      //   consonant[i] = consonant[i].filter(e => (e.name.startsWith(alphabet)))
      //   if (!consonant[i][0]) delete consonant[i]
      // }

      for (var i of Object.keys(consonant)) {
        consonant[i] = consonant[i].filter(e => (e.name.toUpperCase().includes(searchText.toUpperCase())))
        if (!consonant[i][0]) delete consonant[i]
      }
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
        {!isFetching && this._renderPlayersList()} 
        
        
        selectedValue={this.state.selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ selectedValue: itemValue });
              }}
        */}
        {/* <TouchableOpacity
          onPress={() => { this.setState({ visible: false }) }}> */}
        {this._renderPlayersList()}
        {/* </TouchableOpacity> */}
      </View>
    );
  }
}

const stylesPicker = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerStyle: {
    height: 50,
    width: "100%",
    color: '#344953',

    justifyContent: 'flex-end',
  }
});
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
let temp = 0;
renderItem = ({ item }, index) => {
  temp += 1;
  const colors = ["yellow", "redDark"];
  return (

    <View>
      <View style={{ flex: 1, flexDirection: 'row', padding: 5, marginLeft: 35, justifyContent: 'space-between', }}>

        {/* //image View */}
        <View style={{ flexDirection: 'row', }}>
          <View style={{ ...styles.absoluteContainer, backgroundColor: Colors[colors[temp % 2]] }}>
            <Text style={{ position: 'absolute', textAlign: 'center', color: Colors.white }}> {item.first_last_letter}</Text>
            <RNImage
              source={{ uri: item.picture }}
              style={{ width: 50, height: 50, borderRadius: 50, }}
              resizeMode='cover'
            />

          </View>
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

              <View style={{ ...styles.square, backgroundColor: Colors.blue }} >
                <Text style={{
                  textAlign: 'center', paddingTop: 3, fontSize: 15, color: Colors.white
                }}>
                  {/* index:9.6 */}
                  {item.blue_course_handicap}
                </Text>
              </View>
              <View style={{ ...styles.square, borderWidth: 1 }} >
                <Text style={{
                  textAlign: 'center', paddingTop: 3, fontSize: 15, color: '#555'
                }}>
                  {/* index:9.6 */}
                  {item.white_course_handicap}
                </Text>
              </View>
              {
                (item.yellow_course_handicap !== "") ? (
                  <View style={{ ...styles.square, backgroundColor: Colors.yellow }} >
                    <Text style={{
                      textAlign: 'center', paddingTop: 3, fontSize: 15, color: Colors.white
                    }}>
                      {/* index:9.6 */}
                      {item.yellow_course_handicap}
                    </Text>
                  </View>
                ) : null
              }

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
            style={{ width: 15, height: 15, marginTop: 30, marginRight: 50 }}
          />
        </TouchableOpacity>
      </View>
    </View >
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
