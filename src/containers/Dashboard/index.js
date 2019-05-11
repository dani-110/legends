// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { CustomNavbar } from "../../components";
import styles from "./styles";

class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomNavbar hasBack={false} />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
