
import React, { Component } from 'react';
import { Text, View } from 'react-native';


export default function ExpendableItems(props) {

    return props.isExpended ?
        (<View>
            <Text>This is expended</Text>
        </View>) : null;

}