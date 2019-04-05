import React, { Component, Fragment } from 'react';
import { KeyboardAvoidingView, Platform} from 'react-native';
import { Button, Text, List, ListItem, Input, Spinner, InputGroup, Icon} from "native-base";
import axios from 'axios';
import deviceStorage from '../../../services/deviceStorage'; 
import styles from '../styles';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: '',
            loading: false
        };

        this.server = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

        this.registerUser = this.registerUser.bind(this);
    }

    registerUser() {
        const { username , email, password} = this.state;

        this.setState({ error: '', loading: true });
     
        axios.post("http://"+this.server+":5000/api/auth/register", 
            {
                username: username,
                email: email,
                password: password
            }
        )
        .then((response) => {
            deviceStorage.saveItem("id_token", response.data.token);
            deviceStorage.saveItem("token_ExpTime", response.data.tokenExpirationTime);
            this.setState({ loading: false });
            this.props.newJWT(response.data.token);
        })
        .catch((error) => {
            console.log(error);
            this.setState({error: "Reg Error!"})
            this.setState({ loading: false });
        });
    }

    render() {
        const { username, email, password, error, loading } = this.state;

        return (
            <Fragment>
                <KeyboardAvoidingView style={{ width: '100%'}}>
                    
                    <List style={{ marginBottom: 15 }}>
                        <ListItem style={{ marginRight: 15 }}>
                            <InputGroup>
                                <Icon name="md-mail" style={{ color: '#FFFFFF' }} />
                                <Input placeholder="Email"
                                    style={{ color: '#FFFFFF' }}
                                    onChangeText={email => this.setState({ email })} />
                            </InputGroup>
                        </ListItem>
                        <ListItem style={{ marginRight: 15 }}>
                            <InputGroup>
                                <Icon name="md-person" style={{ color: '#FFFFFF' }} />
                                <Input placeholder="Username"
                                    style={{ color: '#FFFFFF' }}
                                    onChangeText={username => this.setState({ username })} />
                            </InputGroup>
                        </ListItem>
                        <ListItem style={{ marginRight: 15 }}>
                            <InputGroup>
                                <Icon name="md-unlock" style={{ color: '#FFFFFF' }} />
                                <Input placeholder="Password"
                                    secureTextEntry
                                    style={{ color: '#FFFFFF' }}
                                    onChangeText={password => this.setState({ password })} />
                            </InputGroup>
                        </ListItem>
                    </List>

                    <Text style={styles.errorTextStyle}>
                        {error}
                    </Text>

                    {!loading ?
                        <Button block rounded onPress={this.registerUser}>
                            <Text style={styles.buttonText}>Register</Text>
                        </Button>
                        :
                        <Spinner color='#5067ff' />
                    }
                </KeyboardAvoidingView>
                <Button block transparent onPress={this.props.authSwitch}>
                    <Text style={styles.buttonText}>Already have an account? Log in!</Text>
                </Button>
            </Fragment>
        );
    }
}

export { Registration };