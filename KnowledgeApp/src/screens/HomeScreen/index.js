import React, { Component } from 'react';
import { View, Platform} from 'react-native';
import axios from 'axios';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Spinner } from "native-base";

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            skills: '',
            error: ''
        };
        this.server = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
        // this.addSkill = this.addSkill.bind(this);
    }

    componentDidMount() {
        const headers = {
            'Authorization': 'Bearer ' + this.props.jwt
        };
        axios({
            method: 'GET',
            url: 'http://'+this.server+':5000/api/skills',
            headers: headers,
        }).then((response) => {
            var list = '';
            response.data.skills.forEach(
                skill => {
                    list += skill.name + ', ' 
                          + skill.description
                          + '\n';
                }
            );
            this.setState({
                skills: list,
                loading: false
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
                error: 'Error retrieving data',
                loading: false
            });
        });
    }

    addSkill = () => {
        const headers = {
            'Authorization': 'Bearer ' + this.props.jwt
        };
        axios({
            method: 'PATCH',
            url: 'http://localhost:5000/api/skills/Web/add',
            headers: headers,
        }).then((response) => {
            console.log("response: " + response);
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const { container, skillText, errorText } = styles;
        const { loading, skills, error } = this.state;

        if (loading) {
            return (
                <View style={container}>
                    <Spinner color='#5067ff' />
                </View>
            )
        } else if (Platform.OS === 'android' ){
            return (
                    <Header>
                        <Left>
                            <Button
                                transparent
                                onPress={this.props.deleteJWT}>
                                <Icon name="md-menu" />
                            </Button>
                        </Left>
                        <Body/>
                        <Right />
                    </Header>
            );
        } else {
            return (
                <View style={container}>
                    <Button onPress={this.props.deleteJWT}>
                        Log Out
                    </Button>
                </View>
            );
        }
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    skillText: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 20
    },
    errorText: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
    }
};