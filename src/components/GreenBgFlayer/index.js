// @flow
import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import { Images } from "../../theme";

export default class GreenBgFlayer extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={Images.login_header_wrapper}
          resizeMode="stretch"
          style={styles.image}
        />
      </View>
    );
  }
}
