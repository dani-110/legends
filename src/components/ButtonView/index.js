import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Platform
} from "react-native";
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

  disableOnPress = false;

  debounceTime = Platform.select({
    ios: 200,
    android: 700
  });

  _onPress(onPress) {
    if (!this.disableOnPress) {
      this.disableOnPress = true;
      if (onPress) {
        onPress();
      }

      setTimeout(() => {
        this.disableOnPress = false;
      }, this.debounceTime);
    }
  }

  render() {
    const {
      style,
      children,
      rippleOnAndroid,
      isDisabled,
      onPress,
      ...rest
    } = this.props;

    if (Util.isPlatformAndroid() && rippleOnAndroid) {
      return !isDisabled ? (
        <TouchableNativeFeedback
          {...rest}
          onPress={() => {
            this._onPress(onPress);
          }}
        >
          <View style={style}>{this.props.children}</View>
        </TouchableNativeFeedback>
      ) : (
        <View style={style}>{this.props.children}</View>
      );
    }

    return !isDisabled ? (
      <TouchableOpacity
        style={style}
        activeOpacity={0.7}
        {...rest}
        onPress={() => {
          this._onPress(onPress);
        }}
      >
        {this.props.children}
      </TouchableOpacity>
    ) : (
      <View style={style} activeOpacity={0.7} {...rest}>
        {this.props.children}
      </View>
    );
  }
}
