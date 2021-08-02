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
import Util from "../../util";
import { AppStyles, Colors, Fonts, Images } from "../../theme";
import styles from "./styles";
import DropDownPicker from "react-native-dropdown-picker";

class EditMatch extends Component {

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

  _renderUserProfile() {
  }



  render() {
    return (

      <View style={{ ...styles.container }}>
        <CustomNavbar
          title="Edit Match"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />

        <View style={{ zIndex: 1, width: '90%', marginTop: 20, alignSelf: 'center' }}>
          <View style={{ backgroundColor: '#06623B', opacity: 0.11, width: '100%', height: '100%', borderRadius: 10, position: 'absolute' }} />

          <View style={{ zIndex: 1, flexDirection: 'row', marginBottom: 10, margin: 20, alignItems: 'center' }}>
            <Text style={{ ...styles.innerText, flex: 3 }}>Course</Text>
            <DropDownPicker
              items={[
                { label: 'Yellow', value: 'usa' },
                { label: 'Blue', value: 'usa' },
                { label: 'White', value: 'usa' }
              ]}
              placeholder="Course name here"
              defaultValue={this.state.country}
              containerStyle={{ height: 40, borderColor: 'red' }}
              style={{
                backgroundColor: '#fafafa', width: 170, zIndex: 1,
                borderTopLeftRadius: 10, borderTopRightRadius: 10,
                borderBottomLeftRadius: 10, borderBottomRightRadius: 10
              }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.setState({
                country: item.value
              })}
              labelStyle={{
                ...styles.innerText,
                fontSize: 16
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, marginBottom: 20, alignItems: 'center' }}>
            <Text style={{ ...styles.innerText, flex: 3 }}>Date</Text>
            <DropDownPicker
              items={[
                { label: 'Yellow', value: 'usa' },
                { label: 'Blue', value: 'usa' },
                { label: 'White', value: 'usa' }
              ]}
              placeholder="Select Date"
              defaultValue={this.state.country}
              containerStyle={{ height: 40, borderColor: 'red' }}
              style={{
                backgroundColor: '#fafafa', width: 170, zIndex: 1,
                borderTopLeftRadius: 10, borderTopRightRadius: 10,
                borderBottomLeftRadius: 10, borderBottomRightRadius: 10
              }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.setState({
                country: item.value
              })}
              labelStyle={{
                ...styles.innerText,
                fontSize: 16
              }}
            />
          </View>
        </View>

        {/*  next view */}

        <View style={{
          width: '90%',
          marginTop: 10, borderRadius: 10, alignSelf: 'center'
        }}>
          <View style={{ backgroundColor: '#06623B', opacity: 0.11, width: '100%', height: '100%', borderRadius: 10, position: 'absolute' }} />
          <View style={{ zIndex: 4, flexDirection: 'row', marginBottom: 10, margin: 20, alignItems: 'center' }}>
            <View
              style={{
                width: '58%', backgroundColor: 'white', height: 38,
                borderRadius: 10, marginRight: 10, justifyContent: 'center'
              }}
            >
              <Text style={{
                ...styles.innerText, textAlign: 'center'
              }}>Arsalan</Text>
            </View>
            <DropDownPicker
              items={[
                { label: 'Yellow', value: 'usa' },
                { label: 'Blue', value: 'usa' },
                { label: 'White', value: 'usa' }
              ]}
              placeholder="Course name here"
              defaultValue={this.state.country}
              containerStyle={{ height: 40, borderColor: 'red' }}
              style={{
                backgroundColor: '#fafafa', width: 130, zIndex: 1,
                borderTopLeftRadius: 10, borderTopRightRadius: 10,
                borderBottomLeftRadius: 10, borderBottomRightRadius: 10
              }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.setState({
                country: item.value
              })}
              labelStyle={{
                ...styles.innerText,
                fontSize: 16
              }}
            />
          </View>
          <View style={{ zIndex: 3, flexDirection: 'row', marginTop: 0, marginBottom: 10, margin: 20, alignItems: 'center' }}>
            <View
              style={{
                width: '58%', backgroundColor: 'white', height: 38,
                borderRadius: 10, marginRight: 10, justifyContent: 'center'
              }}
            >
              <Text style={{
                ...styles.innerText, textAlign: 'center'
              }}>Yousuf</Text>
            </View>
            <DropDownPicker
              items={[
                { label: 'Yellow', value: 'usa' },
                { label: 'Blue', value: 'usa' },
                { label: 'White', value: 'usa' }
              ]}
              placeholder="Course name here"
              defaultValue={this.state.country}
              containerStyle={{ height: 40, borderColor: 'red' }}
              style={{
                backgroundColor: '#fafafa', width: 130, zIndex: 1,
                borderTopLeftRadius: 10, borderTopRightRadius: 10,
                borderBottomLeftRadius: 10, borderBottomRightRadius: 10
              }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.setState({
                country: item.value
              })}
              labelStyle={{
                ...styles.innerText,
                fontSize: 16
              }}
            />
          </View>
          <View style={{ zIndex: 2, flexDirection: 'row', marginTop: 0, marginBottom: 10, margin: 20, alignItems: 'center' }}>
            <View
              style={{
                width: '58%', backgroundColor: 'white', height: 38,
                borderRadius: 10, marginRight: 10, justifyContent: 'center'
              }}
            >
              <Text style={{
                ...styles.innerText, textAlign: 'center'
              }}>Hamza</Text>
            </View>
            <DropDownPicker
              items={[
                { label: 'Yellow', value: 'usa' },
                { label: 'Blue', value: 'usa' },
                { label: 'White', value: 'usa' }
              ]}
              placeholder="Course name here"
              defaultValue={this.state.country}
              containerStyle={{ height: 40, borderColor: 'red' }}
              style={{
                backgroundColor: '#fafafa', width: 130, zIndex: 1,
                borderTopLeftRadius: 10, borderTopRightRadius: 10,
                borderBottomLeftRadius: 10, borderBottomRightRadius: 10
              }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.setState({
                country: item.value
              })}
              labelStyle={{
                ...styles.innerText,
                fontSize: 16
              }}
            />
          </View>
          <View style={{ zIndex: 1, flexDirection: 'row', marginTop: 0, marginBottom: 10, margin: 20, alignItems: 'center' }}>
            <View
              style={{
                width: '58%', backgroundColor: 'white', height: 38,
                borderRadius: 10, marginRight: 10, justifyContent: 'center'
              }}
            >
              <Text style={{
                ...styles.innerText, textAlign: 'center'
              }}>Haider</Text>
            </View>
            <DropDownPicker
              items={[
                { label: 'Yellow', value: 'usa' },
                { label: 'Blue', value: 'usa' },
                { label: 'White', value: 'usa' }
              ]}
              placeholder="Course name here"
              defaultValue={this.state.country}
              containerStyle={{ height: 40, borderColor: 'red' }}
              style={{
                backgroundColor: '#fafafa', width: 130, zIndex: 1,
                borderTopLeftRadius: 10, borderTopRightRadius: 10,
                borderBottomLeftRadius: 10, borderBottomRightRadius: 10
              }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.setState({
                country: item.value
              })}
              labelStyle={{
                ...styles.innerText,
                fontSize: 16
              }}
            />
          </View>

        </View>
        {/*  next view */}





        {console.log("i am here ")}
        {this._renderUserProfile()}
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
)(EditMatch);



