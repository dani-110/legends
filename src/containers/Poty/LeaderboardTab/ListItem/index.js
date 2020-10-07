// @flow
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text, Image } from "../../../../components";
import styles from "./styles";
import { AppStyles, Colors } from "../../../../theme";

export default class ListItem extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  static defaultProps = {};

  render() {
    const { data } = this.props;

    return (
      <View style={styles.listHeaderWrapper}>
        <Text style={{ width: 70, paddingLeft: 15 }}>
          {data.rank}
        </Text>
        <Text type="base" style={{ ...AppStyles.flex, ...styles.Title, ...AppStyles.mLeft15 }} textAlign="left">
          {data.name}
        </Text>

        <Text type="base" style={{ width: 90, paddingLeft: 20 }} >
          {data.events}
        </Text>
        <Text type="base" style={{ width: 60, }}>
          {data.points}
        </Text>
      </View >
      // <View
      //   style={[AppStyles.flexRow, AppStyles.padding15, AppStyles.centerInner]}
      // >
      //   <View
      //     style={[
      //       AppStyles.flexRow,
      //       AppStyles.alignItemsCenter, { justifyContent: 'center', width: 40 }
      //     ]}
      //   >
      //     <Text
      //       style={{ ...styles.innerText }}
      //     >
      //       {data.rank}
      //     </Text>
      //   </View>
      //   <View
      //     style={[
      //       AppStyles.flex,
      //       AppStyles.flexRow,
      //       AppStyles.alignItemsCenter, { justifyContent: 'center', }
      //     ]}
      //   >
      //     <Text
      //       style={{ ...AppStyles.capitalize, ...styles.innerText }}
      //     >
      //       {data.name}
      //     </Text>
      //   </View>
      //   <View
      //     style={[

      //       AppStyles.flexRow,
      //       AppStyles.alignItemsCenter, { justifyContent: 'flex-start', width: 70, marginRight: 5 }
      //     ]}
      //   >
      //     <Text

      //       style={{ ...styles.innerText, }}
      //     >
      //       {data.events}
      //     </Text>
      //   </View>
      //   <Text
      //     style={{ width: 60, ...styles.innerText }}
      //   >
      //     {data.points}
      //   </Text>
      // </View >
    );
  }
}
