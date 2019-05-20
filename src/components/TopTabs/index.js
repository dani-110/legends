// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Text, ButtonView } from "../";
import styles from "./styles";
import { Images, AppStyles } from "../../theme";

export default class TopTabs extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired
  };

  static defaultProps = {};

  _renderButton(data, isActive, index) {
    return (
      <ButtonView
        onPress={data.onPress}
        style={[styles.container, styles.containerInactive]}
        key={index}
      >
        <Image
          source={
            Images[`${data.image}${isActive ? "_selected" : "_unselected"}`]
          }
        />
        <Text>{data.title}</Text>
        {isActive && <View style={styles.selectedBorder} />}
      </ButtonView>
    );
  }

  render() {
    const { data, activeIndex } = this.props;
    return (
      <View style={[AppStyles.flexRow]}>
        {data.map((element, index) =>
          this._renderButton(element, index === activeIndex, index)
        )}
      </View>
    );
  }
}

/* (

    
    <TopTabs
      data={element}
      isActive={this.state.activeTabIndex === index}
      key={index}
    />
  ) */
