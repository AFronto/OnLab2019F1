import React, { Component } from 'react';
import { Text } from "native-base";
import { Platform } from "react-native";
import commonStyles from '../components/commonStyles';

export default class ThreadsScreen extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            this.server = '10.0.2.2';
            this.props.setTitle("Threads");
        } else {
            this.server = 'localhost';
        }
    }

    render() {
        return (
            <Text style={commonStyles.menuText}>
                ThreadsScreen
            </Text>
        );
    }
}