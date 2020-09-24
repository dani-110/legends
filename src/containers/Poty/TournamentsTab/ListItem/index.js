// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Dimensions, Image, Alert } from "react-native";
import { Text, Button, ButtonView } from "../../../../components";
import styles from "./styles";
import { BASE_URL } from '../../../../config/WebService'
import { AppStyles, Images, Colors } from "../../../../theme";
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
        return Colors.red
      case "Registered":
        return Colors.red4
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

    debugger;
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
                fontWeight: "bold",
                marginBottom: 10,
              }} >Confirm registration</Text>
              <Text style={{
                fontSize: 15,
                textAlign: 'center'
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
                  width: 30,
                  height: 30,
                  marginLeft: 60,
                  alignSelf: 'flex-start',
                }}
                source={Images.clock_popUp}
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
                  width: 30,
                  height: 30,
                  marginRight: 20,
                }}
                source={Images.calendar_popUp}
                resizeMode="cover"
              />
              <Text style={{ flexDirection: 'row', fontSize: 15, textAlign: 'center', paddingTop: 5, }}>{data.tournament_date}</Text>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
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
        <View style={{ width: 110 }}>
          <Text
            type="bold"
            size="small"
            textAlign="center"
            color={Colors.text.secondary}
            style={[AppStyles.pLeft10, AppStyles.pRight10]}
          >
            {data.tournament_date}
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
              type="bold"
              size="xSmall"
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
}
