
// @flow
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { View, Image as RNImage, FlatList, TouchableOpacity } from "react-native";
import { Text } from "../../../../components";
import styles from "./styles";
import { AppStyles, Colors, Images } from "../../../../theme";
import Util from "../../../../util";



export default function MatchesTable(props) {
  // static propTypes = {
  //   data: PropTypes.object.isRequired
  // };

  const [detailIndex, setDetailIndex] = useState(null);


  _renderRoundNumber = () => {
    const {
      data: {
        item: { round }
      }
    } = props;
    const colors = ["blue", "red3", "darkBlue"];

    return (
      <View style={AppStyles.centerInner}>
        <View
          style={[
            AppStyles.centerInner,
            styles.roundNumber,
            { backgroundColor: Colors[colors[round % 3]] }
          ]}
        >
          <Text textAlign="center" color={Colors.white}>
            Round {round}
          </Text>
        </View>
      </View>
    );
  }

  _renderDate = () => {
    console.log('_renderDate ..  called')
    const {
      data: {
        item: { playing_month }
      }
    } = props;

    return (
      <View
        style={[
          AppStyles.flexRow,
          AppStyles.centerInner,
          AppStyles.baseMargin,
          styles.dateContainer
        ]}
      >
        <RNImage source={Images.calendar_grey} style={AppStyles.mRight10} />
        <Text textAlign="center">
          {/* {Util.getFormattedDateTime(item.startTime, "DD MMM YYYY")}
          {" - "}
          {Util.getFormattedDateTime(item.endTime, "DD MMM YYYY")} */}

          {playing_month}
        </Text>
      </View>
    );
  }

  _renderPlayerItem = (item, index, arrIndex) => {
    console.log(item);
    items = item[3].details.map(exItems => {
      return <View style={{ backgroundColor: "rgba(242, 242, 242, 1)", marginBottom: 1, }}>
        <View
          style={[
            AppStyles.flexRow,
            AppStyles.spaceBetween,
            AppStyles.alignItemsCenter,

            { flex: 1, }
          ]}
        >
          {/* right side Objects */}
          <View style={[{ paddingTop: 10, flex: 1, height: '100%', width: '50%' }, { flexDirection: 'column' }, (exItems.match_winner_team !== "away_team") ? { backgroundColor: "rgba(102, 139, 249, .2)" } : { backgroundColor: 'rgba(0,0,0,0)' }]}>
            {/* player 1 */}
            <View style={{ flexDirection: 'row-reverse', }}>

              <View style={{ ...styles.squir }}>
                <Text style={{ textAlign: 'center' }} color={Colors.white} size={12}>{exItems.home_team_score_1}</Text>
              </View>
              <View>
                <Text style={styles.textStyle} >
                  {exItems.home_team_1}
                </Text>
              </View>
            </View>

            {/* player 2 */}
            <View style={{ flexDirection: 'row-reverse' }}>

              <View style={{ ...styles.squir }}>
                <Text style={{ textAlign: 'center' }} color={Colors.white} size={12}>{exItems.home_team_score_2}</Text>
              </View>
              <View>
                <Text style={styles.textStyle} >
                  {exItems.home_team_2}
                </Text>
              </View>
            </View>


          </View>
          {/* Circle */}
          <View style={{ ...styles.circle, }}>
            <Text color={Colors.white} size={12}>
              {exItems.overall_match_score}
            </Text>
          </View>
          {/* Left side objects */}
          <View style={[{ paddingTop: 10, flex: 1, height: '100%', width: '50%' }, { flexDirection: 'column' }, (exItems.match_winner_team === "away_team") ? { backgroundColor: "rgba(102, 139, 249, .2)" } : { backgroundColor: 'rgba(0,0,0,0)' }]}>
            {/* player 2 */}
            <View style={{ flexDirection: 'row', marginLeft: -5, }}>
              <View style={{ ...styles.squir }}>
                <Text style={{ textAlign: 'center' }} color={Colors.white} size={12}>{exItems.away_team_score_1}</Text>
              </View>
              <View>
                <Text style={styles.textStyle} >
                  {exItems.away_team_1}
                </Text>
              </View>
            </View>

            {/* player 2 */}
            <View style={{ flexDirection: 'row', marginLeft: -5 }}>
              <View style={{ ...styles.squir }}>
                <Text style={{ textAlign: 'center' }} color={Colors.white} size={12}>{exItems.away_team_score_2}</Text>
              </View>
              <View>
                <Text style={styles.textStyle} >
                  {exItems.away_team_2}
                </Text>
              </View>
            </View>


          </View>
        </View>
      </View >
    })
    return (

      <View>

        <TouchableOpacity activeOpacity={.7}
          // onPress={() => _updateExpand(item, index, arrIndex)}
          onPress={() => { if (index === detailIndex) { setDetailIndex(null) } else { setDetailIndex(index) } }}
          style={[
            AppStyles.flexRow,
            AppStyles.spaceBetween,
            AppStyles.alignItemsCenter,
            AppStyles.mBottom10,
            AppStyles.mRight10,
            AppStyles.mLeft10
          ]}
        >

          {/* right data */}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
            <View style={{ flex: 1, }}>
              <Text
                style={AppStyles.flex2}
                textAlign="center"
                size={15}
                color={Colors.grey5}
              >
                {item[0]}
              </Text>
            </View>
            <View style={styles.squir}>
              <Text color={Colors.white} size={12}> {item[4]} </Text>
            </View>
          </View>

          {/* text vs */}
          <View style={styles.playersSep}>
            <Text color={Colors.white} size={13}>
              vs
            </Text>
            <View>

            </View>
          </View>

          {/* left Item */}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
            <View style={styles.squir}>
              <Text color={Colors.white} size={12}> {item[5]} </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text
                style={AppStyles.flex2}
                textAlign="center"
                size={15}
                color={Colors.grey5}
              >
                {item[1]}
              </Text>
            </View>

          </View>

        </TouchableOpacity>
        <View>
          {(index === detailIndex) ? items : null}
          {/* {this.state.isExpended[index] ? items : null} */}

        </View>
      </View>
    );
  }



  _renderPlayers = () => {
    console.log('_renderPlayers .. called')
    const {
      data: {
        item: { teams, isCollapsed },
        index,
      }
    } = props;

    return (
      <View>
        {/* <FlatList
          data={teams}
          renderItem={(item) => _renderPlayerItem(item, index)}
          keyExtractor={Util.keyExtractor}
        /> */}
        {teams.map((team, i) => {
          console.log('list getting --- ')
          console.log(team);
          return _renderPlayerItem(team, i, index)
        })
        }

      </View>
    );
  }

  _renderPlaySubItems = ({ item }) => {
    console.log('_renderPlaySubItems .. called')
    return (
      <View>
        <Text>{item[2].ex[1].home}</Text>
        <Text>{item[2].ex[1].away}</Text>
      </View>
    );
  }

  _updateExpand = (item, index, arrIndex) => {
    console.log('_updateExpand .. called')

    // item[2].isExpanded = true;
    // console.log(item[2].isExpanded);
    // this.setState({ isExpended : })
    // this.state.isExpended[index] = !this.state.isExpended[index]
    console.log('update expand ');
    // console.log(this.state.isExpended);
    setDetailIndex(index);
    console.log(detailIndex);
    // console.log(this.state.detailIndex);
    // this.setState({ isExpended: this.state.isExpended, forceUpdate: !this.state.forceUpdate });
  }



  return (
    <View style={[AppStyles.mBottom30, styles.matchCard]}>
      {_renderRoundNumber()}
      {_renderDate()}
      {_renderPlayers()}

      {/* <ExpandableListView
        data={CONTENT} // required
      /> */}

      {/* <FlatList
        data={[1, 2, 3, 4]}
        renderItem={this._subrenderPlayerItem}
        keyExtractor={Util.keyExtractor}
      /> */}

    </View>
  )
}
















