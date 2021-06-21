// @flow
import React, { Component } from "react";
import { Provider } from "react-redux";
import { AppRegistry, View } from "react-native";
import { MessageBar } from "./components";
import configureStore from "./store";
import AppNavigator from "./navigator";
import applyConfigSettings from "./config";
import AppStyles from "./theme/AppStyles";
import DataHandler from "./services/DataHandler";
import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import { LogBox } from 'react-native';

const reducers = require("./reducers").default;

applyConfigSettings();

export default class App extends Component {

  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
      this._loadingCompleted();
      this.setState({ isLoading: false });
    })
  };

  componentWillMount() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
    console.warn('Askaksaksaks');
  }



  _loadingCompleted() {
    DataHandler.setStore(this.state.store);
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    console.disableYellowBox = true
    return (
      <View style={AppStyles.flex}>
        <Provider store={this.state.store}>
          <AppNavigator />
        </Provider>
        <MessageBar />
      </View>
    );
  }


  //PUSH NOTIFICATIONS
  async componentDidMount() {
    this.checkPermission();
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log("token is:" + fcmToken);
      if (fcmToken) {
        // user has a device token
        //await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }
}

AppRegistry.registerComponent("AutoConnect", () => App);
