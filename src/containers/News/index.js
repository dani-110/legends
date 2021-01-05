// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList, RefreshControl, ScrollView } from "react-native";
import { CustomNavbar, SimpleLoader, EmptyStateText } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";
import Util from "../../util";
import NewsItem from "./NewsItem";
import { AppStyles } from "../../theme";
import { getNewsRequest } from "./../../actions/NewsActions";


class News extends Component {
  static propTypes = {
    newsData: PropTypes.array.isRequired,
    isFetchingNews: PropTypes.bool.isRequired
  };
  state = {
    refreshing: false,
  }


  _onRefresh() {
    this.setState({
      refreshing: true,
    });
    this.props.getNewsRequest()
  }

  static getDerivedStateFromProps(props, state) {
    if (state.refreshing) {
      return { refreshing: false }
    }
  }

  static defaultProps = {};

  _renderNews = newsData => (
    <View style={[AppStyles.flex]}>
      <FlatList
        data={newsData}
        renderItem={this._renderItem}
        keyExtractor={Util.keyExtractor}
        ItemSeparatorComponent={() => (
          <View style={AppStyles.borderBottomGrey} />
        )}
      />
    </View>
  );

  _renderItem = ({ item }) => <NewsItem data={item} />;

  render() {
    const { newsData, isFetchingNews } = this.props;
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
        <CustomNavbar
          title="Latest News"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        {isFetchingNews && <SimpleLoader />}
        {newsData.length === 0 && !isFetchingNews && <EmptyStateText />}
        {!isFetchingNews && this._renderNews(newsData)}
      </ScrollView>
    );
  }
}

const mapStateToProps = (data) => {
  console.log(data);
  return ({
    newsData: data.news.data,
    isFetchingNews: data.news.isFetching
  });
}

const actions = { getNewsRequest };


export default connect(
  mapStateToProps,
  actions
)(News);