// export default class MatchesTable extends React.Component {
//   static propTypes = {
//     data: PropTypes.object.isRequired
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       // isExpended: [],
//       // forceUpdate: false,
//       detailIndex: 0
//     }
//   }

//   // state = {
//   //   isExpended: [],
//   //   forceUpdate: false
//   // }
//   static defaultProps = {};



//   _renderRoundNumber() {
//     const {
//       data: {
//         item: { round }
//       }
//     } = this.props;
//     const colors = ["blue", "red3", "darkBlue"];

//     return (
//       <View style={AppStyles.centerInner}>
//         <View
//           style={[
//             AppStyles.centerInner,
//             styles.roundNumber,
//             { backgroundColor: Colors[colors[round % 3]] }
//           ]}
//         >
//           <Text textAlign="center" color={Colors.white}>
//             Round {round}
//           </Text>
//         </View>
//       </View>
//     );
//   }

//   _renderDate() {
//     const {
//       data: {
//         item: { playing_month }
//       }
//     } = this.props;

//     return (
//       <View
//         style={[
//           AppStyles.flexRow,
//           AppStyles.centerInner,
//           AppStyles.baseMargin,
//           styles.dateContainer
//         ]}
//       >
//         <RNImage source={Images.calendar_grey} style={AppStyles.mRight10} />
//         <Text textAlign="center">
//           {/* {Util.getFormattedDateTime(item.startTime, "DD MMM YYYY")}
//           {" - "}
//           {Util.getFormattedDateTime(item.endTime, "DD MMM YYYY")} */}

