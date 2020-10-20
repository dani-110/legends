// @flow
import React from "react";
import { connect } from "react-redux";
import {
  Stack,
  Scene,
  Router,
  Actions,
  Drawer,
  Tabs
} from "react-native-router-flux";

import styles from "./styles";
import { Colors } from "../theme";
import { SideMenu, Tabbar } from "../components";
import {
  Login,
  Welcome,
  ForgotPassword,
  Dashboard,
  LiveTab,
  News,
  Sponsors,
  Notification,
  Poty,
  ScoreCard,
  Lcl,
  Profile,
  Settings,
  LclLiveScore,
  DmpLiveScore,
  LmpLiveScore,
  PotyLiveScore,
  EnterScore,
  Lmp,
  Dmp,
  PlayersDirectory
} from "../containers";
import PotyLeaderboardDB from "../containers/Dashboard/PotyLeaderboardDB";
import { Alert } from "react-native";
import Orientation from 'react-native-orientation';

function onBackPress() {
  console.log("state is------>" + Actions.state.index);
  Orientation.lockToPortrait();
  if (Actions.state.index === 0) {
    PotyLeaderboardDB.playInterval();
    return false;
  }
  Actions.pop();
  return true;
}

const navigator = Actions.create(
  <Stack
    key="root"
    titleStyle={styles.title}
    headerStyle={styles.header}
    headerTintColor={Colors.navbar.text}
  >
    <Scene key="welcome" component={Welcome} hideNavBar initial />
    <Scene key="login" component={Login} hideNavBar />
    <Scene key="forgotPassword" component={ForgotPassword} hideNavBar />
    <Scene key="scorecard" component={ScoreCard} hideNavBar />

    <Drawer
      hideNavBar
      key="drawerMenu"
      contentComponent={SideMenu}
      drawerWidth={250}
      drawerPosition="left"
    >
      <Scene hideNavBar key="dashboard">
        <Tabs
          key="tabbar"
          swipeEnabled={false}
          tabBarComponent={() => <Tabbar />}
          labelStyle={{ fontSize: 12 }}
          tabBarPosition="bottom"
        >
          <Stack key="dashboard_tab">
            <Scene key="dashboard_tab_main" component={Dashboard} hideNavBar />
            <Scene key="news" component={News} hideNavBar />
            <Scene key="sponsors" component={Sponsors} hideNavBar />
            <Scene key="poty" component={Poty} hideNavBar />
            <Scene key="lcl" component={Lcl} hideNavBar />
            <Scene key="profile" component={Profile} hideNavBar />
            <Scene
              key="playersdirectory"
              component={PlayersDirectory}
              hideNavBar
            />
            <Scene
              key="dashboard_tab_scorecard"
              component={ScoreCard}
              hideNavBar
            />
            <Scene key="settings" component={Settings} hideNavBar />
          </Stack>
          <Stack key="live_tab">
            <Scene key="live_tab_main" component={LiveTab} hideNavBar />
            <Scene key="potylivescore" component={PotyLiveScore} hideNavBar />
            <Scene key="lcllivescore" component={LclLiveScore} hideNavBar />
            <Scene key="dmplivescore" component={DmpLiveScore} hideNavBar />
            <Scene key="lmplivescore" component={LmpLiveScore} hideNavBar />
            <Scene key="live_tab_scorecard" component={ScoreCard} hideNavBar />
          </Stack>
          <Scene key="notification_tab" component={Notification} hideNavBar />
          <Stack key="enterscore_tab">
            <Scene key="enterscore" component={EnterScore} hideNavBar />
          </Stack>
        </Tabs>
        <Scene key="lmp" component={Lmp} hideNavBar />
        <Scene key="dmp" component={Dmp} hideNavBar />
      </Scene>
    </Drawer>
  </Stack>
);

export default () => (
  <AppNavigator navigator={navigator} backAndroidHandler={onBackPress} />
);

const AppNavigator = connect()(Router);
