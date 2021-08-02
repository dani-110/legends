// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { Text, ButtonView } from "../../../components";
import { TIME_FORMAT1, MATCH_TYPES } from "../../../constants";
import styles from "./styles";
import { Colors, AppStyles, Images, Fonts } from "../../../theme";
import Util from "../../../util";
import { debug } from "react-native-reanimated";
import { iteratee } from "lodash";
import { Alert } from "react-native";

export default class ListItem extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    sectionTitle: PropTypes.string.isRequired,
    matchFoo: PropTypes.string.isRequired
  };



  static defaultProps = {};

  render() {
    const { sectionTitle, data, matchFoo } = this.props;
    const { match_date_format, match_date, round_text, type, name, title, venue, team1_name, team2_name, team_1_initials, team_2_initials, desc } = data;
    const navigateTO = (sectionTitle === "LIVE") ? `${type}livescore` : null;

    title_ = type.toUpperCase();
    let bg = "";
    if (title_ === MATCH_TYPES.POTY) {
      bg = Colors.blue2;
    } else if (title_ === MATCH_TYPES.LCL) {

      bg = Colors.green;
    } else if (title_ === MATCH_TYPES.LMP) {
      bg = Colors.black2;
    } else {
      bg = Colors.red5;
    }
    //   ;




    // {
    //   foo = match_date_format
    // }
    // ;
    return (<ButtonView
      onPress={() => Actions.jump(navigateTO, { data })} >
      <View>
        {((sectionTitle !== "LIVE")) && (matchFoo !== match_date_format) ? (

          <Text size="large" color={Colors.black2Tinted}>
            {match_date_format}

          </Text>
        ) : null}
      </View>
      <View
        style={[[styles.container, { backgroundColor: bg }]]}>
        <View
          style={[
            AppStyles.flexRow,
            AppStyles.alignItemsCenter,
            { flex: 1 }
          ]}
        >
          {
            !(title_ === MATCH_TYPES.LCL || title_ === MATCH_TYPES.DMP) ? (
              <TouchableOpacity
                onPress={() => Actions.jump("EditMatch")} >
                <View style={{ padding: 14, flex: 1, flexDirection: 'row', }}>
                  {title_ === MATCH_TYPES.POTY ? (
                    <Text type="normal" color={Colors.white} style={{ flex: 3, flexDirection: 'row', fontSize: 15 }}>
                      {name}</Text>
                  ) : //(team1_name + "\nVS \n" + team2_name)
                    (
                      <View style={{ flex: 3, flexDirection: 'column' }}>
                        <Text type="normal" color={Colors.white} style={styles.lmpText} >
                          {team1_name} </Text>
                        <Text type="normal" color={Colors.whiteOpaque} >
                          VS</Text>
                        <Text type="normal" color={Colors.white} style={styles.lmpText} >
                          {team2_name}</Text>
                      </View>
                    )
                  }


                  <View style={styles.RectangleShape}>
                    <Text style={{ alignSelf: 'center', paddingTop: 3, }} color={Colors.white} size="xSmall" type="bold">
                      {title_}
                    </Text>
                  </View>

                </View>
              </TouchableOpacity>

            ) : (
              <>
                <View style={[styles.container, { backgroundColor: 'rgba(255,255,255, 0.2)', flex: 1, padding: 14, flexDirection: 'row' }]}
                >
                  <View style={{ flex: 3, flexDirection: 'column' }}>
                    {title_ !== MATCH_TYPES.DMP ? (
                      <Text type="bold" color={Colors.white} style={{ flex: 1, flexDirection: 'row', fontSize: 16 }}>
                        {team1_name}
                      </Text>
                    ) : null}
                    <Text color={Colors.white} style={title_ === MATCH_TYPES.DMP ? (styles.textTitle) : (styles.textTitle2)}>
                      {team_1_initials}
                    </Text>
                    <Text size="small" color={Colors.whiteOpaque} style={{ flex: 1, flexDirection: 'row', fontSize: 14 }}>
                      VS
                    </Text>
                    {title_ !== MATCH_TYPES.DMP ? (
                      <Text type="bold" color={Colors.white} style={{ flex: 1, flexDirection: 'row', fontSize: 16 }}>
                        {team2_name}
                      </Text>
                    ) : null}

                    <Text color={Colors.white} style={title_ === MATCH_TYPES.DMP ? (styles.textTitle) : (styles.textTitle2)}>
                      {team_2_initials}
                    </Text>
                  </View>

                  <View style={styles.RectangleShape}>
                    <Text style={{ alignSelf: 'center', paddingTop: 3, }} color={Colors.white} size="xSmall" type="bold">
                      {title_}
                    </Text>
                  </View>
                </View>
              </>
            )
          }

          {/* <Image source={Images.clock_white} style={AppStyles.mRight5} /> */}

        </View>
        <View style={{ paddingBottom: 14, paddingLeft: 14, }}>
          <Text type="bold" color={Colors.white} style={{ flex: 3, flexDirection: 'row' }}>
            {round_text}
          </Text>
          <Text size="small" color={Colors.windowTintWhite}>
            {venue}
          </Text>
        </View>
        {/* <Image source={Images.arrow_right_white} style={styles.arrow_right} /> */}
      </View>
    </ButtonView >);

  }


}

