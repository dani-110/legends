// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Image as RNImage, FlatList } from "react-native";
import Swipeout from "react-native-swipeout";
import { CustomNavbar, Button, SimpleLoader } from "../../components";
import styles from "./styles";
import Util from "../../util";
import { NAVBAR_THEME } from "../../constants";
import { Images, AppStyles, Colors } from "../../theme";
import { getNotificationsRequest } from "../../actions/NotificationsActions";

class Notification extends Component {
  static propTypes = {
    notificationsData: PropTypes.array.isRequired,
    notificationsFetching: PropTypes.bool.isRequired,
    getNotificationsRequest: PropTypes.func.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    this.props.getNotificationsRequest();
  }

  _swipeoutBtns = [
    {
      text: "Delete",
      backgroundColor: Colors.red,
      type: "delete",
      component: (
        <View style={[AppStyles.centerInner, AppStyles.flex]}>
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
      ListEmptyComponent={() => this._renderEmptyScreen()}
      contentContainerStyle={{ flexGrow: 1 }}
      onRefresh={this.props.getNotificationsRequest}
      refreshing={this.props.notificationsFetching}
    />
  );

  _renderEmptyScreen = () => (
    <View style={[AppStyles.flex, AppStyles.centerInner]}>
      <RNImage source={Images.notification_bell} />
      <Text style={styles.noNotificationText}> No new notifications </Text>
    </View>
  );

  _renderItem = ({ item }) => (
    <Swipeout
      style={AppStyles.mBottom5}
      right={this._swipeoutBtns}
      backgroundColor={
        Colors.white
        // !item.read_at ? Colors.greenTintZeroPointFive : Colors.white
      }
    >
      <View
        style={[
          styles.notificationItem,
          AppStyles.flexRow,
          AppStyles.spaceBetween,
          AppStyles.alignItemsCenter
          // !item.read_at && styles.unreadItem
        ]}
      >
        <Text>{item.notification.text}</Text>
        <RNImage source={Images.arrow_right} />
      </View>
    </Swipeout>
  );

  _renderClearButton = () => (
    <View style={[AppStyles.paddingVerticalBase]}>
      <Button
        style={styles.clearBtnStyle}
        color={Colors.white}
        size="medium"
        background={Colors.darkBlue}
      >
        Clear all notifications
      </Button>
    </View>
  );

  render() {
    const { notificationsFetching, notificationsData } = this.props;
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
          {notificationsFetching && <SimpleLoader />}
          {!notificationsFetching &&
            this._renderNotifications(notificationsData)}
          {notificationsData.length > 0 && this._renderClearButton()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ notification }) => ({
  notificationsData: notification.data,
  notificationsFetching: notification.isFetching
});

const actions = { getNotificationsRequest };

export default connect(
  mapStateToProps,
  actions
)(Notification);
