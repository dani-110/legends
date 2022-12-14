// @flow
import React from "react";
import _, { toInteger } from "lodash";
import PropTypes from "prop-types";
import { Alert, View } from "react-native";
import { Text } from "../";
import styles from "./styles";
import { Colors, Fonts } from "../../theme";
import Orientation from 'react-native-orientation';

function getScoreColor(score, par) {

  var tempScore = toInteger(score);
  var tempPar = toInteger(par);

  if (score === null || score === "WD") {
    return { bg: Colors.white, text: Colors.text.primary, border: 0 };
  }
  else if (tempScore === tempPar + 1) {
    // blue
    return { bg: Colors.blue, text: Colors.white, border: 0 };
  } else if (tempScore === tempPar - 1) {
    // red
    return { bg: Colors.redDark, text: Colors.white, border: 100 };
  } else if (tempScore > tempPar + 1) {
    // black
    return { bg: Colors.black, text: Colors.white, border: 0 };
  } else if (tempScore < tempPar - 1) {
    // yellow
    return { bg: Colors.red4, text: Colors.white, border: 100 };
  }
  return { bg: Colors.white, text: Colors.text.primary };

}

export default class ScoreValue extends React.Component {
  static propTypes = {
    par: PropTypes.number.isRequired,
    score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    const getColor = getScoreColor(props.score, props.par);
    this.textColor = getColor.text;
    this.bgColor = getColor.bg;
    this.borderRediousVal = getColor.border;
  }


  textColor = "";
  bgColor = "";
  borderRediousVal = 0;

  componentWillMount() {
    // The getOrientation method is async. It happens sometimes that
    // you need the orientation at the moment the JS runtime starts running on device.
    // `getInitialOrientation` returns directly because its a constant set at the
    // beginning of the JS runtime.
    const initial = Orientation.getInitialOrientation();
    Orientation.lockToLandscape();

    if (initial === 'PORTRAIT') {
      // do something
    } else {
      // do something else
    }
  }

  componentDidMount() {
    // this locks the view to Portrait Mode
    //Orientation.lockToPortrait();

    // this locks the view to Landscape Mode
    Orientation.lockToLandscape();

    // this unlocks any previous locks to all Orientations
    // Orientation.unlockAllOrientations();

    Orientation.addOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = (orientation) => {

    Orientation.lockToLandscape();
  }


  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });

    Orientation.lockToPortrait();
    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }
  render() {
    const { score, ...rest } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: this.bgColor, borderRadius: this.borderRediousVal, }]}>
        <Text color={this.textColor} {...rest} style={{ fontSize: Fonts.size.small, fontWeight: 'normal', }}>
          {score}
        </Text>
      </View>
    );
  }
}
