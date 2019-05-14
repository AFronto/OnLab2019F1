import React, { Component } from 'react';
import { Text } from "native-base";
import { Platform } from "react-native";
import commonStyles from '../../components/commonStyles';

export default class AllThreadView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text style={commonStyles.menuText}>
                AllThreadView
            </Text>    
        );
    }
}