// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Image as RNImage, FlatList } from "react-native";
import Swipeout from "react-native-swipeout";
import { CustomNavbar, Button } from "../../components";
import styles from "./styles";
import Util from "../../util";
import { NAVBAR_THEME } from "../../constants";
import { Images, AppStyles, Colors } from "../../theme";

class Notification extends Component {
  static propTypes = {
    notificationsData: PropTypes.array.isRequired
  };

  static defaultProps = {};

  _swipeoutBtns = [
    {
      text: "Delete",
      backgroundColor: "#FF4C3E",
      type: "delete",
      component: (
        <View style={[AppStyles.centerInner, { height: "100%" }]}>
          <RNImage source={Images.delete_white} />
        </View>
      )
    }
  ];

  _renderNotifications = notifications => (
    <FlatList
      data={notifications}
      renderItem={this._renderItem}
      keyExtractor={Util.keyExtractor}
      ListEmptyComponent={() => <Text>a</Text>}
    />
  );

  _renderItem = ({ item }) => (
    <Swipeout
      style={AppStyles.mBottom5}
      right={this._swipeoutBtns}
      backgroundColor={item.unread ? Colors.transparentGreen : Colors.white}
    >
      <View
        style={[
          styles.notificationItem,
          AppStyles.flexRow,
          AppStyles.spaceBetween,
          AppStyles.alignItemsCenter,
          item.unread && styles.unreadItem
        ]}
      >
        <Text>{item.description}</Text>
        <RNImage source={Images.arrow_right} />
      </View>
    </Swipeout>
  );

  _renderClearButton = () => (
    <View style={AppStyles.paddingVerticalBase}>
      <Button color={Colors.white} size="medium" background={Colors.darkBlue}>
        Clear all notifications
      </Button>
    </View>
  );

  render() {
    const { notificationsData } = this.props;
    return (
      <View style={styles.container}>
        <CustomNavbar
          hasBack={false}
          title="Notifications"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        <View style={[AppStyles.paddingVerticalBase, AppStyles.flex]}>
          {this._renderNotifications(notificationsData)}
          {/* {notificationsData && this._renderClearButton()} */}

          <View
            style={[
              AppStyles.paddingVerticalBase,
              AppStyles.flexRow,
              AppStyles.centerInner
            ]}
          >
            <Button
              style={styles.clearBtnStyle}
              color={Colors.white}
              size="medium"
              background={Colors.darkBlue}
            >
              Clear all notifications
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ notification }) => ({
  notificationsData: notification.data
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Notification);
