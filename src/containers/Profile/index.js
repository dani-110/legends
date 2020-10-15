// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  View,
  Image as RNImage,
  ScrollView,
  ActivityIndicator, FlatList, TouchableOpacity, Alert
} from "react-native";
import { Actions } from "react-native-router-flux";
import { setSelectedTab } from "../../actions/GeneralActions";
import BottomSheet from "react-native-bottomsheet";
import PropTypes from "prop-types";
import {
  CustomNavbar,
  Image,
  Text,
  TopTabs,
  ButtonView,
  SimpleLoader
} from "../../components";
import MediaPicker from "../../services/MediaPicker";
import { NAVBAR_THEME } from "../../constants";
import {
  getUserProfileRequest,
  uploadUserImageRequest
} from "../../actions/UserActions";
import styles from "./styles";
import { Images, AppStyles, Colors } from "../../theme";
import Scores from "../Dashboard/Scores";
import Util from "../../util";
import GrossScoresTrend from "./GrossScoresTrend";
import PotyLeaderboardDB from "../Dashboard/PotyLeaderboardDB";

class Profile extends Component {
  static propTypes = {
    getUserProfileRequest: PropTypes.func.isRequired,
    isFetchingProfile: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired,
    uploadUserImageRequest: PropTypes.func.isRequired,
    setSelectedTab: PropTypes.func.isRequired
  };

  constructor(props) {

    super(props);
    this.state = {
      activeTabIndex: 0,
      imageUri: props.userData.user_info[0].picture,
      uploadingImage: false
    };
  }

  componentWillMount() {
    this.props.getUserProfileRequest();
    this.props.setSelectedTab(-1);
  }
  componentDidMount() {
    PotyLeaderboardDB.pauseInterval();
  }
  setImage = uri => {
    this.setState({
      imageUri: uri
    });
  };

  _onEditImagePress = () => {

    const options = ["Camera", "Gallery"];
    if (!Util.isPlatformAndroid()) options.push("Cancel");
    const cancelIndex = Util.isPlatformAndroid() ? -1 : options.length - 1;

    BottomSheet.showBottomSheetWithOptions(
      {
        options,
        title: "Select Image",
        cancelButtonIndex: cancelIndex
      },
      value => {
        if (value !== cancelIndex || Util.isPlatformAndroid()) {
          // handle actions here
          if (value === 0) {
            // Camera press
            MediaPicker.pickImageFromCamera(image => {
              console.log({ pickImageFromCamera: image });
              this._uploadUserImage(image);
            }, true);
          } else if (value === 1) {
            // gallery press

            MediaPicker.pickImageFromGallery(image => {
              console.log({ pickImageFromGallery: image });

              this._uploadUserImage(image);
            }, true);
          }
        }
      }
    );
  };

  TABS_DATA = [
    {
      title: "HCP",
      onPress: () => Util.setSelectedTabIndex(this, 0)
    },
    {
      title: "FIR",
      onPress: () => Util.setSelectedTabIndex(this, 1)
    },
    {
      title: "GIR ",
      onPress: () => Util.setSelectedTabIndex(this, 2)
    },
    {
      title: "PPR",
      onPress: () => Util.setSelectedTabIndex(this, 3)
    }
  ];

