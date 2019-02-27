import React from 'react';
import {
    StyleSheet,
    View
} from "react-native";
import Draggable from "./Draggable"
import styles from "./styles"


export default class Home extends React.Component {

    render() {
        return (
            <View style={styles.row}>
                <Draggable />
            </View>
        );
    }
}

