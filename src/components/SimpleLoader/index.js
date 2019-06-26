// @flow
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { AppStyles } from "../../theme";

export default class SimpleLoader extends React.Component {
  render() {
    return (
      <View style={[AppStyles.flex, AppStyles.baseMargin]}>
        <ActivityIndicator />
      </View>
    );
  }
}
