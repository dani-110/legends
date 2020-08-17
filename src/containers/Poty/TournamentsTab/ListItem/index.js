// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Dimensions } from "react-native";
import { Text, Button, ButtonView } from "../../../../components";
import styles from "./styles";
import { AppStyles, Colors } from "../../../../theme";
import { color, Value } from "react-native-reanimated";
import { values } from "lodash";
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
export default class ListItem extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  };
  state = { visible: false }
  buttonClick(params) {
    if (params === "Registration") {
      this.setState({ visible: true });
    }
  }
  getStatusColor(data) {
    console.log(data.status)
    switch (data.status) {
      case "TBA ":
        return Colors.red
      case "Registration":
        return Colors.blue
      case "Registered":
        return Colors.red5
      case "Scheduled":
        return Colors.red5
      case "Completed":
        return Colors.green
    }
  }
  static defaultProps = {};

  render() {
    const { data } = this.props;

    return (
      <View
        style={[
          AppStyles.flexRow,
          AppStyles.padding15,
          AppStyles.centerInner,
          AppStyles.borderBottomGrey
        ]}
      >
        <Dialog

          visible={this.state.visible}
          footer={

            <View style={styles.dialogBoxStyle}>
              <View style={[
                styles.buttonStyle,
                {
                  backgroundColor: Colors.green,
                  bottom: 15,
                  color: 'yellow'
                }
              ]}>
                <DialogButton
                  text="Confirm"

                  textStyle={{ color: 'white', fontSize: 15 }}
                  onPress={() => { this.setState({ visible: false }); }}
                />
              </View>

            </View>
          }
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }

        >

          <DialogContent
            style={{ justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width * .7, height: Dimensions.get('window').height * .5 }}
          >

            <Text >Registration contants here</Text>
          </DialogContent>
        </Dialog>
        <Text
          type="bold"
          style={AppStyles.flex}
          size="small"
          color={Colors.text.secondary}
        >
          {data.name}
        </Text>
        <View style={{ width: 110 }}>
          <Text
            type="bold"
            size="small"
            textAlign="center"
            color={Colors.text.secondary}
            style={[AppStyles.pLeft10, AppStyles.pRight10]}
          >
            {data.tournament_date}
          </Text>
        </View>
        <View
          style={[
            styles.statusWrapper,
            {
              backgroundColor: this.getStatusColor(data)
              // data.status === "complete" ? Colors.red : Colors.green

            }
          ]}

        >
          <ButtonView

            onPress={() =>
              this.buttonClick(data.status)
            }
          >

            <Text
              type="bold"
              size="xSmall"
              color={Colors.white}
              textAlign="center"
            >
              {data.status}

            </Text>
          </ButtonView>
        </View>
      </View >
    );
  }
}
