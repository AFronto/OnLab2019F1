import { StyleSheet } from 'react-native';

let CIRCLE_RADIUS = 60;
const styles = StyleSheet.create({
    row: {
        height: "100%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    circle: {
        backgroundColor: "red",
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS
    }
});

export default styles;