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

class HCPCalculator extends Component {

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
    const {
      playersDirectory: { isFetching }
    } = this.props;
    const { playersDirectoryData } = this.state;
    return (

      <View style={{ ...styles.container }}>
        <CustomNavbar
          title="HCP Calculator"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />

        <View style={{ width: '90%', marginTop: 20, alignSelf: 'center' }}>
          <View style={{ backgroundColor: '#06623B', opacity: 0.11, width: '100%', height: '100%', borderRadius: 10, position: 'absolute' }} />

          <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center' }}>
            <Text style={{ ...styles.innerText, flex: 3 }}>Index</Text>
            <TextInput style={{
              ...styles.innerText, padding: 10, width: 100, value: "hi",
              keyboardType: "numeric", backgroundColor: 'white', borderRadius: 10
            }} />
          </View>
          <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center' }}>
            <Text style={{ ...styles.innerText, flex: 3 }}>Slope Rate</Text>
            <TextInput style={{
              ...styles.innerText, padding: 10, width: 100, value: "hi",
              keyboardType: "numeric", backgroundColor: 'white', borderRadius: 10
            }} />
          </View>

          <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center' }}>
            <Text style={{ ...styles.innerText, flex: 3 }}>Course Rate</Text>
            <TextInput style={{
              ...styles.innerText, padding: 10, width: 100, value: "hi",
              keyboardType: "numeric", backgroundColor: 'white', borderRadius: 10
            }} />
          </View>


        </View>

        <View style={{ padding: 10, backgroundColor: '#707070', borderRadius: 10, flexDirection: 'row', margin: 20, alignItems: 'center' }}>
          <Text style={{ ...styles.innerText, flex: 7, color: 'white' }}>Playing HCP</Text>
          <Text style={{ ...styles.innerText, flex: 3, color: 'white', textAlign: 'center' }}>12</Text>
        </View>
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
)(HCPCalculator);



