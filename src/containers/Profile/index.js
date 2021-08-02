// @flow
import _ from "lodash";
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  View, ImageBackground,
  Image as RNImage,
  ScrollView,
  ActivityIndicator, FlatList, TouchableOpacity, Alert
} from "react-native";
import { Actions } from "react-native-router-flux";
import { setSelectedTab } from "../../actions/GeneralActions";
import BottomSheet from "react-native-bottomsheet";
import PropTypes from "prop-types";
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
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
import { Images, AppStyles, Colors, Fonts } from "../../theme";
import Scores from "../Dashboard/Scores";
import Util from "../../util";
import GrossScoresTrend from "./GrossScoresTrend";
import PotyLeaderboardDB from "../Dashboard/PotyLeaderboardDB";
import { Dimensions } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { App } from "react-native-firebase";

const options = [
  { label: "About", value: "1" },
  { label: "HCP", value: "2" },
  { label: "Stats", value: "3" }
];

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
      uploadingImage: false,
      visibility: false,
      categotyOptions: '1'
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

  setVisibleDialog = (status) => {
    this.setState({
      visibility: status
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
        this.props.getUserProfileRequest();
      } else {
        // error
        this.setImage(this.props.userData.user_info[0]);
      }
    });
  };

  _renderUserProfile() {
    const { userData } = this.props;
    console.log("userData-->", userData.user_info[0].name)
    return (
      this.state.categotyOptions === '1' ?
        <View style={{
          flex: 1, alignContent: 'center', marginStart: 25
          , marginEnd: 25
        }}>
          <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', backgroundColor: Colors.background.secondary, borderRadius: 10, height: 70 }}>
            <View style={{ paddingStart: 20, justifyContent: 'center', width: '88%', height: '100%' }}>

              <Text style={{ fontFamily: Fonts.type.base, fontSize: 18 }} color={Colors.grey}>
                Email
              </Text>
              <Text style={{ fontFamily: Fonts.type.base, fontSize: 18 }} color={Colors.black}>
                test@abc.com
              </Text>
            </View>
            <RNImage
              style={{ alignSelf: 'center' }}
              source={Images.phone_icon}
            />
          </View>

          <View style={{ marginTop: 15, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', backgroundColor: Colors.background.secondary, borderRadius: 10, height: 70 }}>
            <View style={{ paddingStart: 20, justifyContent: 'center', width: '88%', height: '100%' }}>

              <Text style={{ fontFamily: Fonts.type.base, fontSize: 18 }} color={Colors.grey}>
                Mobile
              </Text>
              <Text style={{ fontFamily: Fonts.type.base, fontSize: 18 }} color={Colors.black}>
                123090
              </Text>
            </View>
            <RNImage
              style={{ alignSelf: 'center' }}
              source={Images.phone_icon}
            />
          </View>

          <View style={{ marginTop: 15, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', backgroundColor: Colors.background.secondary, borderRadius: 10, height: 70 }}>
            <View style={{ paddingStart: 20, justifyContent: 'center', width: '88%', height: '100%' }}>

              <Text style={{ fontFamily: Fonts.type.base, fontSize: 18 }} color={Colors.grey}>
                Default TEE
              </Text>
              <Text style={{ fontFamily: Fonts.type.base, fontSize: 18 }} color={Colors.black}>
                white
              </Text>
            </View>
            <RNImage
              style={{ alignSelf: 'center' }}
              source={Images.phone_icon}
            />
          </View>

          <View style={{ marginTop: 15, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', backgroundColor: Colors.background.secondary, borderRadius: 10, height: 70 }}>
            <View style={{ paddingStart: 20, justifyContent: 'center', width: '88%', height: '100%' }}>

              <Text style={{ fontFamily: Fonts.type.base, fontSize: 18 }} color={Colors.grey}>
                Designation
              </Text>
              <Text style={{ fontFamily: Fonts.type.base, fontSize: 18 }} color={Colors.black}>
                Founder & CEO
              </Text>
            </View>
            <RNImage
              style={{ alignSelf: 'center' }}
              source={Images.phone_icon}
            />
          </View>

          <View style={{ marginTop: 15, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', backgroundColor: Colors.background.secondary, borderRadius: 10, height: 70 }}>
            <View style={{ paddingStart: 20, justifyContent: 'center', width: '88%', height: '100%' }}>

              <Text style={{ fontFamily: Fonts.type.base, fontSize: 18 }} color={Colors.grey}>
                Company
              </Text>
              <Text style={{ fontFamily: Fonts.type.base, fontSize: 18 }} color={Colors.black}>
                Founder & CEO
              </Text>
            </View>
            <RNImage
              style={{ alignSelf: 'center' }}
              source={Images.phone_icon}
            />
          </View>

          <View style={{ marginTop: 15, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', backgroundColor: Colors.background.secondary, borderRadius: 10, height: 70 }}>
            <View style={{ paddingStart: 20, justifyContent: 'center', width: '88%', height: '100%' }}>

              <Text style={{ fontFamily: Fonts.type.base, fontSize: 18 }} color={Colors.grey}>
                Website
              </Text>
              <Text style={{ fontFamily: Fonts.type.base, fontSize: 18 }} color={Colors.black}>
                Founder & CEO
              </Text>
            </View>
            <RNImage
              style={{ alignSelf: 'center' }}
              source={Images.phone_icon}
            />
          </View>


        </View> : null

    );
  }
  _renderHeader() {
    const { userData } = this.props;
    return (
      this.state.categotyOptions === '2' ?
        <View style={{ flex: 1, alignSelf: 'center', alignContent: 'center' }}>

          <View style={{
            flexDirection: 'row', backgroundColor: '#1740B4',
            borderRadius: 10, height: 50, alignItems: 'center', padding: 15
          }}>
            <Text style={{
              alignItems: 'center', fontSize: 18, color: Colors.white, flex: 5
            }}>HCP Index</Text>

            <Text style={{
              alignItems: 'center', fontSize: 18, color: Colors.white, flex: 5, textAlign: 'center'
            }}>13.3</Text>
          </View>

          <View style={{
            flexDirection: 'row', backgroundColor: Colors.background.secondary, marginTop: 10,
            borderRadius: 10, height: 50, alignItems: 'center', padding: 15, justifyContent: 'center'
          }}>
            <Text style={{
              alignItems: 'center', fontSize: 18, color: Colors.grey5, flex: 5
            }}>Playing HCP</Text>

            <View style={{ marginTop: 3, width: 10, height: 10, borderRadius: 5, borderColor: '#1740B4', backgroundColor: 'white', borderWidth: 2 }} />

            <Text style={{
              marginStart: 10,
              alignItems: 'center', fontSize: 18, color: Colors.grey5, textAlign: 'center'
            }}>15</Text>
            <View style={{
              marginTop: 3, marginStart: 10,
              width: 10, height: 10, borderRadius: 5, borderColor: '#D4D4D4', backgroundColor: Colors.white, borderWidth: 2
            }} />

            <Text style={{
              flex: 1, marginStart: 0,

              alignItems: 'center', fontSize: 18, color: Colors.grey5, textAlign: 'center'
            }}>13</Text>
            <View style={{
              marginTop: 3, marginStart: 0,
              width: 10, height: 10, borderRadius: 5, borderColor: Colors.yellow, backgroundColor: 'white', borderWidth: 2
            }} />

            <Text style={{
              flex: 1, marginStart: 0,

              alignItems: 'center', fontSize: 18, color: Colors.grey5, textAlign: 'center'
            }}>11</Text>
          </View>


          <View style={{
            ...styles.RectangleShapeView, height: 320, flex: 1, alignSelf: 'center',
            alignContent: 'center', marginTop: 15
          }}>
            <Text style={styles.headerText}>LAST 20 ROUNDS  </Text>
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
              renderItem={({ item, index }) => {
                console.log("data is-->", item)
                return (
                  <TouchableOpacity onPress={() => { this.setVisibleDialog(true) }}>
                    <View style={[AppStyles.flexRow, { justifyContent: 'space-around' }]} >
                      <Text type="bold" color={Colors.text.secondary}>
                        {index + 1}
                      </Text>
                      {
                        item.is_selected === true ? (
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
                        )
                      }

                      <Text type="bold" style={{ width: 90, }} color={Colors.text.secondary}>
                        {item.match_date}
                      </Text>

                    </View>
                  </TouchableOpacity>
                )
              }
              }
              ///{this._renderItem}
              keyExtractor={Util.keyExtractor}
            />
          </View>
        </View >
        : null

    );
  }
  _renderUserDetails({ name, picture }, imageUri, uploadingImage) {
    return (
      <View style={{ ...styles.userDetailsWrapper, borderBottomWidth: 0 }}>

        <View style={{ position: "absolute", flex: 1, }}>
          <RNImage
            style={{ height: '100%', width: '106%', aspectRatio: 1, top: -200, }}
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

          {uploadingImage && (
            <View style={{ ...styles.imageLoadingWrapper, borderRadius: 200 }}>
              <ActivityIndicator color={Colors.kgDarkGreen} />
            </View>
          )}
          <ButtonView
            style={styles.editProfileWrapper}
            onPress={this._onEditImagePress}
          >
            <RNImage source={Images.edit_icon} style={styles.editProfile} />
          </ButtonView>

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

  _renderCategoryTabs() {
    return (
      <View style={{
        ...styles.userDetailsWrapper, borderBottomWidth: 0, marginStart: 20
        , marginEnd: 20, marginBottom: 0
      }}>

        <SwitchSelector
          initial={0}
          onPress={value => this.setState({ categotyOptions: value })}
          buttonColor='#292F45'
          hasPadding
          style={{ alignItems: 'flex-start', marginBottom: 15 }}
          selectedTextStyle={{
            fontSize: 16
          }}
          textStyle={{
            fontSize: 16,
          }}
          options={options}
          testID="gender-switch-selector"
          accessibilityLabel="gender-switch-selector"
        />


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
      <TouchableOpacity onPress={() => { this.setVisibleDialog(true) }}>
        <View style={[AppStyles.flexRow, { justifyContent: 'space-around' }]} >
          <Text type="bold" color={Colors.text.secondary}>
            {index + 1}
          </Text>
          {
            item.is_selected === true ? (
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
            )
          }

          <Text type="bold" style={{ width: 90, }} color={Colors.text.secondary}>
            {item.match_date}
          </Text>

        </View>
      </TouchableOpacity>
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

  renderGraph() {
    const { activeTabIndex } = this.state

    if (activeTabIndex === 0)
      return (
        <GrossScoresTrend activeGraph="handicap" user={this.props.userData} />
      )


    else if (activeTabIndex === 1)
      return (
        <GrossScoresTrend activeGraph="fir" user={this.props.userData} />
      )


    else if (activeTabIndex === 2)
      return (
        <GrossScoresTrend activeGraph="gir" user={this.props.userData} />
      )

    else if (activeTabIndex === 3)
      return (
        <GrossScoresTrend activeGraph="putts" user={this.props.userData} />
      )

  }

  getStats() {
    return (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
      <View>

        <View style={{
          borderRadius: 10, backgroundColor: Colors.greenTint
        }}>
          <Text style={{
            paddingStart: 15, paddingEnd: 15, textAlign: 'center',
            fontSize: 16, fontFamily: Fonts.type.bold, color: Colors.green
          }}>FIR</Text>
        </View>
        <Text style={{
          paddingStart: 15, paddingEnd: 15,
          fontSize: 20, fontFamily: Fonts.type.bold, color: Colors.black
        }}>30.5</Text>
      </View>

      <View style={{ marginStart: 30 }}>

        <View style={{
          borderRadius: 10, backgroundColor: Colors.greenTint
        }}>
          <Text style={{
            paddingStart: 15, paddingEnd: 15, textAlign: 'center',
            fontSize: 16, fontFamily: Fonts.type.bold, color: Colors.green
          }}>GIR</Text>
        </View>
        <Text style={{
          paddingStart: 15, paddingEnd: 15,
          fontSize: 20, fontFamily: Fonts.type.bold, color: Colors.black
        }}>30.5</Text>
      </View>

      <View style={{ marginStart: 30 }}>

        <View style={{
          borderRadius: 10, backgroundColor: Colors.greenTint
        }}>
          <Text style={{
            paddingStart: 15, paddingEnd: 15, textAlign: 'center',
            fontSize: 16, fontFamily: Fonts.type.bold, color: Colors.green
          }}>PPR</Text>
        </View>
        <Text style={{
          paddingStart: 15, paddingEnd: 15,
          fontSize: 20, fontFamily: Fonts.type.bold, color: Colors.black
        }}>30.5</Text>
      </View>
      <View style={{ marginStart: 30 }}>

        <View style={{
          borderRadius: 10, backgroundColor: Colors.greenTint
        }}>
          <Text style={{
            paddingStart: 15, paddingEnd: 15, textAlign: 'center',
            fontSize: 16, fontFamily: Fonts.type.bold, color: Colors.green
          }}>Win%</Text>
        </View>
        <Text style={{
          paddingStart: 15, paddingEnd: 15,
          fontSize: 20, fontFamily: Fonts.type.bold, color: Colors.black
        }}>30.5</Text>
      </View>
    </View>
    );
  }

  render() {

    const { activeTabIndex, imageUri, uploadingImage, visibility } = this.state;
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
              {
                this._renderCategoryTabs()
              }
              {this._renderUserProfile()}

              {this._renderHeader()}
              {/* {this.state.categotyOptions === 1
                && this._renderUserProfile()
              } */}
              {/* {this._renderHeader()} */}
              {/* {this._renderScores()}
            {this._renderLatestScorecardButton()} */}

              {this.state.categotyOptions === '3' ? this.getStats() : null}
              {this.state.categotyOptions === '3' ? this._renderTabsHeader() : null}
              {this.state.categotyOptions === '3' ? this.renderGraph() : null}
            </ScrollView>
          </View>
        )}


        <Dialog
          height='30%'
          width={Dimensions.get('window').width * .8}
          visible={this.state.visibility}
          onTouchOutside={() => {
            this.setState({ visibility: false });
          }}
        >
          {/* DialogContent start */}
          <DialogContent
            style={{ flex: 1, alignItems: 'center' }}
          >
            <View style={{ margin: 40, width: '100%', alignItems: 'flex-start', height: '100%' }}>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginStart: 20, marginBottom: 20, width: '100%', flexDirection: 'row' }}>
                <Text color={Colors.black} style={{ fontSize: 25, flex: 6 }}>
                  Round Info
                </Text>

                <ImageBackground style={{ width: 30, height: 30, alignSelf: 'flex-end', alignItems: 'flex-start', marginEnd: 30, marginBottom: 5 }} resizeMode="contain"
                  source={Images.scoreCardBlackWithBg} />
              </View>
              <Text style={{ color: Colors.grey3, marginLeft: 20 }}>
                Season
              </Text>
              <Text style={{ color: 'black', marginLeft: 20, marginBottom: 10 }} color={Colors.black}>
                Player of the year
              </Text>
              <Text style={{ color: Colors.grey3, marginLeft: 20 }}>
                Event
              </Text>
              <Text style={{ color: 'black', marginLeft: 20, marginBottom: 10 }} color={Colors.black}>
                Player of the year
              </Text>
              <Text style={{ color: Colors.grey3, marginLeft: 20 }}>
                Date
              </Text>
              <Text style={{ color: 'black', marginLeft: 20, marginBottom: 10 }} color={Colors.black}>
                Player of the year
              </Text>
            </View>

          </DialogContent>
        </Dialog>

      </View >

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
