// @flow
import { connect } from "react-redux";
import React from "react";
import { View, FlatList, Alert } from "react-native";
import PropTypes from "prop-types";
import { Text, EmptyStateText, SimpleLoader } from "../../../components";
import ListItem from "./ListItem";
import { getPotyTournamentRequest } from "../../../actions/TournamentActions";
import styles from "./styles";
import { AppStyles } from "../../../theme";
import Util from "../../../util";

class TournamentsTab extends React.Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  updateInputValue(id) {
    //this.props.tournamentsData = this.props.tournamentsData.map(e => ((e.tournament_id === id) ? { ...e, ...{ name: "20" } } : e));
    Util.showLoader(this);
    this.props.getPotyTournamentRequest("", data => {
      Util.hideLoader(this);
    });
  }

  static propTypes = {
    tournamentsData: PropTypes.array.isRequired,
    getPotyTournamentRequest: PropTypes.func.isRequired
  };

  static defaultProps = {};

  state = {
    loading: false
  };

  componentWillMount() {
    Util.showLoader(this);
    this.props.getPotyTournamentRequest("", data => {
      Util.hideLoader(this);
    });
  }

  _renderHeader() {
    return (
      <View style={AppStyles.listHeaderWrapper}>
        <Text type="bold" style={{ ...AppStyles.flex, }}>
          Event Name
        </Text>
        <Text type="bold" style={{ width: 170 }} textAlign="center">
          Date
        </Text>
        <Text type="bold" style={{ width: 85 }} textAlign="center">
          State
        </Text>
      </View>
    );
  }


  _renderItem({ item }) {
    return <ListItem data={item} updateInputValue={(e) => this.updateInputValue(e)} />;
  }



  _renderListing(data) {
    return (
      <View style={AppStyles.flex}>
        <FlatList
          data={data}
          renderItem={this._renderItem}
          keyExtractor={Util.keyExtractor}
          ListHeaderComponent={this._renderHeader}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={() => <EmptyStateText />}
        />
      </View>
    );
  }

  render() {
    const { tournamentsData } = this.props;
    const { loading } = this.state;

    if (loading) return <SimpleLoader />;

    return (
      <View style={styles.container}>
        {this._renderListing(tournamentsData)}
      </View>
    );
  }
}
const mapStateToProps = ({ tournament }) => ({
  tournamentsData: tournament.poty.tournaments
});

const actions = { getPotyTournamentRequest };

export default connect(
  mapStateToProps,
  actions
)(TournamentsTab);
