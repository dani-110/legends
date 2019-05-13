// @flow
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { Text, ButtonView, SearchBar } from "../";
import styles from "./styles";
import { NAVBAR_THEME } from "../../constants";
import { Images, AppStyles, Colors } from "../../theme";

export default class CustomNavbar extends React.Component {
  static propTypes = {
    hasBack: PropTypes.bool,
    title: PropTypes.string,
    leftBtnImage: PropTypes.number,
    leftBtnPress: PropTypes.func,
    leftBtnText: PropTypes.string,
    titleColor: PropTypes.string,
    hasBorder: PropTypes.bool,
    style: PropTypes.object,
    hasSearch: PropTypes.bool,
    onSearchText: PropTypes.func,
    isSearching: PropTypes.bool,
    theme: PropTypes.string
  };

  static defaultProps = {
    hasBack: true,
    title: "",
    titleColor: "",
    leftBtnImage: undefined,
    leftBtnPress: Actions.pop,
    leftBtnText: "",
    hasBorder: true,
    style: {},
    hasSearch: false,
    onSearchText: () => {},
    isSearching: false,
    theme: NAVBAR_THEME.WHITE
  };

  renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack) {
    const renderBack =
      hasBack && _.isEmpty(leftBtnText) && _.isEmpty(leftBtnImage);

    if (!renderBack && _.isUndefined(leftBtnImage) && _.isEmpty(leftBtnText)) {
      return null;
    }

    return (
      <ButtonView onPress={leftBtnPress} style={styles.btnWrapper}>
        {!_.isEmpty(leftBtnText) && <Text>{leftBtnText}</Text>}
        {!_.isUndefined(leftBtnImage) && (
          <Image source={leftBtnImage} size={styles.btnImage} />
        )}
        {renderBack && (
          <Image source={Images.back_icon} size={styles.btnImage} />
        )}
      </ButtonView>
    );
  }

  renderTitle(title, titleColor, theme) {
    return (
      <View style={[AppStyles.flex, AppStyles.centerInner]}>
        <Text
          color={theme === NAVBAR_THEME.GREEN ? Colors.white : Colors.green}
          numberOfLines={1}
          ellipsizeMode="tail"
          size="medium"
          type="bold"
          style={styles.title}
        >
          {title || ""}
        </Text>
      </View>
    );
  }

  renderSearch(onSearchText, isSearching) {
    return <SearchBar onSearchText={onSearchText} isSearching={isSearching} />;
  }

  render() {
    const {
      hasBack,
      title,
      leftBtnImage,
      leftBtnPress,
      leftBtnText,
      titleColor,
      hasBorder,
      style,
      hasSearch,
      onSearchText,
      isSearching,
      theme
    } = this.props;
    return (
      <View
        style={[
          styles.container,
          style,
          hasBorder ? styles.borderBottom : {},
          hasSearch ? styles.searchHeader : {},
          theme === NAVBAR_THEME.GREEN
            ? { backgroundColor: Colors.green }
            : { backgroundColor: Colors.white }
        ]}
      >
        <View style={AppStyles.flexRow}>
          {this.renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack)}
          {this.renderTitle(title, titleColor, theme)}
        </View>

        {hasSearch && (
          <View style={AppStyles.centerInner}>
            {this.renderSearch(onSearchText, isSearching)}
          </View>
        )}
      </View>
    );
  }
}
