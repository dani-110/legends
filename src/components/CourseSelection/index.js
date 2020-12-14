// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image, Alert, Dimensions, Button, FlatList, TouchableOpacity } from "react-native";
import { Text } from "../";
import styles from "./styles";
import { Images, AppStyles, Colors } from "../../theme";
import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';
import ButtonView from "../ButtonView";
import util from "../../util";
import { BASE_URL } from '../../config/WebService';
import axios from "axios";
import CustomPicker from '../CustomPicker'

export default class CourseSelection extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    // activeIndex: PropTypes.number.isRequired,
    isRow: PropTypes.bool
  };


  state = {

    teesData: [false, false, false, false],
    teesSelected: ['', '', '', '', ''],
    visible: false,
    showAllCourses: false,
    players: [],
    dataSource: [],
    tees: [],
    showTees: false,
    currentSelected: '',
    // to send to server 
    slectedtees: ['', '', '', ''],
    playersID: ['', '', '', ''],
    selectedCourse: '',
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
        }}
      />
    );
  };

  getData() {
    const { data } = this.props;
    debugger
    console.log("course change proops ", data.data)
    const AuthStr = util.getCurrentUserAccessToken();
    URL = BASE_URL + `getCoursesWithTee`;

    console.log(URL, "   == >getData------------>", data.data.type, "    Schedual ", data.data.schedule_id, "    match Id", data.data.match_id)
    debugger
    axios.post(URL, {
      type: data.data.type,
      schedule_id: data.data.schedule_id,
      match_id: data.data.match_id

    }, { headers: { Authorization: AuthStr } }).then((response) => {
      this.setState({ dataSource: response.data.data.courses, players: response.data.data.player, showAllCourses: true });

      // this.setState({ dataSource: response.data.data })
      console.log("responce New ==>", response);
    })

      .catch(function (error) {

        console.log("error ", error);
        Alert.alert(error);
      });
    console.log("data source New  ==>", this.state.dataSource)
  }

  _renderItem(Item) {
    return (
      <View>

      </View>
    )
  }


  handleChange(index) {

    const newIds = [false, false, false, false]
    // const newIds = this.state.teesData.slice() //copy the array
    newIds[index] = !this.state.teesData[index]
    this.setState({ teesData: newIds })
    console.log(this.state.teesData)

  }
  handleteesChange(index, data_) {
    const newIds = this.state.teesSelected.slice() //copy the array
    newIds[index] = data_
    console.log(index, data_)
    console.log(newIds)
    this.setState({ teesSelected: newIds })
    console.log(this.state.teesSelected)


  }
  handleteesChangeID(index, data_) {
    const newIds = this.state.slectedtees.slice() //copy the array
    newIds[index] = data_
    console.log("Id is ==>", data_)
    console.log(newIds)
    this.setState({ slectedtees: newIds })
  }
  _updateAndSendData() {
    const { data } = this.props;
    const newIds = this.state.playersID.slice();
    this.state.playersID.map((e, index) => {
      newIds[index] = this.state.players[index].id
    })
    this.setState({ playersID: newIds })
    const AuthStr = util.getCurrentUserAccessToken();
    URL = BASE_URL + `saveCourse`;

    console.log(data.data.type, data.data.schedule_id, "    match Id", data.data.match_id)
    debugger
    axios.post(URL, {


      type: data.data.type,
      schedule_id: data.data.schedule_id,
      match_id: data.data.match_id,
      course_id: this.state.selectedCourse,

      player1_tee_id: this.state.slectedtees[0],
      player2_tee_id: this.state.slectedtees[1],
      player3_tee_id: this.state.slectedtees[2],
      player4_tee_id: this.state.slectedtees[3],

      player_1: newIds[0],
      player_2: newIds[1],
      player_3: newIds[2],
      player_4: newIds[3]

    }, { headers: { Authorization: AuthStr } }).then((response) => {
      this.setState({ showTees: false })
      Alert.alert("Course and tee has been changed successfully")
      console.log("responce New ==>", response);
    })

      .catch(function (error) {

        console.log("error ", error);
        Alert.alert(error);
      });
  }
  render() {

    const { data } = this.props;

    debugger
    return (
      data.data.id === data.current_match[0]?.id ?
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.setState({ visible: true })}

          >
            <Image
              source={Images.change_Icon}
            />
          </TouchableOpacity>
          <Dialog
            visible={this.state.visible}
            onTouchOutside={() => {
              this.setState({ visible: false, showAllCourses: false });
            }}
          // dialogTitle={<DialogTitle title="You are playing\n"{data.current_match[0].name} />}
          >
            <DialogContent
              style={{
                ...AppStyles.centerInner,
                minHeight: Dimensions.get('window').height * (this.state.dataSource.length === 0 ? .3 : (this.state.dataSource.length + 1) / 10),
                width: Dimensions.get('window').width * .9,
              }}
            >
              <View style={{
                flexDirection: 'column', justifyContent: 'space-around', minHeight: 270
              }}>
                <View style={{ top: 10, flex: 1 }}>
                  <Text

                    style={{ ...styles.titleHeader }}>
                    You are playing
              {"\n" + data.current_match[0].venue}
                  </Text>
                  <TouchableOpacity
                    onPress={() => { this.getData() }}
                  >
                    <View style={styles.dropDownLargeStyle}>
                      <Text style={styles.textdropDown}>
                        {this.state.currentSelected != '' ? this.state.currentSelected : "Course"}
                      </Text>
                    </View>
                  </TouchableOpacity>

                </View>
                {this.state.showAllCourses ? (
                  <View style={{ width: '100%', ...styles.containerInner }}>

                    <View>
                      <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item, index }) =>
                          <Text style={styles.item}
                            onPress={() => { this.setState({ selectedCourse: item.id, tees: item.tees, showAllCourses: false, currentSelected: item.name }) }}>{item.name}</Text>}

                      />

                    </View>
                  </View>
                ) : null}

                <ButtonView style={{ bottom: 40, width: 300, height: 50, ...styles.buttonGreenStyle }}
                  onPress={() => { this.state.currentSelected != '' ? this.setState({ showTees: true, visible: false, }) : null }}
                >
                  <Text
                    color={Colors.white}
                    style={styles.buttonTitleText}
                  >
                    Confirm
                </Text>
                </ButtonView>
              </View>
            </DialogContent>
          </Dialog>

          <Dialog
            visible={this.state.showTees}
            onTouchOutside={() => {
              this.setState({ showTees: false, showAllCourses: false });
            }}
          // dialogTitle={<DialogTitle title="You are playing\n"{data.current_match[0].name} />}
          >
            <DialogContent
              style={{
                ...styles.dialogStyle,
                height: Dimensions.get('window').height * ((this.state.players.length + 1) / 10),
              }}
            >
              <View style={AppStyles.centerInner}>
                <Text
                  style={{ ...styles.titleTees, }}>
                  Select Tee for each {'\n'} player
              </Text>

              </View>


              <View style={{ marginTop: 30, marginBottom: 30, width: '100%', flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
                {this.state.teesData.map((e, index) => (

                  this.state.players[index]?.name !== 0 ? (
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={AppStyles.flex2}>

                        <Text style={styles.PlayerNameStyle}>
                          {this.state.players[index]?.name}
                        </Text>
                      </View>

                      <View style={{ justifyContent: 'flex-end', flex: 1, borderRadius: 15, borderWidth: 1, borderColor: Colors.grey, width: 300, height: 40 }}>
                        <CustomPicker placeholder="Select Tee" items={this.state.tees} //category="category"
                          label="name" value="id" selectedValue={this.state.teesSelected[index]} selectedValueName={this.state.teesSelected[index]} setSelectedValueName={(e) => this.handleteesChange(index, e)}
                          setSelectedValue={(e) => this.handleteesChangeID(index, e)} />
                      </View>
                    </View>
                  ) : (null)

                ))}
                <View style={{ ...AppStyles.centerInner, ...AppStyles.flex }}>
                  <ButtonView style={{ height: 50, width: 250, ...styles.buttonGreenStyle }}
                    onPress={() => { this._updateAndSendData(), this.setState({ showTees: true, visible: false }) }}
                  >
                    <Text
                      color={Colors.white}
                      style={styles.buttonTitleText}
                    >
                      Confirm
                </Text>
                  </ButtonView>
                </View>
              </View>



            </DialogContent>
          </Dialog>
        </View>

        : null);

  }
}
