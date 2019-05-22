// @flow
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text, Image } from "../../../../components";
import styles from "./styles";
import { AppStyles, Colors } from "../../../../theme";

export default class ListItem extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  static defaultProps = {};

  render() {
    const { data } = this.props;

    return (
      <View
        style={[AppStyles.flexRow, AppStyles.padding15, AppStyles.centerInner]}
      >
        <Text
          type="bold"
          style={{ width: 50 }}
          size="small"
          color={Colors.text.secondary}
        >
          {data.rank}
        </Text>
        <View
          style={[
            AppStyles.flex,
            AppStyles.flexRow,
            AppStyles.alignItemsCenter
          ]}
        >
          <Image source={{ uri: data.avatar }} style={styles.image} />
          <Text type="bold" size="small" color={Colors.text.secondary}>
            {data.playerName}
          </Text>
        </View>
        <Text
          type="bold"
          size="small"
          style={{ width: 60 }}
          color={Colors.text.secondary}
        >
          {data.points}
        </Text>
      </View>
    );
  }
}
