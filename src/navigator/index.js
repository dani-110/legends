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
  Notification,
  Poty,
  Profile
} from "../containers";

function onBackPress() {
  if (Actions.state.index === 0) {
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
    <Scene key="welcome" component={Welcome} hideNavBar />
    <Scene key="login" component={Login} hideNavBar />
    <Scene key="forgotPassword" component={ForgotPassword} hideNavBar />

    <Drawer
      hideNavBar
      key="drawerMenu"
      contentComponent={SideMenu}
      drawerWidth={250}
      drawerPosition="left"
      initial
    >
      <Scene hideNavBar key="dashboard">
        <Tabs
          key="tabbar"
          swipeEnabled={false}
          tabBarComponent={() => <Tabbar />}
          labelStyle={{ fontSize: 12 }}
          tabBarPosition="bottom"
        >
          <Scene key="dashboard_tab" component={Dashboard} hideNavBar />
          <Scene key="live_tab" component={LiveTab} hideNavBar />
          <Scene key="notification_tab" component={Notification} hideNavBar />
        </Tabs>
      </Scene>

      <Scene key="poty" component={Poty} hideNavBar />
      <Scene key="profile" component={Profile} hideNavBar />
    </Drawer>
  </Stack>
);

export default () => (
  <AppNavigator navigator={navigator} backAndroidHandler={onBackPress} />
);

const AppNavigator = connect()(Router);
