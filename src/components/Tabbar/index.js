// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Text, ButtonView } from "../";
import styles from "./styles";
import { Images } from "../../theme";

const tabsData = [
  { type: "drawer", image: Images.drawer_black },
  {
    type: "home",
    image: Images.home_black,
    selectedImage: Images.home_outline
  },
  {
    type: "live",
    image: Images.live_black,
    selectedImage: Images.live_outline
  },
  {
    type: "notifications",
    image: Images.notification_black,
    selectedImage: Images.notification_black
  }
];

export default class Tabbar extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <View style={styles.container}>
        {tabsData.map(element => {
          return (
            <ButtonView>
              <Image source={element.image} />
            </ButtonView>
          );
        })}
      </View>
    );
  }
}
