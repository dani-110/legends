// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { Text, ButtonView } from "../../../components";
import { TIME_FORMAT1, MATCH_TYPES } from "../../../constants";
import styles from "./styles";
import { Colors, AppStyles, Images, Fonts } from "../../../theme";
import Util from "../../../util";
import { debug } from "react-native-reanimated";
import { iteratee } from "lodash";

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
    //  debugger;




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
              <View style={{ padding: 14, flex: 1, flexDirection: 'row', }}>
                <Text type="bold" color={Colors.white} style={{ flex: 3, flexDirection: 'row' }}>
                  {title_ === MATCH_TYPES.POTY ? (name) : (team1_name + " vs " + team2_name)}
                </Text>

                <View style={styles.RectangleShape}>
                  <Text style={{ alignSelf: 'center', paddingTop: 3, }} color={Colors.white} size="xSmall" type="bold">
                    {title_}
                  </Text>
                </View>

              </View>
            ) : (
                <>
                  <View style={[styles.container, { backgroundColor: 'rgba(255,255,255, 0.2)', flex: 1, padding: 14, flexDirection: 'row' }]}
                  >
                    <View style={{ flex: 3, flexDirection: 'column' }}>
                      <Text type="bold" color={Colors.white} style={{ flex: 1, flexDirection: 'row', fontSize: 16 }}>
                        {team1_name}
                      </Text>
                      <Text size="small" color={Colors.white} style={{ flex: 1, flexDirection: 'row', fontSize: 12 }}>
                        {team_1_initials}
                      </Text>
                      <Text size="small" color={Colors.whiteOpaque} style={{ flex: 1, flexDirection: 'row', fontSize: 14 }}>
                        VS
                      </Text>
                      <Text type="bold" color={Colors.white} style={{ flex: 1, flexDirection: 'row', fontSize: 16 }}>
                        {team2_name}
                      </Text>
                      <Text size="small" color={Colors.white} style={{ flex: 1, flexDirection: 'row', fontSize: 12 }}>
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

