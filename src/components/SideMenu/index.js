// @flow
import _ from "lodash";
import React from "react";
import { View, Image, Linking, Alert } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { setSelectedTab } from "../../actions/GeneralActions";
import { Text, ButtonView } from "../../components";
import DataHandler from "../../services/DataHandler";
import { userSignOutRequest } from "../../actions/UserActions";
import { Colors, AppStyles, Images } from "../../theme";
import styles from "./styles";
import PotyLeaderboardDB from "../../containers/Dashboard/PotyLeaderboardDB";
import { Poty } from "../../containers";

const DRAWER_ITEMS = [

  {
    text: "POTY",
    onPress: () => {
      pauseInterval();
      Actions.poty()
    },
    activeTab: 1
  },
  {
    text: "LCL",
    onPress: () => {
      pauseInterval();
      Actions.lcl()
    },
    activeTab: 1
  },
  {
    text: "LMP", onPress: () => {
      pauseInterval();
      Actions.lmp()
    }, activeTab: 1
  },
  { text: "DMP", onPress: () => Actions.dmp(), activeTab: 1 },

  {
    text: "Players Directory",
    onPress: () => {
      pauseInterval();
      Actions.playersdirectory()
    }
  },
  {
    text: "Rules",
    onPress: () => {
      Linking.openURL("https://www.google.com");
    }
  },
  {
    text: "News",
    onPress: () => {
      pauseInterval();
      Actions.news()
    },
    activeTab: 1
  },
  {
    text: "Sponsors",
    onPress: () => {
      pauseInterval();
      Actions.sponsors()
    },
    activeTab: 1
  },
  //
  {
    text: "Settings",
    onPress: () => {
      pauseInterval();
      Actions.settings();
    }
  },
  {
    text: "Logout", onPress: () => {
      pauseInterval();
      getLoggedOut()
    }
  }
];

function pauseInterval() {
  PotyLeaderboardDB.pauseInterval();
}
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
        <ButtonView onPress={
          //pauseInterval()
          Actions.profile
          //Alert.alert("hi")
        }>
          <View style={styles.imageWrapper} >
            <Image
              source={{ uri: picture }}
              resizeMode="cover"
              style={styles.userImage}
            />
          </View>
          <Image source={Images.image_edit} style={{ position: "absolute", bottom: 20, right: 0 }} />
        </ButtonView>

        <Text size="large" type="bold" color={Colors.text.secondary}>
          {name}
        </Text>
      </View>


    );
  }

  renderOptionsList() {
    return (
      <View style={[AppStyles.flex, AppStyles.padding10,]}>
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
            <Text type="base" color={Colors.text.secondary}>
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
          Version 1.2
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
