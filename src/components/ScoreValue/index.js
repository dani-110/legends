// @flow
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "../";
import styles from "./styles";
import { Colors } from "../../theme";

function getScoreColor(score, par) {
  if (score === par + 1) {
    // blue
    return { bg: Colors.blue, text: Colors.white };
  } else if (score === par - 1) {
    // red
    return { bg: Colors.blue, text: Colors.white };
  } else if (score === par + 2) {
    // black
    return { bg: Colors.blue, text: Colors.white };
  } else if (score === par - 2) {
    // yellow

    return { bg: Colors.yellow, text: Colors.black };
  }

  return { bg: Colors.white, text: Colors.text.primary };
}

export default class ScoreValue extends React.Component {
  static propTypes = {
    par: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    const getColor = getScoreColor(props.score, props.par);
    this.textColor = getColor.text;
    this.bgColor = getColor.bg;
  }

  textColor = "";
  bgColor = "";

  render() {
    const { score, ...rest } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: this.bgColor }]}>
        <Text color={this.textColor} {...rest}>
          {score}
        </Text>
      </View>
    );
  }
}
