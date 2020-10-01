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
    rightBtnImage: PropTypes.number,
    rightBtnPress: PropTypes.func,
    rightBtnText: PropTypes.string,
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
    rightBtnImage: undefined,
    rightBtnPress: () => { },
    rightBtnText: "",
    hasBorder: true,
    style: {},
    hasSearch: false,
    onSearchText: () => { },
    isSearching: false,
    theme: NAVBAR_THEME.TRANSPERENT,
    titleAlign: "center",
    isLandscape: false
  };

  renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack, theme) {
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
          <Image source={theme === NAVBAR_THEME.GREEN ? Images.arrow_white : Images.back_icon} />
        )}
      </ButtonView>
    );
  }
  renderRight(rightBtnImage, rightBtnPress, rightBtnText) {
    return (
      <ButtonView
        onPress={rightBtnPress}
        style={[{ position: "absolute", right: 20 }, styles.rightBtn]}
      >
        {!_.isEmpty(rightBtnText) && (
          <Text
            type="medium"
            numberOfLines={1}
            ellipsizeMode="tail"
            size="small"
          >
            {rightBtnText}
          </Text>
        )}
        {!_.isUndefined(rightBtnImage) && (
          <View>
            <Image
              source={rightBtnImage}
              style={styles.btnImage}
              resizeMode="contain"
            />
          </View>
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
          titleAlign === "center" && {
            position: "absolute",
            left: 50,
            right: 50
          }
        ]}
      >
        <Text
          color={theme === NAVBAR_THEME.GREEN ? Colors.white : Colors.black2}
          numberOfLines={1}
          ellipsizeMode="tail"
          // size="large"
          // type="bold"
          style={[styles.title]}
          textAlign={titleAlign}
        >
          {title || ""}
        </Text>
        {
          !_.isEmpty(subtitle) && (
            <Text
              size="xSmall"
              color={theme === NAVBAR_THEME.GREEN ? Colors.white : Colors.black2}
              textAlign={titleAlign}
            >
              {subtitle || "subtitle"}
            </Text>
          )
        }
      </View >
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
      rightBtnImage,
      rightBtnPress,
      rightBtnText,
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
            : theme === NAVBAR_THEME.WHITE ? { backgroundColor: Colors.white } : { backgroundColor: "rgba(0,0,0,0)" },
          isLandscape
            ? {
              // height: Metrics.navBarHeightLandscape,
              paddingTop: Metrics.statusBarHeightLandscape
            }
            : {}
        ]}
      >
        <View
          style={[
            styles.titleContainer,
            AppStyles.flexRow,
            AppStyles.alignItemsCenter
          ]}
        >
          {this.renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack, theme)}
          {this.renderTitle(title, subtitle, titleColor, theme, titleAlign)}
          {this.renderRight(rightBtnImage, rightBtnPress, rightBtnText)}
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