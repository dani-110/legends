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
        style={[
          AppStyles.flexRow,
          AppStyles.padding15,
          AppStyles.centerInner,
          AppStyles.borderBottomGrey
        ]}
      >
        <Text
          type="bold"
          style={{ width: 80 }}
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
          <Text type="bold" size="small" color={Colors.text.secondary}>
            {data.team_name}
          </Text>
        </View>
        <View style={styles.points}>
          <Text
            type="bold"
            size="small"
            color={Colors.white}
            textAlign="center"
          >
            {data.points}
          </Text>
        </View>
      </View>
    );
  }
}
