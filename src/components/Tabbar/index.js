// @flow
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { setSelectedTab } from "../../actions/GeneralActions";
import { Text, ButtonView } from "../";
import styles from "./styles";
import { Images, Colors } from "../../theme";

const BUTTON_TYPES = {
  icon: "icon",
  textIcon: "textIcon"
};

const tabsData = [
  {
    name: "drawer",
    image: Images.drawer_black,
    selectedImage: Images.drawer_black,
    type: BUTTON_TYPES.icon,
    onPress: Actions.drawerOpen
  },
  {
    name: "home",
    image: Images.home_outline,
    selectedImage: Images.home_black,
    type: BUTTON_TYPES.icon,
    onPress: () => {
      Actions.jump("dashboard_tab");
    }
  },
  {
    name: "live",
    image: Images.live_outline,
    selectedImage: Images.live_black,
    type: BUTTON_TYPES.icon,
    onPress: () => {
      Actions.jump("live_tab");
    }
  },
  {
    name: "notifications",
    image: Images.notification_outline,
    selectedImage: Images.notification_black,
    type: BUTTON_TYPES.icon,
    onPress: () => {}
  },
  {
    name: "Join Game",
    image: Images.arrow_circle_green,
    selectedImage: Images.arrow_circle_green,
    disableImage: Images.arrow_circle_grey,
    type: BUTTON_TYPES.textIcon,
    onPress: () => {}
  }
];

class Tabbar extends React.PureComponent {
  static propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    setSelectedTab: PropTypes.func.isRequired
  };

  static defaultProps = {};

  renderSelectedBar() {
    return <View style={styles.selectedBar} />;
  }

  render() {
    const { selectedIndex } = this.props;
    // const selectedIndex = 4;
    return (
      <View style={styles.container}>
        {tabsData.map((element, index) => {
          if (element.type === BUTTON_TYPES.icon) {
            return (
              <ButtonView
                key={index}
                style={styles.itemWrapper}
                onPress={() => {
                  if (index !== 0) {
                    this.props.setSelectedTab(index);
                  }

                  element.onPress();
                }}
              >
                <View style={styles.btn1}>
                  <Image
                    source={
                      selectedIndex === index
                        ? element.selectedImage
                        : element.image
                    }
                  />
                </View>
                {selectedIndex === index && this.renderSelectedBar()}
              </ButtonView>
            );
          }

          return (
            <ButtonView
              key={index}
              style={styles.itemWrapper}
              onPress={element.onPress}
            >
              <View style={styles.btn2}>
                <Image
                  source={
                    selectedIndex === index
                      ? element.selectedImage
                      : element.image
                  }
                  style={styles.btn2Image}
                />
                <Text size="xSmall" color={Colors.green}>
                  {element.name}
                </Text>
              </View>
              {selectedIndex === index && this.renderSelectedBar()}
            </ButtonView>
          );
        })}
      </View>
    );
  }
}

const mapStateToProps = ({ general }) => ({
  selectedIndex: general.selectedIndex
});

const actions = { setSelectedTab };

export default connect(
  mapStateToProps,
  actions
)(Tabbar);