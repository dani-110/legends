// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  View,
  Image as RNImage,
  ScrollView,
  ActivityIndicator
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
      image: "trend_icon",
      title: "Gross Scores Trend",
      onPress: () => Util.setSelectedTabIndex(this, 0)
    },
    {
      image: "trend_icon",
      title: "Trending Handicap",
      onPress: () => Util.setSelectedTabIndex(this, 1)
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
    return (
      <View style={[AppStyles.flexRow, AppStyles.pBottom5, AppStyles.mTop5, AppStyles.mLeft20]}>
        <Text style={AppStyles.flex} color={Colors.grey3}>
          Course
        </Text>
        <Text style={AppStyles.flex} color={Colors.grey3}>
          Score
        </Text>
        <Text style={{ width: 60 }} color={Colors.grey3}>
          Date
        </Text>
      </View>
    );
  }
  _renderUserDetails({ name, picture }, imageUri, uploadingImage) {
    return (
      <View style={styles.userDetailsWrapper}>
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
          style={[AppStyles.margin20]}
          size={20}
          type="bold"
          color={Colors.text.secondary}
        >
          {name}
        </Text>
      </View>
    );
  }

  _renderScores() {
    return <Scores showViewProfile={false} />;
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
      <View style={[AppStyles.marginVerticalBase]}>
        <TopTabs
          data={this.TABS_DATA}
          activeIndex={this.state.activeTabIndex}
          isRow={false}
        />
      </View>
    );
  }

  render() {
    const { activeTabIndex, imageUri, uploadingImage } = this.state;
    const { isFetchingProfile, userData } = this.props;

    return (
      <View style={[styles.container, AppStyles.flex]}>
        <CustomNavbar
          title=""
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />

        {isFetchingProfile && _.isEmpty(userData) && <SimpleLoader />}

        {!_.isEmpty(userData) && (
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
              <GrossScoresTrend activeGraph="grossScoreTrend" />
            )}
            {activeTabIndex === 1 && (
              <GrossScoresTrend activeGraph="trendingHandicap" />
            )}
          </ScrollView>
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
