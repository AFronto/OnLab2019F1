import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red',
        marginBottom: 5,
        fontFamily: "Segoe UI"
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: "Segoe UI"
    },
    menuText: {
        color: '#FFFFFF',
        fontFamily: "Segoe UI",
        fontSize: 20
    },
    menuIcon: {
        color: '#FFFFFF',
        marginRight: 10,
    }
});

export default commonStyles;