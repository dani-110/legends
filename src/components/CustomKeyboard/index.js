import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Image,
  Animated
} from "react-native";
import Util from "../../util";
import styles from "./styles";
import { Text } from "../";
import { Images } from "../../theme";

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
    children: PropTypes.node.isRequired,
    rippleOnAndroid: PropTypes.bool
  };

  static defaultProps = {
    mini: false,
    rippleOnAndroid: false,
    visible: true,
    onKeyPress: () => {
      console.log("Key pressed");
    }
  };
  toggleModal = visible => {
    Animated.spring(this.state.animation, {
      toValue: !visible ? 0 : 1
    }).start();
  };
  componentWillReceiveProps(nextProps) {
    console.log("prop received  ", nextProps);
    this.toggleModal(nextProps.visible);
  }

  render() {
    const { mini, visible, onKeyPress } = this.props;
    const miniKeys = [
      "Del",
      <Image source={Images.cross} />,
      <Image source={Images.check} />
    ];
    const numericKeys = [
      ["Del", "0", "1", "2", "3", "4"],
      ["-", "5", "6", "7", "8", "9"]
    ];

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
              outputRange: [mini ? -40 : -80, 0]
            })
          }
        ]}
      >
        {mini ? (
          <View style={styles.miniWraper}>
            {miniKeys.map((item, index) => {
              const per =
                index == 0 ? "noImage" : index == 1 ? "cross" : "check";
              return (
                <TouchableOpacity
                  onPress={() => onKeyPress(per)}
                  style={styles.miniKeyBoardButton}
                >
                  {React.isValidElement(item) ? (
                    <View>{item}</View>
                  ) : (
                    <Text type="bold">{item}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={styles.numericWraper}>
            {numericKeys.map((row, current) => {
              // sad
              console.log({ row, current });
              return (
                <View style={styles.rowView}>
                  {row.map((item, indexx) => {
                    console.log({ rowss: row, currentsss: current });
                    return (
                      <TouchableOpacity
                        onPress={() => onKeyPress(item)}
                        style={styles.numericButton}
                      >
                        <Text type="bold">{item}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View>
        )}
      </Animated.View>
    );
  }
}
