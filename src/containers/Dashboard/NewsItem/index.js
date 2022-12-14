// @flow
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { View, Image as RNImage } from "react-native";
import { Actions } from "react-native-router-flux";
import { getNewsRequest } from "../../../actions/NewsActions";
import {
  Text,
  ButtonView,
  Image,
  SimpleLoader,
  EmptyStateText
} from "../../../components";
import styles from "./styles";
import { AppStyles, Colors, Images, Fonts } from "../../../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

class NewsItem extends React.Component {
  static propTypes = {
    newsData: PropTypes.array.isRequired,
    isFetchingNews: PropTypes.bool.isRequired,
    getNewsRequest: PropTypes.func.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    this.props.getNewsRequest();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.refresh) {
      props.refreshUpdate(false)
      props.getNewsRequest();
    }
  }

  renderItem(data) {
    return (
      <View
        style={[
          AppStyles.borderGrey,
          AppStyles.mTop15,
          AppStyles.flexRow,
          styles.innerWrapper
        ]}
      >
        {data.picture && (
          <TouchableOpacity onPress={() => Actions.news()}>
            <Image
              source={{ uri: data.picture }}
              resizeMode="cover"
              style={styles.image}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={{ ...AppStyles.basePadding, ...AppStyles.flex }} onPress={() => Actions.news()}>
          <View >
            <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
              <RNImage source={Images.clock} />

              <Text
                type="bold"
                color={Colors.green}
                style={[
                  AppStyles.alignItemsCenter,
                  { lineHeight: Fonts.size.normal }
                ]}
              >
                {` ${moment(data.date).fromNow()}`}
              </Text>
            </View>

            <Text
              type="bold"
              style={AppStyles.mTop10}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {data.title}
            </Text>
            <Text
              size="xSmall"
              color={Colors.grey3}
              style={AppStyles.mTop5}
              numberOfLines={2}
              type="bold"
            >
              {data.description}
            </Text>

            <ButtonView style={[AppStyles.mTop15]} >
              <Text
                type="bold"
                size="xSmall"
                color={Colors.green}
              >{`MORE NEWS >`}</Text>
            </ButtonView>
          </View>

        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { newsData, isFetchingNews } = this.props;

    return (

      <View style={[AppStyles.basePadding, AppStyles.pTop0, { marginTop: -30, marginBottom: -90, }]}>

        <Text type="bold" size="xLarge">
          Latest News
        </Text>
        {isFetchingNews && <SimpleLoader />}
        {newsData.length === 0 && !isFetchingNews && <EmptyStateText />}
        {newsData.length > 0 && this.renderItem(newsData[0])}
      </View>
    );
  }
}

const mapStateToProps = ({ news }) => ({
  newsData: news.data,
  isFetchingNews: news.isFetching
});

const actions = { getNewsRequest };

export default connect(
  mapStateToProps,
  actions
)(NewsItem);