//           {playing_month}
//         </Text>
//       </View>
//     );
//   }

//   _renderPlayers() {

//     const {
//       data: {
//         item: { teams, isCollapsed },
//         index,
//       }
//     } = this.props;
//     // this.setState({ isExpended: this.state.isExpended[0] ? [...this.state.isExpended, ...isCollapsed] : isCollapsed });
//     // this.setState({ isExpended: isCollapsed });

//     // console.log({ isExpended: this.state.isExpended[0] ? [...this.state.isExpended, ...isCollapsed] : isCollapsed });
//     return (
//       <FlatList
//         data={teams}
//         renderItem={(item) => this._renderPlayerItem(item, index)}
//         keyExtractor={Util.keyExtractor}
//       />
//     );
//   }

//   _renderPlaySubItems({ item }) {

//     return (
//       <View>
//         <Text>{item[2].ex[1].home}</Text>
//         <Text>{item[2].ex[1].away}</Text>
//       </View>
//     );
//   }

//   _updateExpand = (item, index, arrIndex) => {
//     // item[2].isExpanded = true;
//     // console.log(item[2].isExpanded);
//     // this.setState({ isExpended : })
//     // this.state.isExpended[index] = !this.state.isExpended[index]
//     console.log('update expand ');
//     // console.log(this.state.isExpended);
//     this.setState({ detailIndex: index });
//     // console.log(this.state.detailIndex);
//     // this.setState({ isExpended: this.state.isExpended, forceUpdate: !this.state.forceUpdate });
//   }

//   _renderPlayerItem({ item, index }, arrIndex) {
//     console.log(this.state.isExpended);
//     items = item[3].details.map(exItems => {
//       return <View>
//         <Text>{exItems.home}</Text>
//         <Text>{exItems.away}</Text>
//       </View>
//     })
//     return (

//       <View>
//         <TouchableOpacity onPress={() => { this.setState({ detailIndex: index }) }}>
//           <Text>Click to increase {this.state.detailIndex}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity activeOpacity={.7}
//           onPress={() => this._updateExpand(item, index, arrIndex)}

//           style={[
//             AppStyles.flexRow,
//             AppStyles.spaceBetween,
//             AppStyles.alignItemsCenter,
//             AppStyles.mBottom10,
//             AppStyles.mRight10,
//             AppStyles.mLeft10
//           ]}
//         >
//           <Text
//             style={AppStyles.flex2}
//             textAlign="center"
//             size={15}
//             color={Colors.grey5}
//           >
//             {item[0]}-{this.state.detailIndex}
//           </Text>
//           <View style={styles.playersSep}>
//             <Text color={Colors.white} size={13}>
//               vs
//             </Text>
//             <View>

//             </View>
//           </View>
//           <Text
//             style={AppStyles.flex2}
//             textAlign="center"
//             size={15}
//             color={Colors.grey5}
//           >
//             {item[1]}
//           </Text>
//         </TouchableOpacity>
//         {/* <View> */}
//         {/* {item[2].isExpanded ? items : null} */}
//         {/* {this.state.isExpended[index] ? items : null} */}

//         {/* </View> */}
//       </View>
//     );
//   }

//   render() {
//     return (
//       <View style={[AppStyles.mBottom30, styles.matchCard]}>
//         {this._renderRoundNumber()}
//         {this._renderDate()}
//         {this._renderPlayers()}

//         {/* <FlatList
//           data={[1, 2, 3, 4]}
//           renderItem={this._subrenderPlayerItem}
//           keyExtractor={Util.keyExtractor}
//         /> */}

//       </View>
//     );
//   }
// }

