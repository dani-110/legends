import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, TouchableNativeFeedback, View } from "react-native";
import Util from "../../util";

export default class ButtonView extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    children: PropTypes.node.isRequired,
    rippleOnAndroid: PropTypes.bool,
    isDisabled: PropTypes.bool
  };

  static defaultProps = {
    style: {},
    rippleOnAndroid: false,
    isDisabled: false
  };

  render() {
    const {
      style,
      children,
      rippleOnAndroid,
      isDisabled,
      ...rest
    } = this.props;

    if (Util.isPlatformAndroid() && rippleOnAndroid) {
      return !isDisabled ? (
        <TouchableNativeFeedback {...rest}>
          <View style={style}>{this.props.children}</View>
        </TouchableNativeFeedback>
      ) : (
        <View style={style}>{this.props.children}</View>
      );
    }

    return !isDisabled ? (
      <TouchableOpacity style={style} activeOpacity={0.7} {...rest}>
        {this.props.children}
      </TouchableOpacity>
    ) : (
      <View style={style} activeOpacity={0.7} {...rest}>
        {this.props.children}
      </View>
    );
  }
}
