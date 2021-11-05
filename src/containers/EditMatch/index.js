// @flow
import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import {
  View, FlatList, Picker, Image as RNImage, Linking, Alert, TouchableOpacity
  , Platform, AsyncStorage
} from "react-native";
import PropTypes from "prop-types";
import { setSelectedTab } from "../../actions/GeneralActions";
import axios from "axios";


import { getScheduleMatchesRequest } from "../../actions/LiveMatchesActions";
import {
  CustomNavbar,
  Text,
  EmptyStateText,
  SimpleLoader,
  TopTabs,
  TextInput, ButtonView
} from "../../components";
import { NAVBAR_THEME } from "../../constants";
import Util from "../../util";
import { AppStyles, Colors, Fonts, Images } from "../../theme";
import styles from "./styles";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import util from "../../util";
import { BASE_URL } from "../../config/WebService";
import { ActivityIndicator } from "react-native";
import { Dimensions } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { getLivedataRequest } from "../../actions/LiveMatchesActions";

class EditMatch extends Component {

  static propTypes = {
    setSelectedTab: PropTypes.func.isRequired,
    playersDirectory: PropTypes.object.isRequired,
    getScheduleMatchesRequest: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
  }


  state = {
    playersDirectoryData: [],
    selectedValue: "name",
    visible: false,
    isDatePickerVisible: false,

    //SCHEDULING DATA...
    mainCourse: {
      courseName: "",
      courseId: -1
    },
    playerTees: [],
    matchDate: "",

    //send scheduling
    postingData: false
  };

  //SCHEDULING DATA...
  payload = {};
  courses = [];
  playersDirectoryData = [];
  selectTeesId = [];

  componentWillMount() {
    this.props.setSelectedTab(-1);

    //GET PLAYER DATA W.R.T MATCH..
    this._retrieveData();
  }

  _renderUserProfile() {
  }



  render() {

    return (

      <View style={{ ...styles.container }}>
        <CustomNavbar
          title="Edit Match"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />

        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          date={this.state.matchDate ? new Date(this.state.matchDate) : new Date()}
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
        />

        {this.state.playersDirectoryData.length === 0 ?
          <SimpleLoader /> : this.getEditMatchView()
        }

        {this._renderUserProfile()}
      </View>
    );
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = (date) => {
    this.setState({
      isDatePickerVisible: false,
      matchDate: moment(date).format('YYYY-MM-DD')
    });
  };

  handleConfirm = (date) => {
    this.hideDatePicker(date);
  };

  getEditMatchView() {

    console.log("player-data", Object.keys(this.state.playersDirectoryData.players).length)

    let mainDropDownPicker = this.courses.map((item) => {
      return ({
        label: item.name,
        value: item.id
      })
    })

    console.log("main_data", this.state.mainCourse.courseName)

    this.selectTeesId = [];

    return (
      <View>
        <View style={{ zIndex: 2, width: '90%', marginTop: 20, alignSelf: 'center' }}>

          <View style={{ backgroundColor: '#06623B', opacity: 0.11, width: '100%', height: '100%', borderRadius: 10, position: 'absolute' }} />

          <View style={{ zIndex: 2, flexDirection: 'row', marginBottom: 10, margin: 20, alignItems: 'center' }}>
            <Text style={{ ...styles.innerText, flex: 2 }}>Course</Text>
            <DropDownPicker
              items={mainDropDownPicker}
              placeholder={this.state.mainCourse.courseName}
              //defaultValue={}
              containerStyle={{ height: 40, borderColor: 'red' }}
              style={{
                backgroundColor: 'white', width: 230, zIndex: 1,
                borderTopLeftRadius: 10, borderTopRightRadius: 10,
                borderBottomLeftRadius: 10, borderBottomRightRadius: 10
              }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: 'white' }}
              onChangeItem={item => {
                this.setCoursesWithPlayers(this.state.playersDirectoryData, true, item.label)
              }}
              labelStyle={{
                ...styles.innerText,
                fontSize: 16,
                fontWeight:'500'
              }}
            />
          </View>
          <View style={{ zIndex: 1, flexDirection: 'row', marginLeft: 20, marginRight: 20, marginBottom: 20, alignItems: 'center' }}>
            <Text style={{ ...styles.innerText, flex: 2 }}>Date</Text>
            <View
              style={{
                width: 230, zIndex: 1,
                height: 38, backgroundColor: 'white',
                borderRadius: 10, justifyContent: 'center'
              }}
            >
              <TouchableOpacity onPress={() => this.showDatePicker()}>
                <Text style={{
                  ...styles.innerText, textAlign: 'center',
                  padding: 10,
                  fontWeight:'100'
                }}>{this.state.matchDate}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {/*  next view */}

        <View style={{
          width: '90%', zIndex: 1,

          marginTop: 10, borderRadius: 10, alignSelf: 'center'
        }}>
          <View style={{
            backgroundColor: '#06623B', opacity: 0.11, width: '100%', height: '100%',
            borderRadius: 10, position: 'absolute'
          }} />

          {
            this.getPlayerView()
          }
        </View>
        {/*  next view */}
        <TouchableHighlight
          onPress={() => {

            if (!this.state.matchDate) {
              alert("Please select date for proceeding.")
              return;
            }

            this.setState({ postingData: true })
            this.saveScheduling()
          }}
          style={{
            alignSelf: 'center', zIndex: 1,
            width: '50%', height: 45, padding: 10, backgroundColor: '#06623B', borderRadius: 10, margin: 20, alignItems: 'center'
          }}>
          <Text style={{ ...styles.innerText, flex: 7, color: 'white' }}>Confirm</Text>
        </TouchableHighlight>


        <ActivityIndicator
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            top: Dimensions.get("window").height / 3,
            left: 0,
            right: 0,
          }}
          animating={this.state.postingData}
          size="large"
        />

