import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    errorTextStyle: {
        alignSelf: 'center',

        fontSize: 18,
        color: 'red',
        marginBottom: 5,
        fontFamily: "Segoe UI"
    },
    commonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: "Segoe UI"
    },
    menuText: {
        color: '#FFFFFF',
        fontFamily: "Segoe UI",
        fontSize: 20
    },
    menuIcon: {
        color: '#FFFFFF'
    },
    complexListElementContainer: { 
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
       
    }
});

export default commonStyles;