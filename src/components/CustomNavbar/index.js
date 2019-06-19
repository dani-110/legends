// @flow
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { Text, ButtonView, SearchBar } from "../";
import styles from "./styles";
import { NAVBAR_THEME } from "../../constants";
import { Images, AppStyles, Colors, Metrics } from "../../theme";

export default class CustomNavbar extends React.Component {
  static propTypes = {
    hasBack: PropTypes.bool,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    leftBtnImage: PropTypes.number,
    leftBtnPress: PropTypes.func,
    leftBtnText: PropTypes.string,
    titleColor: PropTypes.string,
    hasBorder: PropTypes.bool,
    style: PropTypes.object,
    hasSearch: PropTypes.bool,
    onSearchText: PropTypes.func,
    isSearching: PropTypes.bool,
    theme: PropTypes.string,
    titleAlign: PropTypes.string,
    isLandscape: PropTypes.bool
  };

  static defaultProps = {
    hasBack: true,
    title: "",
    subtitle: "",
    titleColor: "",
    leftBtnImage: undefined,
    leftBtnPress: Actions.pop,
    leftBtnText: "",
    hasBorder: true,
    style: {},
    hasSearch: false,
    onSearchText: () => {},
    isSearching: false,
    theme: NAVBAR_THEME.WHITE,
    titleAlign: "center",
    isLandscape: false
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

  renderTitle(title, subtitle, titleColor, theme, titleAlign) {
    return (
      <View
        style={[
          AppStyles.flex,
          AppStyles.centerInner,
          { position: "absolute", left: 50, right: 50 }
        ]}
      >
        <Text
          color={theme === NAVBAR_THEME.GREEN ? Colors.white : Colors.black2}
          numberOfLines={1}
          ellipsizeMode="tail"
          size="large"
          type="bold"
          style={styles.title}
          textAlign={titleAlign}
        >
          {title || ""}
        </Text>
        {!_.isEmpty(subtitle) && (
          <Text size="xSmall" color={Colors.black2Tinted}>
            {subtitle || ""}
          </Text>
        )}
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
      subtitle,
      leftBtnImage,
      leftBtnPress,
      leftBtnText,
      titleColor,
      hasBorder,
      style,
      hasSearch,
      onSearchText,
      isSearching,
      theme,
      titleAlign,
      isLandscape
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
            : { backgroundColor: Colors.white },
          isLandscape
            ? {
                height: Metrics.navBarHeightLandscape,
                paddingTop: Metrics.statusBarHeightLandscape
              }
            : {}
        ]}
      >
        <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
          {this.renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack)}
          {this.renderTitle(title, subtitle, titleColor, theme, titleAlign)}
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
