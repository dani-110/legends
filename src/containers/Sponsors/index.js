// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import { CustomNavbar, SimpleLoader, EmptyStateText } from "../../components";
import { NAVBAR_THEME } from "../../constants";
import styles from "./styles";
import Util from "../../util";
import NewsItem from "./NewsItem";
import { AppStyles } from "../../theme";
import { getSponserRequest } from '../../actions/SponsorsAction';

class Sponsors extends Component {
  static propTypes = {
    newsData: PropTypes.array.isRequired,
    isFetchingNews: PropTypes.bool.isRequired
  };

  static defaultProps = {};
  componentDidMount() {
    this.props.getSponserRequest();
  }
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
      <View style={styles.container}>
        <CustomNavbar
          title="Sponsors"
          hasBorder={false}
          theme={NAVBAR_THEME.WHITE}
          titleAlign="center"
        />
        {isFetchingNews && <SimpleLoader />}
        {newsData.length === 0 && !isFetchingNews && <EmptyStateText />}
        {!isFetchingNews && this._renderNews(newsData)}
      </View>
    );
  }
}
const mapStateToProps = (e) => {
  console.log(e);
  return {
    newsData: e.sponsor.data,
    isFetchingNews: e.sponsor.isFetching
  };
}

const actions = { getSponserRequest };

export default connect(

  mapStateToProps,
  actions
)(Sponsors);
