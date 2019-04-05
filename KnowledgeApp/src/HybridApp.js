import React from 'react';
import { Loading } from './screens/common/';
import Auth from './screens/Auth';
import { StyleSheet, Platform , View } from 'react-native';
import deviceStorage from './services/deviceStorage.js';
import HomeScreen from './screens/HomeScreen';

export default class HybridApp extends React.Component {
    constructor() {
        super();
        this.state = {
            jwt: '',
            loading: true
        }
        
        this.newJWT = this.newJWT.bind(this);
        this.deleteJWT = deviceStorage.deleteJWT.bind(this);
        this.loadJWT = deviceStorage.loadJWT.bind(this);
        this.loadJWT();
    }
    
    newJWT(jwt) {
        this.setState({
            jwt: jwt
        });
    }  

    render() {
        if (this.state.loading) {
            return (
                <View style = {Platform.OS === 'android' ? styles.androidContainer : styles.webContainer}>
                    <Loading size={'large'} />
                </View>
            );
        } else if (!this.state.jwt) {
            return (
                <View style = {Platform.OS === 'android' ? styles.androidContainer : styles.webContainer}>
                    <Auth newJWT={this.newJWT} />
                </View>
            );
        } else if (this.state.jwt) {
            return (
                <View style = {Platform.OS === 'android' ? styles.androidContainer : styles.webContainer}>
                    <HomeScreen jwt={this.state.jwt} deleteJWT={this.deleteJWT} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    androidContainer: {
        flex: 1,
        backgroundColor: '#131726',
    },
    webContainer: {
        flex: 1,
        backgroundColor: '#131726',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%"
    },
});