  _uploadUserImage = uri => {

    const imageFormData = new FormData();
    const photo = {
      uri,
      type: "image/jpeg",
      name: "myimage.jpg"
    };
    imageFormData.append("myimage", photo);
    this.setState({ uploadingImage: true });
    this.props.uploadUserImageRequest(imageFormData, newImageUrl => {
      this.setState({ uploadingImage: false });

      if (newImageUrl) {
        // success
        this.setImage(uri);
      } else {
        // error
        this.setImage(this.props.userData.user_info[0]);
      }
    });
  };
  _renderHeader() {
    const { userData } = this.props;
    return (
      <View style={{ ...styles.RectangleShapeView, flex: 1, alignSelf: 'center', alignContent: 'center' }}>
        <View>
          <Text style={styles.headerText}>MY ROUNDS</Text>
        </View>
        <View style={[AppStyles.flexRow, AppStyles.pBottom5, { justifyContent: 'space-around' }]}>
          <Text style={{ ...AppStyles.flex, marginLeft: 15, }} color={Colors.grey3}>
            Round #
        </Text>
          <Text style={AppStyles.flex} color={Colors.grey3}>
            Score
        </Text>
          <Text style={{ ...AppStyles.flex, marginLeft: 15, }} color={Colors.grey3}>
            Date
        </Text>
        </View>


        <FlatList
          nestedScrollEnabled={true}
          data={userData.grossss_table}
          renderItem={this._renderItem}
          keyExtractor={Util.keyExtractor}
        />

      </View>
    );
  }
  _renderUserDetails({ name, picture }, imageUri, uploadingImage) {
    return (
      <View style={{ ...styles.userDetailsWrapper, borderBottomWidth: 0 }}>

        <View style={{ position: "absolute", flex: 1, }}>
          <RNImage
            style={{ height: '100%', width: '105%', aspectRatio: 1, top: -200, }}
            source={Images.login_header_wrapper}
          />

        </View>
        <View style={{ width: '100%', }}>

          <CustomNavbar
            hasBorder={false}
            theme={NAVBAR_THEME.TRANSPERENT}
            titleAlign="center"
          />
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: imageUri }}
              resizeMode="cover"
              style={styles.userImage}
            />
          </View>
          <ButtonView
            style={styles.editProfileWrapper}
            onPress={this._onEditImagePress}
          >
            <RNImage source={Images.edit_icon} style={styles.editProfile} />
          </ButtonView>
          {uploadingImage && (
            <View style={styles.imageLoadingWrapper}>
              <ActivityIndicator color={Colors.kgDarkGreen} />
            </View>
          )}
        </View>
        <Text
          style={[AppStyles.margin20,]}
          size={20}
          type="bold"
          color={Colors.text.secondary}
        >
          {name}
        </Text>
      </View>
    );
  }
  backtoMain() {

  }
  _renderScores() {
    return <Scores showViewProfile={false} />;
  }

  _renderItem({ item, index }) {
    return (
      <View style={[AppStyles.flexRow, { justifyContent: 'space-around' }]}>
        <Text type="bold" color={Colors.text.secondary}>
          {index + 1}
        </Text>
        {item.is_selected === true ? (
          <View style={{ ...styles.innerCircle, borderColor: Colors.green }}>
            <Text type="bold" color={Colors.text.secondary}>
              {Math.trunc(item.adjusted_score)}
            </Text>
          </View>
        ) : (
            <View style={{ ...styles.innerCircle, borderColor: Colors.white }}>
              <Text type="bold" color={Colors.text.secondary}>
                {Math.trunc(item.adjusted_score)}
              </Text>
            </View>
          )}

        <Text type="bold" style={{ width: 90, }} color={Colors.text.secondary}>
          {item.match_date}
        </Text>

      </View>
    );
  }
  _renderLatestScorecardButton() {
    return (
      <View style={AppStyles.paddingHorizontalBase}>
        <ButtonView
          style={[
            styles.scoreCardButton,
            AppStyles.flexRow,
            AppStyles.centerInner
          ]}
          onPress={() =>
            Actions.dashboard_tab_scorecard({
              scoreCardData: Util.generateScoreCardData(
                {
                  course_name: this.props.userData.course_name,
                  holes: this.props.userData.holes,
                  scorecards: this.props.userData.latest_scorecard
                },
                this.props.userData.user_info[0].name
              )
            })
          }
        >
          <RNImage style={styles.calendarImage} source={Images.calendar} />
          <Text style={[AppStyles.mLeft10]} color={Colors.white}>
            View Latest ScoreCard
          </Text>
        </ButtonView>
      </View>
    );
  }

  _renderTabsHeader() {
    return (
      <View style={{ marginTop: 10, width: "90%", alignSelf: 'center', zIndex: 1 }}>
        <TopTabs
          data={this.TABS_DATA}
          activeIndex={this.state.activeTabIndex}
          isRow={false}
          isGraphData="graph"
        />
      </View>
    );
  }

  render() {
    debugger
    const { activeTabIndex, imageUri, uploadingImage } = this.state;
    const { isFetchingProfile, userData } = this.props;
    console.log(userData.grossss_table);
    return (
      <View style={[AppStyles.flex]}>

        {isFetchingProfile && _.isEmpty(userData) && <SimpleLoader />}

        {!_.isEmpty(userData) && (
          <View style={{ ...styles.containergraph }}>
            <ScrollView>
              {this._renderUserDetails(
                userData.user_info[0],
                imageUri,
                uploadingImage
              )}
              {this._renderHeader()}
              {/* {this._renderScores()}
            {this._renderLatestScorecardButton()} */}

              {this._renderTabsHeader()}

              {activeTabIndex === 0 && (
                <GrossScoresTrend activeGraph="handicap" user={this.props.userData} />
              )}
              {activeTabIndex === 1 && (
                <GrossScoresTrend activeGraph="fir" user={this.props.userData} />
              )}
              {activeTabIndex === 2 && (
                <GrossScoresTrend activeGraph="gir" user={this.props.userData} />
              )}
              {activeTabIndex === 3 && (
                <GrossScoresTrend activeGraph="putts" user={this.props.userData} />
              )}
            </ScrollView>
          </View>
        )}

      </View>

    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.profileData,
  isFetchingProfile: user.isFetchingProfileData
});
const actions = {
  getUserProfileRequest,
  uploadUserImageRequest,
  setSelectedTab
};

export default connect(
  mapStateToProps,
  actions
)(Profile);
