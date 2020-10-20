// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Dimensions, Image, Alert } from "react-native";
import { Text, Button, ButtonView } from "../../../../components";
import styles from "./styles";
import { BASE_URL } from '../../../../config/WebService'
import { AppStyles, Images, Colors, Fonts } from "../../../../theme";
import { color, Value } from "react-native-reanimated";
import { values } from "lodash";
import axios from "axios";
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import DataHandler from "../../../../services/DataHandler";
import util from "../../../../util";
export default class ListItem extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  state = { visible: false }
  buttonClick(params, isParticipate) {
    if (params === "Registration")
      this.setState({ visible: true });
    else {
      Alert.alert("Already Registered");
    }
  }

  getStatusColor(data) {
    console.log(data.status)
    switch (data.status) {
      case "TBA ":
        return Colors.red
      case "Registration":
        return Colors.redDark
      case "Registered":
        return Colors.redDark
      case "Scheduled":
        return Colors.red5
      case "Completed":
        return Colors.green
    }
  }
  static defaultProps = {};

  sendData(data_) {
    console.log(BASE_URL + '/tournamentInvitationApi');
    axios.post(BASE_URL + '/tournamentInvitationApi', {
      decesion: 1,
      tourId: data_.tournament_id

    }, {
      headers: {
        Authorization: util.getCurrentUserAccessToken()
      }
    })
      .then((response) => {
        debugger
        this.props.updateInputValue(data_.tournament_id)
      })
      .catch(function (error) {
        // Alert.alert(error);
      });
    this.setState({ visible: false })
  }


  render() {
    const { data, updateInputValue } = this.props;
    console.log("render")
    return (
      <View
        style={[
          AppStyles.flexRow,
          AppStyles.padding15,
          AppStyles.centerInner,
          AppStyles.borderBottomGrey
        ]}
      >
        <Dialog
          visible={this.state.visible}
          onHardwareBackPress={()=>{this.setState({ visible: false })}}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
          footer={
            <View style={styles.dialogBoxStyle, { alignItems: 'center' }}>
              <View style={[
                styles.buttonStyle,
                {
                  backgroundColor: Colors.green,
                  bottom: 15,
                }
              ]}>

                <DialogButton
                  text="Confirm" textStyle={{ color: 'white', fontSize: 15 }}
                  onPress={() => this.sendData(data)}
                />
              </View>

            </View>
          }
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }

        >

          <DialogContent
            style={{ justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width * .7, height: Dimensions.get('window').height * .35 }}
          >
            <View style={{
              flex: 1,
              marginTop: 15,
              marginBottom: 50,
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: Fonts.type.base,
                marginBottom: 10,
              }} >Confirm registration</Text>
              <Text

                style={{
                  fontSize: Fonts.size.large,
                  textAlign: 'center',
                  fontWeight: 'bold'
                }} >
                {data.name}
              </Text>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <Image
                style={{
                  width: 18.35,
                  height: 22,
                  marginLeft: 60,
                  alignSelf: 'flex-start',
                }}
                source={Images.icon_player}
                resizeMode="cover"
              />

              <Text style={{ flex: 2, fontSize: 15, paddingTop: 5, marginLeft: 15, textAlign: 'left' }}>{data.participating} Players</Text>
            </View>

            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <Image
                style={{
                  width: 22.8,
                  height: 22.8,
                  marginLeft: 60,
                  alignSelf: 'flex-start',
                }}
                source={Images.calendar_popUp}
                resizeMode="cover"
              />

              <Text style={{ flex: 2, fontSize: 15, paddingTop: 5, marginLeft: 15, textAlign: 'left' }}>{data.date_format}</Text>
            </View>

            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <Image
                style={{
                  width: 21.85,
                  height: 21.85,
                  marginRight: 20,
                  marginLeft: -20,
                }}
                source={Images.clock_popUp}
                resizeMode="cover"
              />
              <Text style={{ flexDirection: 'row', fontSize: 15, paddingTop: 5 }}>{data.tee_off_time}</Text>
            </View>
          </DialogContent>
        </Dialog>
        <Text
          type="bold"
          style={AppStyles.flex}
          size="small"
          color={Colors.text.secondary}
        >
          {data.name}
        </Text>
        <View style={{ width: 150 }}>
          <Text
            type="bold"
            size="small"
            textAlign="center"
            color={Colors.text.secondary}
            style={[AppStyles.pLeft10, AppStyles.pRight10]}
          >
            {data.date_format}
          </Text>
        </View>
        <View
          style={[
            styles.statusWrapper,
            {
              backgroundColor: this.getStatusColor(data)
              // data.status === "complete" ? Colors.red : Colors.green

            }
          ]}

        >
          <ButtonView

            onPress={() =>
              this.buttonClick(data.status)
            }
          >

            <Text
              type="base"
              size="small"
              color={Colors.white}
              textAlign="center"
            >
              {data.status}

            </Text>
          </ButtonView>
        </View>
      </View >
    );
  }

  componentWillUnmount(){
    console.log("unmount")
    this.setState({visible:false})
  }
}
