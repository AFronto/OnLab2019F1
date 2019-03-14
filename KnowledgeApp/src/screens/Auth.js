import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Login } from './LogIn';
import { Registration } from './Registration';

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        };
        this.whichForm = this.whichForm.bind(this);
        this.authSwitch = this.authSwitch.bind(this);
    }

    authSwitch() {
        this.setState({
            showLogin: !this.state.showLogin
        });
    }

    whichForm() {
        if (!this.state.showLogin) {
            return (
                <Registration newJWT={this.props.newJWT} authSwitch={this.authSwitch} />
            );
        } else {
            return (
                <Login newJWT={this.props.newJWT} authSwitch={this.authSwitch} />
            );
        }
    }

    render() {
        return (
            < KeyboardAvoidingView style = { styles.container } behavior = 'padding' enabled>
                {this.whichForm()}
            </KeyboardAvoidingView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};