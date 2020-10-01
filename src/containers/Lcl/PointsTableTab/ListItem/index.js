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
          style={{ width: 50, ...styles.innerText }}

        >
          {data.rank}
        </Text>
        <View
          style={[
            AppStyles.flex,
            AppStyles.flexRow,
            AppStyles.alignItemsCenter, { justifyContent: 'center' }
          ]}
        >
          <Text style={{ ...styles.innerText, }} >
            {data.team_name}
          </Text>
        </View>

        <View style={styles.points}>
          <Text
            style={{ ...styles.innerText }}
            textAlign="left"
          >
            {data.points}
          </Text>
        </View>

        <View style={styles.points}>
          <Text
            style={{ ...styles.innerText }}
            textAlign="center"
          >
            {data.points}
          </Text>
        </View>
      </View>
    );
  }
}
