// @flow
import _ from "lodash";
import React from "react";
import { View, Image, Linking } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { setSelectedTab } from "../../actions/GeneralActions";
import { Text, ButtonView } from "../../components";
import DataHandler from "../../services/DataHandler";
import { userSignOutRequest } from "../../actions/UserActions";
import { Colors, AppStyles } from "../../theme";
import styles from "./styles";

const DRAWER_ITEMS = [
  {
    text: "POTY",
    onPress: () => Actions.poty(),
    activeTab: 1
  },
  {
    text: "LCL",
    onPress: () => Actions.lcl(),
    activeTab: 1
  },
  { text: "LMP", onPress: () => Actions.lmp(), activeTab: 1 },
  { text: "DMP", onPress: () => Actions.dmp(), activeTab: 1 },
  {
    text: "Rules",
    onPress: () => {
      Linking.openURL("https://www.google.com");
    }
  },
  {
    text: "News",
    onPress: () => Actions.news(),
    activeTab: 1
  },
  // {
  //   text: "Settings",
  //   onPress: () => {
  //     Actions.settings();
  //   }
  // },
  { text: "Logout", onPress: () => getLoggedOut() }
];

function getLoggedOut() {
  DataHandler.getStore().dispatch(
    userSignOutRequest(() => {
      Actions.reset("login");
    })
  );
}

class SideMenu extends React.PureComponent {
  static propTypes = {
    userData: PropTypes.object.isRequired,
    setSelectedTab: PropTypes.func.isRequired
  };

  static defaultProps = {};

  renderUserDetails({ name, picture }) {
    return (
      <View style={styles.userDetailsWrapper}>
        <ButtonView style={styles.imageWrapper} onPress={Actions.profile}>
          <Image
            source={{ uri: picture }}
            resizeMode="cover"
            style={styles.userImage}
          />
        </ButtonView>
        <Text size="large" type="bold" color={Colors.text.secondary}>
          {name}
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
              element.activeTab && this.props.setSelectedTab(element.activeTab);
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
          Version 0.6
        </Text>
      </View>
    );
  }

  render() {
    const { userData } = this.props;
    return (
      <View style={styles.container}>
        {!_.isEmpty(userData) && this.renderUserDetails(userData.user_info[0])}
        {this.renderOptionsList()}
        {this.renderVersionNumber()}
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.profileData
});
const actions = { setSelectedTab };

export default connect(
  mapStateToProps,
  actions
)(SideMenu);
