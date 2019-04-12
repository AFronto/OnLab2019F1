import React, { Component } from 'react';
import { Text } from "native-base";
import commonStyles from '../components/commonStyles';

export default class ProfileScreen extends Component {
    render() {
        return (
            <Text style={commonStyles.menuText}>
                ProfileScreen
            </Text>
        );
    }
}