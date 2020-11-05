import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Image,
  Animated,
  Alert
} from "react-native";
import Util from "../../util";
import styles from "./styles";
import { Text } from "../";
import { Images, Fonts } from "../../theme";

export default class CustomKeyboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0)
    };
  }
  static propTypes = {
    mini: PropTypes.bool,
    visible: PropTypes.bool,
    onKeyPress: PropTypes.func,
    children: PropTypes.node,
    rippleOnAndroid: PropTypes.bool
  };

  static defaultProps = {
    mini: false,
    rippleOnAndroid: false,
    visible: true,
    onKeyPress: () => {
      // console.log("Key pressed");
    },
    currentText: ""
  };
  toggleModal = visible => {
    Animated.spring(this.state.animation, {
      toValue: !visible ? 0 : 1
    }).start();
  };
  componentWillReceiveProps(nextProps) {
    // console.log("prop received  ", nextProps);
    this.toggleModal(nextProps.visible);
  }

  render() {
    debugger
    const { mini, visible, onKeyPress, currentText } = this.props;
    const miniKeys = [
      "DEL",
      <Image source={Images.cross} />,
      <Image source={Images.check} />
    ];
    const numericKeys = [[0, 1, 2, 3], ["DEL", 4, 5, 6], ["-", 7, 8, 9]];

    // if (!visible) {
    //   return null;
    // }
    const zero = new Animated.Value(0);

    return (
      <Animated.View
        // style={styles.container}
        style={[
          styles.container,

          {
            marginBottom: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [mini ? -80 : -180, 0]
            })
          }
        ]}
      >
        {mini ? (
          <View style={styles.miniWraper}>
            {miniKeys.map((item, index) => {
              const per = index == 0 ? "" : index == 1 ? 0 : 1;
              return (
                <TouchableOpacity
                  key={`minikeys${index}`}
                  onPress={() => {
                    console.log("per is------>" + per)
                    onKeyPress(per)
                  }}
                  style={styles.miniKeyBoardButton}
                >
                  {React.isValidElement(item) ? (
                    <View>{item}</View>
                  ) : (
                      <Text size={Fonts.size.xxLarge} type="bold">
                        {item}
                      </Text>
                    )}
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
            <View style={styles.numericWraper}>
              {numericKeys.map((row, current) => (
                <View key={`numeric-keys-${current}`} style={styles.rowView}>
                  {row.map((item, index) => (
                    // console.log({this.props.currentText});
                    <TouchableOpacity
                      key={`numeric-row--${index}`}
                      onPress={() => {
                        console.log("item is---------->" + this.props.currentText)
                        if (this.props.currentText === "1")
                          onKeyPress(this.props.currentText + item)
                        else
                          onKeyPress(item)
                      }}
                      style={styles.numericButton}
                    >
                      <Text size={Fonts.size.xxLarge} type={Fonts.type.base}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          )}
      </Animated.View>
    );
  }
}