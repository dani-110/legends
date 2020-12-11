

import React, { useState } from "react";
import styles from "./styles";
import { Text, View, TouchableOpacity, Modal, FlatList } from "react-native";
// import Icon from "react-native-vector-icons/Entypo";
import PickerItem from './PickerItem'
function CustomPicker(props) {
    const { selectedValue, setSelectedValue, placeholder, items, label, value, category,
        selectedValueName, setSelectedValueName } = props
    const [modalVisible, setmodalVisible] = useState(false)

    return (

        <>
            <TouchableOpacity onPress={() => setmodalVisible(!modalVisible)}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ marginLeft: 9, marginBottom: 9, fontSize: 17 }}>{selectedValue ? selectedValueName ? selectedValueName : selectedValue : placeholder}</Text>
                    {/* <Icon name="chevron-down" style={{ fontSize: 17, marginLeft: 9, marginBottom: 9, marginRight: 10 }} /> */}
                </View>
            </TouchableOpacity>


            <Modal visible={modalVisible} animationType="slide">
                <View style={{
                    backgroundColor: "white", flexDirection: "row", marginTop: 30,
                    padding: 15, borderRadius: 100, justifyContent: "space-between"
                }}>

                    <Text style={{ fontSize: 20, ...styles.greyColor, }}>{placeholder}</Text>
                    <TouchableOpacity onPress={() => setmodalVisible(false)} >
                        <Text style={{ ...styles.greyColor }}>close</Text>
                    </TouchableOpacity>
                </View>



                <FlatList data={items}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => <PickerItem label={item[label]}
                        onPress={() => {
                            setmodalVisible(false);
                            category ? setSelectedValue(category, item[value]) : setSelectedValue(item[value]);
                            setSelectedValueName && setSelectedValueName(item[label]);
                        }} />}>

                </FlatList>
            </Modal>

        </>
    );
}

export default CustomPicker;