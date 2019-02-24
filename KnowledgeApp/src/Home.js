import React from 'react';
import {
    StyleSheet,
    View
} from "react-native";
import Draggable from "./Draggable"

export default class Home extends React.Component {

    render() {
        return (
            <View style={styles.row}>
                <Draggable />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    row: {
        height: "100%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
});