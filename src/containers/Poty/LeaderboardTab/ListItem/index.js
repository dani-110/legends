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
          style={{ width: 70, ...styles.innerText }}
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
          {/* <Image source={{ uri: data.avatar }} style={styles.image} /> */}
          <Text

            style={{ ...AppStyles.capitalize, ...styles.innerText }}
          >
            {data.name}
          </Text>
        </View>

        <Text

          style={{ width: 90, ...styles.innerText }}
        >
          {data.events}
        </Text>
        <Text
          style={{ width: 60, ...styles.innerText }}
        >
          {data.points}
        </Text>
      </View>
    );
  }
}
