// @flow
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "../../../../components";
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
          style={AppStyles.flex}
          size="small"
          color={Colors.text.secondary}
        >
          {data.name}
        </Text>
        <View style={{ width: 110 }}>
          <Text
            type="bold"
            size="small"
            textAlign="center"
            color={Colors.text.secondary}
            style={[AppStyles.pLeft10, AppStyles.pRight10]}
          >
            {data.tournament_date}
          </Text>
        </View>
        <View
          style={[
            styles.statusWrapper,
            {
              backgroundColor:
                data.state === "complete" ? Colors.red : Colors.green
            }
          ]}
        >
          <Text
            type="bold"
            size="xSmall"
            color={Colors.white}
            textAlign="center"
          >
            {data.state}
          </Text>
        </View>
      </View>
    );
  }
}
