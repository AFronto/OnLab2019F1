import React, { Component } from 'react';
import { Text } from "native-base";
import { Platform } from "react-native";
import axios from 'axios';
import commonStyles from '../components/commonStyles';
import ThreadView from './ThreadView';

export default class ThreadsScreen extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            this.server = '10.0.2.2';
            this.props.setTitle("Threads");
        } else {
            this.server = 'localhost';
        }
        this.View = React.createRef();
    }

    componentDidMount() {
        const headers = {
            'Authorization': 'Bearer ' + this.props.jwt
        };
        this.View.current.setState({
            error: ""
        });

        axios({
            method: 'GET',
            url: 'http://' + this.server + ':5000/api/messages',
            headers: headers,
        }).then((response) => {
            console.log(response);
            this.View.current.setState({
                loading: false
            });
            this.View.current.List.current.setState({
                threads: response.data.messages,
            });
        }).catch((error) => {
            console.log(error);
            this.View.current.setState({
                error: 'Error retrieving data',
                loading: false
            });
        });
    }

    redirectToCreate = () => {
        this.props.history.push(`/createMessage`);
    }

    render() {
        return (
            <ThreadView 
                ref={this.View}
                redirectToCreate={this.redirectToCreate}
                />
        );
    }
}