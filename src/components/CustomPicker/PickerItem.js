
import React, { useState } from "react";
import styles from "./styles";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

function CustomPicker(props) {
    const { label, onPress } = props

    return (

        <ScrollView>
            <TouchableOpacity onPress={onPress}>
                <Text style={{ padding: 20 }}>{label}</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

export default CustomPicker;