      </View>)
  }

  saveScheduling() {

    let players = [];
    this.state.playersDirectoryData.players.map((item, index) => {
      players.push({
        "player_name": item.player_name,
        "player_tee_id": this.state.playerTees[index].value,
        "player_id": item.player_id
      });
    });

    console.log("params -playerdata-->", players)

    const { schedule_id, match_id, type } = this.props.data;

    const AuthStr = util.getCurrentUserAccessToken();
    console.log("send Data authentication key = >" + AuthStr);
    URL = BASE_URL + 'save_Schdule_Player';

    var data = this.state.matchDate ? {

      "match_date": this.state.matchDate,
      "course_id": this.state.mainCourse.courseId,
      "schedule_id": schedule_id,
      "match_id": match_id,
      "type": type === "lmp" ? "smp" : type,
      players

    } : {

      "course_id": this.state.mainCourse.courseId,
      "schedule_id": schedule_id,
      "match_id": match_id,
      "type": type === "lmp" ? "smp" : type,
      players
    }

    console.log("data-------->", data);

    axios.post(URL,
      { data },

      { headers: { Authorization: AuthStr, "Content-Type": "application/json", } }).then((response) => {

        if (response.status === 200)
          alert("Saved Successfully")

        this.props.getLivedataRequest();
        this.setState({ postingData: false })
        this.props.navigation.pop();
      })
      .catch(function (error) {
        this.setState({ postingData: false })
        alert(error);
      });



  }


  getPlayerView() {
    return this.state.playersDirectoryData.players.map((item, index) => {

      return (
        <View style={{
          zIndex: Object.keys(this.state.playersDirectoryData.players).length - index
        }}>
          <View style={{ flexDirection: 'row', marginBottom: 10, margin: 20, alignItems: 'center' }}>
            <View
              style={{
                width: '58%', backgroundColor: 'white', height: 38,
                borderRadius: 10, marginRight: 10, justifyContent: 'center'
              }}
            >
              <Text style={{
                ...styles.innerText, textAlign: 'center'
              }}>{item.player_name}</Text>
            </View>
            <DropDownPicker
              items={this.courseTees}
              placeholder={this.state.playerTees.length>0?this.state.playerTees[index].label:""}
              defaultValue={this.state.playerTees.length > 0?this.state.playerTees[index].value:""}
              containerStyle={{ height: 40, borderColor: 'red' }}
              style={{
                backgroundColor: 'white', width: 130, zIndex: 1,
                borderTopLeftRadius: 10, borderTopRightRadius: 10,
                borderBottomLeftRadius: 10, borderBottomRightRadius: 10
              }}
              itemStyle={{
                justifyContent: 'flex-start', fontWeight: 'bold'
              }}
              dropDownStyle={{ backgroundColor: 'white' }}
              onChangeItem={item => {

                let tmpPlayerTees = this.state.playerTees;
                tmpPlayerTees[index].label = item.label;
                tmpPlayerTees[index].value = item.value;

                this.setState({
                  playerTees: tmpPlayerTees
                })

              }
              }
              value={this.state.playerTees.length > 0?this.state.playerTees[index].value:""}
              labelStyle={{
                ...styles.innerText,
                fontSize: 16,
                fontWeight:'500'
              }}
            />
          </View>
        </View>

      )
    }
    )
  }

  //////////////////////////////////   SCHEDULING MATCH ///////////////////////////////////

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {

        let jsonUserData = JSON.parse(value);
        const { schedule_id, match_id, type } = this.props.data;
        this.payload = {
          schedule_id,
          match_id,
          type,
          user_id: jsonUserData.id,
        };
        this.props.getScheduleMatchesRequest(this.payload, data => {

          //FIRST TIME TO PUT ALL COURSE DATA...
          this.courses = data.data[0].data.courses;

          this.setCoursesWithPlayers(data.data[0].data, false, data.data[0].course_id)


        });
      }
    } catch (error) {
      // Error retrieving data
      console.log("error---->", error);
    }
  };

  setCoursesWithPlayers(schedulingData, isByPass, courseId) {

    let mainCourseData = this.setMainCourseTees(courseId);

    let tmpPlayerTees = this.getPlayerTees(schedulingData.players, isByPass);

    console.log("playerTess-->", tmpPlayerTees);

    this.setState({
      playersDirectoryData: schedulingData,
      mainCourse: {
        courseName: mainCourseData[0].name,
        courseId: mainCourseData[0].id
      },
      playerTees: tmpPlayerTees,
      matchDate: this.props.data.match_date ? (this.state.matchDate.length === 0 ? this.props.data.match_date : this.state.matchDate) : ""

    });

  }


  getPlayerTees(data, isByPassTees) {

    let tmpTees = [];
    for (let outer of data) {

      for (let inner of this.courseTees) {
        if (!isByPassTees && inner.value === outer.player_tee_id) {
          tmpTees.push({
            label: inner.label,
            value: inner.value
          })
        } else if (isByPassTees) {
          tmpTees.push({
            label: inner.label,
            value: inner.value
          })
          break
        }

      }
    }

    return tmpTees;
  }

  setMainCourseTees(courseId) {


    let chooseValue = !courseId ? this.props.data.venue : courseId;

    console.log("courseId--->", chooseValue)
    console.log("courses--->", this.courses)

    //FILTER COURSE TEES W.R.T SELECTED TEES
    let filterCourse = this.courses.filter((value) => {
      return (value.id === chooseValue || value.name === chooseValue)
    })

    console.log("filter course", filterCourse)

    //FILTER TEES W.R.T FILTER MAIN COURSE....
    this.courseTees = [];
    this.courseTees = filterCourse[0].tees.map((item, index) => {
      return ({
        label: item.name,
        value: item.id
      })
    })

    console.log("course tees", this.courseTees)

    return filterCourse;
  }

}

//&& <SimpleLoader />
const mapStateToProps = ({ liveMatches }) => ({
  liveMatches
});

const actions = { setSelectedTab, getScheduleMatchesRequest, getLivedataRequest };

export default connect(
  mapStateToProps,
  actions
)(EditMatch);



