import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import { View, Text, Platform } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';
import React, { Component, Fragment } from 'react';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        };

        this.server = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

        this.loginUser = this.loginUser.bind(this);
    }

    loginUser() {
        const { email, password, error, loading} = this.state;

        this.setState({ error: '', loading: true });

        // NOTE Post to HTTPS only in production
        axios.post("http://"+this.server+":5000/api/auth/login", {
            email: email,
            password: password
        })
            .then((response) => {
                deviceStorage.saveItem("id_token", response.data.token);
                deviceStorage.saveItem("token_ExpTime", response.data.tokenExpirationTime);
                this.setState({loading: false});
                this.props.newJWT(response.data.token);
            })
            .catch((error) => {
                console.log(error);
                this.setState({ error: "LogIn Error!" })
                this.setState({ loading: false });
            });
    }
    
    render() {
        const { email, password, error, loading } = this.state;
        const { form, section, errorTextStyle } = styles;

        return (
            <Fragment>
                <View style={form}>

                    <View style={section}>
                        <Input
                            placeholder="user@email.com"
                            label="Email"
                            value={email}
                            onChangeText={email => this.setState({ email })}
                        />
                    </View>

                    <View style={section}>
                        <Input
                            secureTextEntry
                            placeholder="password"
                            label="Password"
                            value={password}
                            onChangeText={password => this.setState({ password })}
                        />
                    </View>

                    <Text style={errorTextStyle}>
                        {error}
                    </Text>

                    {!loading ?
                        <Button onPress={this.loginUser}>
                            Login
                        </Button>
                        :
                        <Loading size={'large'} />
                    }

                </View>
                <TextLink onPress={this.props.authSwitch}>
                    Don't have an account? Register!
                </TextLink>
            </Fragment>
        );
    }
}
const styles = {
    form: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    section: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#ddd',
    },
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
    }
};
export { Login };