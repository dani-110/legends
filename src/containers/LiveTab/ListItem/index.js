// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { Text, ButtonView } from "../../../components";
import { TIME_FORMAT1, MATCH_TYPES } from "../../../constants";
import styles from "./styles";
import { Colors, AppStyles, Images } from "../../../theme";
import Util from "../../../util";

export default class ListItem extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    sectionTitle: PropTypes.string.isRequired
  };

  static defaultProps = {};

  render() {
    const { sectionTitle, data } = this.props;
    const { time, title, desc } = data;
    let bg = "";
    if (sectionTitle === MATCH_TYPES.POTY) {
      bg = Colors.blue2;
    } else if (sectionTitle === MATCH_TYPES.LCL) {
      bg = Colors.green;
    } else if (sectionTitle === MATCH_TYPES.LMP) {
      bg = Colors.black2;
    } else {
      bg = Colors.red3;
    }
    return (
      <ButtonView
        style={[styles.container, { backgroundColor: bg }]}
        onPress={() => Actions.jump("notification_tab")}
      >
        <View
          style={[
            AppStyles.flexRow,
            AppStyles.alignItemsCenter,
            { alignSelf: "flex-end" }
          ]}
        >
          <Image source={Images.clock_white} style={AppStyles.mRight5} />
          <Text color={Colors.white} size="xSmall" type="bold">
            {Util.getFormattedDateTime(time, TIME_FORMAT1)}
          </Text>
        </View>
        <Text type="bold" color={Colors.white} style={AppStyles.mBottom5}>
          {title}
        </Text>
        <Text size="small" color={Colors.windowTintWhite}>
          {desc}
        </Text>
      </ButtonView>
    );
  }
}
