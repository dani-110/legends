// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { Text, ButtonView } from "../../../components";
import { MATCH_TYPES } from "../../../constants";
import styles from "./styles";
import { Colors, Images } from "../../../theme";

export default class ListItem extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    sectionTitle: PropTypes.string.isRequired,
    matchFoo: PropTypes.string.isRequired
  };



  static defaultProps = {};

  render() {

    debugger

    const { sectionTitle, data, matchFoo } = this.props;
    const { is_edit, match_date_format, match_date, round_text, type, name, title, venue, team1_name, team2_name, team_1_initials, team_2_initials, desc } = data;
    const navigateTO = (sectionTitle === "LIVE") ? `${type}livescore` : null;

    debugger

    let title_ = type.toUpperCase();
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
        {((sectionTitle === "UPCOMING")) && (matchFoo !== match_date_format) ? (

          <Text size="large" color={Colors.black2Tinted}>
            {match_date_format}

          </Text>
        ) : null}
      </View>
      <View
        style={[[styles.container, { backgroundColor: bg }]]}>
        <View
          style={[
            //  AppStyles.flexRow,
            //  AppStyles.alignItemsCenter,

            { flex: 1, height: title_ === MATCH_TYPES.POTY ? 100 : null }
          ]}
        >
          {
            !(title_ === MATCH_TYPES.LCL || title_ === MATCH_TYPES.DMP || title_ === MATCH_TYPES.LMP) ? (
                <View style={{ padding: 14, flex: 1, flexDirection: 'row', }}>
                  {title_ === MATCH_TYPES.POTY ? (
                    <Text type="normal" color={Colors.white} style={{ flex: 3, flexDirection: 'row', fontSize: 15 }}>
                      {name}</Text>
                  ) : //(team1_name + "\nVS \n" + team2_name)
                    (
                      <View style={{ flex: 3, flexDirection: 'column' }}>
                        <Text type="normal" color={Colors.white} style={styles.lmpText} >{team1_name}</Text>
                        <Text type="normal" color={Colors.whiteOpaque} >
                          VS</Text>
                        <Text type="normal" color={Colors.white} style={styles.lmpText} >
                          {team2_name}</Text>
                      </View>
                    )
                  }

                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <View style={{ ...styles.RectangleShape }}>
                      <Text style={{ textAlign: 'center', paddingTop: 3, }} color={Colors.white} size="xSmall" type="bold">
                        {title_}
                      </Text>
                    </View>
                  </View>

                </View>
      
            ) : (
              <>
                <View style={[styles.container, { backgroundColor: 'rgba(255,255,255, 0.2)', flex: 1, padding: 14, flexDirection: 'row' }]}
                >
                  <View style={{ flex: 3, flexDirection: 'column' }}>
                    {title_ !== MATCH_TYPES.DMP ? (
                      <Text type="bold" color={Colors.white} style={{ flex: 1, flexDirection: 'row', fontSize: 16 }}>{team1_name}</Text>
                    ) : null}
                    <Text color={Colors.white} style={title_ === MATCH_TYPES.DMP ? (styles.textTitle) : { ...styles.textTitle2, marginTop: 0 }}>
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

                    <Text color={Colors.white} style={title_ === MATCH_TYPES.DMP ? (styles.textTitle) : { ...styles.textTitle2, marginTop: 0 }}>
                      {team_2_initials}
                    </Text>
                  </View>

                    <View style={styles.RectangleShape}>
                      <Text style={{ alignSelf: 'center', paddingTop: 3, }} color={Colors.white} size="xSmall" type="bold">
                        {title_==='LMP'?'SMP':title_}
                      </Text>
                    </View>
                </View>
              </>
            )
          }

          {title_ === MATCH_TYPES.POTY ?
            (<View style={{
              width: '80%',
              position: 'absolute',
              padding: 14,
              justifyContent: 'center',
              height: '100%'

            }}>
              <Text type="bold" color={Colors.white} style={{ flexDirection: 'row' }}>
                {round_text}
              </Text>
              <Text size="small" color={Colors.windowTintWhite}>
                {venue}
              </Text>
            </View>)

            : null}


        </View>

        {title_ !== MATCH_TYPES.POTY ?
          <View style={{ flexDirection: 'row' }}>


            <View style={{
              paddingBottom: 14,
              paddingLeft: 14,
              flex: 0.95,
            }}>
              <Text type="bold" color={Colors.white} style={{ flex: 3, flexDirection: 'row' }}>
                {round_text}
              </Text>
              <Text size="small" color={Colors.windowTintWhite}>
                {venue}
              </Text>
            </View>
            {
              (sectionTitle.toLowerCase() === 'my_matches' || is_edit) ? (sectionTitle.toLowerCase() === 'my_matches' || is_edit === 1 ?

                (<TouchableOpacity
                  style={{ alignSelf: 'center' }}
                  onPress={() => Actions.jump("EditMatch", { data })} >
                  <Image source={Images.icon_change_game} />
                </TouchableOpacity>)
                :null):null
            }
          </View>


          : <View />}

      </View>
    </ButtonView>);

  }


}

