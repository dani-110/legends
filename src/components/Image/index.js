// @flow
import React from "react";
import { View, Image } from "react-native";
import { Colors } from "../../theme";

export default class Empty extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    const { ...rest } = this.props;
    return (
      <View style={{ backgroundColor: Colors.grey2 }}>
        <Image {...rest} />
      </View>
    );
  }
}
