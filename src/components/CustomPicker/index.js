

import React, { useState } from "react";
import styles from "./styles";
import { Text, View, TouchableHighlight } from "react-native";
// // import Icon from "react-native-vector-icons/Entypo";
// import PickerItem from './PickerItem';
// import ModalDropdown from "react-native-modal-dropdown";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { element } from "prop-types";
import { color } from "react-native-reanimated";
import { Colors } from "../../theme";


function CustomPicker(props) {
    const { selectedValue, setSelectedValue, placeholder, items, value, category,
        selectedValueName, setSelectedValueName, positionZindex } = props


    const [modalVisible, setmodalVisible] = useState(false)
    console.log("value is:===>", positionZindex);

    return (

        <>


            {/* <ModalDropdown
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                defaultValue={selectedValue ? selectedValueName ? selectedValueName : selectedValue : placeholder}
                options={items}
                onSelect={(index, item) => {
                    setmodalVisible(false);
                    category ? setSelectedValue(category, item.id) : setSelectedValue(item.id);
                    setSelectedValueName && setSelectedValueName(item.name);
                }
                }
                renderSeparator={() => null}
                adjustFrame={(style) => dropdown_3_adjustFrame(style)}
                renderButtonText={(rowData) => _dropdown_2_renderButtonText(rowData)}
                renderRow={(option, index, isSelected) => _dropdown_2_renderRow(option, index, isSelected)}>



            </ModalDropdown> */}
            {/* <View style={{ backgroundColor: 'green', height: 70, position: 'absolute', top: 30 }}>
                <Text>This is the inner text</Text>
            </View> */}
            <DropDownPicker
                items={items}
                containerStyle={{ height: 40, width: 120, zIndex: 0 }}
                style={{}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: Colors.white, height: 100, position: 'absolute', zIndex: 1 }}

                onChangeItem={(item) => {
                    debugger
                    setmodalVisible(false);
                    category ? setSelectedValue(category, item.value) : setSelectedValue(item.value);
                    setSelectedValueName && setSelectedValueName(item.label);
                }}
            />


        </>
    );
}

function dropdown_3_adjustFrame(style) {
    style.right = 50;
    return style;
}

function _dropdown_2_renderRow(rowData, rowID, highlighted) {
    debugger
    return (
        <TouchableHighlight underlayColor='cornflowerblue'>
            <View style={{ backgroundColor: 'white', width: 90, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black', padding: 5 }}>
                    {rowData.name}
                </Text>
            </View>
        </TouchableHighlight >
    );
}

function _dropdown_2_renderButtonText(rowData) {
    const { name } = rowData;
    return name;
}

export default CustomPicker;