// @flow
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { View, Image } from "react-native";
import { Text, ButtonView } from "../../../components";
import styles from "./styles";
import { AppStyles, Colors, Images } from "../../../theme";

class NewsItem extends React.Component {
  static propTypes = {
    newsData: PropTypes.array.isRequired
  };

  static defaultProps = {};

  render() {
    const { newsData } = this.props;
    const data = newsData[0];
    return (
      <View style={[AppStyles.basePadding, AppStyles.pTop0]}>
        <Text type="bold" size="xLarge">
          Latest News
        </Text>
        <View
          style={[AppStyles.borderGrey, AppStyles.mTop15, AppStyles.flexRow]}
        >
          <Image source={{ uri: data.image }} style={styles.image} />
          <View style={[AppStyles.basePadding, AppStyles.flex]}>
            <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
              <Image source={Images.clock} />

              <Text
                type="bold"
                color={Colors.green}
                style={[AppStyles.alignItemsCenter]}
              >
                {` ${moment(data.date).fromNow()}`}
              </Text>
            </View>

            <Text type="bold" style={AppStyles.mTop10}>
              {data.title}
            </Text>
            <Text
              size="xSmall"
              color={Colors.grey3}
              style={AppStyles.mTop5}
              numberOfLines={2}
              type="bold"
            >
              {data.desc}
            </Text>

            <ButtonView style={[AppStyles.mTop15]}>
              <Text
                type="bold"
                size="xSmall"
                color={Colors.green}
              >{`MORE NEWS >`}</Text>
            </ButtonView>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ news }) => ({
  newsData: news.data
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(NewsItem);
