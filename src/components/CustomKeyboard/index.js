import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View
} from "react-native";
import Util from "../../util";
import styles from "./styles";
import {Text } from "../" 

export default class CustomKeyboard extends React.PureComponent {
  static propTypes = {
    mini: PropTypes.bool,
    children: PropTypes.node.isRequired,
    rippleOnAndroid: PropTypes.bool
  };

  static defaultProps = {
    mini: false,
    rippleOnAndroid: false
  };

  render() {
    const { mini } = this.props;

    if (Util.isPlatformAndroid() && rippleOnAndroid) {
      return (
        <TouchableNativeFeedback {...rest}>
          <View style={style}>{this.props.children}</View>
        </TouchableNativeFeedback>
      );
    }

    return (
      <View style={styles.container}>
        {mini ? (
          <View>
            <Text>mini</Text>
          </View>
        ) : (
          <View style={styles.numericWraper}>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.numericButton}>
              <Text type = "bold">Del</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numericButton}>
              <Text type = "bold">0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numericButton}>
              <Text type = "bold">1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numericButton}>
              <Text type = "bold">2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numericButton}>
              <Text type = "bold">3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numericButton}>
              <Text type = "bold">4</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.rowView}>
            <TouchableOpacity style={[styles.numericButton , styles.noBorderBottom]}>
              <Text type = "bold">-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.numericButton , styles.noBorderBottom]}>
              <Text type = "bold">5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.numericButton , styles.noBorderBottom]}>
              <Text type = "bold">6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.numericButton , styles.noBorderBottom]}>
              <Text type = "bold">7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.numericButton , styles.noBorderBottom]}>
              <Text type = "bold">8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.numericButton , styles.noBorderBottom]}>
              <Text type = "bold">9</Text>
            </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
