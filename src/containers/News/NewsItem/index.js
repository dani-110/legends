// @flow
import React from "react";
import moment from "moment";
import { View, Image as RNImage } from "react-native";
import PropTypes from "prop-types";
import { Text, Image } from "../../../components";
import styles from "./styles";
import { AppStyles, Colors, Images } from "../../../theme";

export default class NewsItem extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { data } = this.props;
    return (
      <View style={AppStyles.borderBottomGrey}>
        <View style={[AppStyles.basePadding, AppStyles.flex]}>
          <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
            <RNImage source={Images.clock} />
            <Text
              type="bold"
              color={Colors.green}
              style={[AppStyles.alignItemsCenter]}
            >
              {` ${moment(data.date).fromNow()}`}
            </Text>
          </View>
          <Text style={AppStyles.mTop10}>
            <Text type="bold">{data.title}</Text>
            {`  ${data.desc}`}
          </Text>
          <View style={[styles.imageContainer, AppStyles.mTop15]}>
            <Image source={{ uri: data.image }} style={[styles.image]} />
          </View>
        </View>
      </View>
    );
  }
}
