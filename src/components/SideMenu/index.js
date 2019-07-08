// @flow
import React from "react";
import { View, Image, Linking } from "react-native";
import { Actions } from "react-native-router-flux";
import { Text, ButtonView } from "../../components";
import { Images, Colors, AppStyles } from "../../theme";
import styles from "./styles";

const DRAWER_ITEMS = [
  {
    text: "POTY",
    onPress: () => Actions.poty()
  },
  {
    text: "LCL",
    onPress: () => Actions.lcl()
  },
  { text: "LMP", onPress: () => Actions.lmp() },
  { text: "DMP", onPress: () => Actions.dmp() },
  {
    text: "Rules",
    onPress: () => {
      Linking.openURL("https://www.google.com");
    }
  },
  {
    text: "News",
    onPress: () => {
      Actions.news();
    }
  },
  {
    text: "Settings",
    onPress: () => {
      Actions.settings();
    }
  },
  { text: "Logout", onPress: () => getLoggedOut() }
];

function getLoggedOut() {
  Actions.reset("login");
}

export default class SideMenu extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  renderUserDetails() {
    return (
      <View style={styles.userDetailsWrapper}>
        <ButtonView style={styles.imageWrapper} onPress={Actions.profile}>
          <Image
            source={Images.dummy_user}
            resizeMode="cover"
            style={styles.userImage}
          />
        </ButtonView>
        <Text size="large" type="bold" color={Colors.text.secondary}>
          Tariq Allawala
        </Text>
      </View>
    );
  }

  renderOptionsList() {
    return (
      <View style={[AppStyles.flex, AppStyles.padding10]}>
        {DRAWER_ITEMS.map((element, index) => (
          <ButtonView
            style={styles.listItem}
            key={index}
            onPress={() => {
              Actions.drawerClose();
              element.onPress();
            }}
          >
            <Text type="bold" color={Colors.text.secondary}>
              {element.text}
            </Text>
          </ButtonView>
        ))}
      </View>
    );
  }

  renderVersionNumber() {
    return (
      <View style={[AppStyles.mBottom30]}>
        <Text textAlign="center" color={Colors.grey} size="small">
          Version 0.0.1
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderUserDetails()}
        {this.renderOptionsList()}
        {this.renderVersionNumber()}
      </View>
    );
  }
}
