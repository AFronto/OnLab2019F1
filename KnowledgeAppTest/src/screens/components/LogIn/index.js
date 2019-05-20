import axios from 'axios';
import deviceStorage from '../../../services/deviceStorage';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text, List, ListItem, Input, Spinner, InputGroup, Icon} from "native-base";
import React, { Component, Fragment } from 'react';
import commonStyles from '../commonStyles';
import env from '../../../env';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        };

        this.server = Platform.OS === 'android' ? env.ServerUrlForAndroid : env.ServerUrlForWeb;

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
                this.setState({ error: error.response.data.error })
                this.setState({ loading: false });
            });
    }

    render() {
        const { email, password, error, loading } = this.state;

        return (
            <Fragment>
                <KeyboardAvoidingView style={{ width: '100%'}} behavior='padding' enabled>

                    <List style={{ marginBottom: 15 }}>
                        <ListItem style={{ marginRight: 15 }}>
                            <InputGroup>
                                <Icon name="md-mail" style={{ color: '#FFFFFF' }}/>
                                <Input placeholder="Email" 
                                    style={{color: '#FFFFFF',fontSize: 18}}
                                    onChangeText={email => this.setState({ email })}/>
                            </InputGroup>
                        </ListItem>                     
                        <ListItem style={{ marginRight: 15 }}>
                            <InputGroup>
                                <Icon name="md-unlock" style={{ color: '#FFFFFF' }}/>
                                <Input placeholder="Password" 
                                    secureTextEntry
                                    style={{ color: '#FFFFFF', fontSize: 18 }}
                                    onChangeText={password => this.setState({ password })}/>
                            </InputGroup>
                        </ListItem>
                    </List>

                    <Text style={commonStyles.errorTextStyle}>
                        {error}
                    </Text>

                    {!loading ? 
                        <Button 
                            block rounded
                            style={commonStyles.commonWideButton}
                            onPress={this.loginUser}>   
                            <Text style={commonStyles.commonText}>Login</Text> 
                        </Button>
                        :
                        <Spinner color='#5067ff' />
                    }

                </KeyboardAvoidingView>
                <Button 
                    block transparent
                    style={commonStyles.commonWideButton}
                    onPress={this.props.authSwitch}>
                    <Text style={commonStyles.commonText}>Don't have an account? Register!</Text>
                </Button>
            </Fragment>
        );
    }
}

export { Login };