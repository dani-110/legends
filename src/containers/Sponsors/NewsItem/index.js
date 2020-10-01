// @flow
import React from "react";
import moment from "moment";
import { View, Image as RNImage } from "react-native";
import PropTypes from "prop-types";
import { Text, Image } from "../../../components";
import styles from "./styles";
import { AppStyles, Colors, Images, Fonts } from "../../../theme";
import { BASE_URL } from "../../../config/WebService";

export default class NewsItem extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {

    const { data } = this.props;
    return (
      <View style={[AppStyles.basePadding, AppStyles.flex]}>
        <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
          <RNImage source={Images.clock} />
          <Text
            type="bold"
            color={Colors.lightGreen}
            style={[
              AppStyles.alignItemsCenter,
              { lineHeight: Fonts.size.normal }
            ]}
          >
            {` ${moment(data.date).fromNow()}`}
          </Text>
        </View>
        <Text style={AppStyles.mTop10}>
          <Text type="bold" color={Colors.black2}>
            {data.name}
          </Text>
          <Text
            size="small"
            color={Colors.grey}
          >{`  ${data.title}`}</Text>
        </Text>
        <View style={[styles.imageContainer, AppStyles.mTop15, { height: 220, backgroundColor: Colors.white }]} >

          {
            data.picture && (

              <RNImage source={{ uri: data.picture }} style={{ width: "100%", height: 220, }} resizeMode="contain" />
            )
          }
        </View>
      </View>
    );
  }
}
