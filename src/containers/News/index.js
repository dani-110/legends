// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import { CustomNavbar } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";
import Util from "../../util";
import NewsItem from "./NewsItem";

class News extends Component {
  static propTypes = {
    newsData: PropTypes.array.isRequired
  };

  static defaultProps = {};

  _renderNews = newsData => (
    <FlatList
      data={newsData}
      renderItem={this._renderItem}
      keyExtractor={Util.keyExtractor}
    />
  );

  _renderItem = ({ item }) => <NewsItem data={item} />;

  render() {
    const { newsData } = this.props;
    return (
      <View style={styles.container}>
        <CustomNavbar
          title="Latest News"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        {this._renderNews(newsData)}
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
)(News);
