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

const ActionType = {
  poty: () => Actions.potylivescore(),
  lmp: () => Actions.lmplivescore(),
  dmp: () => Actions.dmplivescore(),
  lcl: () => Actions.lcllivescore()
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
    onPress: tabIsActive => {
      if (tabIsActive) {
        Actions.jump("dashboard_tab_main");
      } else {
        Actions.jump("dashboard_tab");
      }
    }
  },
  {
    name: "live",
    image: Images.live_outline,
    selectedImage: Images.live_black,
    type: BUTTON_TYPES.icon,
    onPress: tabIsActive => {
      if (tabIsActive) {
        Actions.jump("live_tab_main");
      } else {
        Actions.jump("live_tab");
      }
    }
  },
  {
    name: "notifications",
    image: Images.notification_outline,
    selectedImage: Images.notification_black,
    type: BUTTON_TYPES.icon,
    onPress: () => Actions.notification_tab()
  },
  {
    name: "Join Game",
    image: Images.arrow_circle_green,
    selectedImage: Images.arrow_circle_green,
    disableImage: Images.arrow_circle_grey,
    type: BUTTON_TYPES.textIcon,
    selectedTab: 2,
    dependency: "current_match",
    onPress: (tabIsActive, props) => {
      const data = props.current_match[0];
      switch (props.current_match[0].type) {
        case "poty":
          return Actions.jump("potylivescore", { data });

        case "lmp":
          return Actions.jump("lmplivescore", { data });

        case "dmp":
          return Actions.jump("dmplivescore", { data });

        case "lcl":
          return Actions.jump("lcllivescore", { data });

        default:
          break;
      }
    }
    // ActionType[props.current_match[0].type].call()
  }
];

const livematchtabsData = [
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
    name: "score board",
    image: Images.score_board_outline,
    selectedImage: Images.score_board_black,
    type: BUTTON_TYPES.icon,
    onPress: tabIsActive => {
      if (tabIsActive) {
        Actions.jump("live_tab_main");
      } else {
        Actions.jump("live_tab");
      }
    }
  },
  {
    name: "Enter Score",
    image: Images.arrow_circle_green,
    selectedImage: Images.arrow_circle_green,
    disableImage: Images.arrow_circle_grey,
    type: BUTTON_TYPES.textIcon,
    onPress: () => {
      Actions.jump("enterscore");
    }
  }
];

class Tabbar extends React.PureComponent {
  static propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    setSelectedTab: PropTypes.func.isRequired,
    defaultTabbar: PropTypes.bool.isRequired,
    showTabbar: PropTypes.bool.isRequired,
    current_match: PropTypes.array.isRequired
  };

  static defaultProps = {};

  renderSelectedBar() {
    return <View style={styles.selectedBar} />;
  }

  render() {
    const { selectedIndex, defaultTabbar, showTabbar } = this.props;
    // const selectedIndex = 4;
    const data = defaultTabbar ? tabsData : livematchtabsData;

    return (
      showTabbar && (
        <View style={styles.container}>
          {data.map((element, index) => {
            if (element.type === BUTTON_TYPES.icon) {
              return (
                <ButtonView
                  key={index}
                  style={styles.itemWrapper}
                  onPress={() => {
                    if (index !== 0) {
                      this.props.setSelectedTab(index);
                    }
                    element.onPress(selectedIndex === index);
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

            const isEnabled = element.dependency
              ? this.props[element.dependency].length
              : true;
            return (
              <ButtonView
                key={index}
                style={styles.itemWrapper}
                isDisabled={!isEnabled}
                onPress={() => {
                  if (element.selectedTab) {
                    this.props.setSelectedTab(element.selectedTab);
                  }
                  element.onPress(selectedIndex === index, this.props);
                }}
              >
                <View style={[styles.btn2, !isEnabled && styles.disabled]}>
                  <Image
                    source={
                      isEnabled
                        ? selectedIndex === index
                          ? element.selectedImage
                          : element.image
                        : element.disableImage
                    }
                    style={styles.btn2Image}
                  />
                  <Text
                    size="xSmall"
                    color={isEnabled ? Colors.green : Colors.grey}
                  >
                    {element.name}
                  </Text>
                </View>
                {selectedIndex === index && this.renderSelectedBar()}
              </ButtonView>
            );
          })}
        </View>
      )
    );
  }
}

const mapStateToProps = ({ general }) => ({
  selectedIndex: general.selectedIndex,
  defaultTabbar: general.defaultTabbar,
  showTabbar: general.showTabbar,
  current_match: general.current_match
});

const actions = { setSelectedTab };

export default connect(
  mapStateToProps,
  actions
)(Tabbar);
