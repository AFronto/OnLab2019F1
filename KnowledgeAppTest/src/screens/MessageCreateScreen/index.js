import React, { Component } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';
import MessageCreateView from './MessageCreateView';

export default class MessageCreateScreen extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            this.server = '10.0.2.2';
            this.props.setTitle("New Thread");
        } else {
            this.server = 'localhost';
        }
        this.View = React.createRef();
    }

    componentDidMount() {
        const headers = {
            'Authorization': 'Bearer ' + this.props.jwt
        };
        axios({
            method: 'GET',
            url: 'http://' + this.server + ':5000/api/skills',
            headers: headers,
        }).then((response) => {
            this.View.current.setState({
                tags: response.data.skills,
                loading: false
            });
        }).catch((error) => {
            console.log(error);
            this.View.current.setState({
                error: 'Error retrieving data',
                loading: false
            });
        });
    }

    cancel = () => {
        this.props.history.push(`/`);
    }

    addMessage = () => {
        const headers = {
            'Authorization': 'Bearer ' + this.props.jwt
        };
        var tags = [];
        for(let tag in this.View.current.state.addedTags){
            tags.unshift(this.View.current.state.addedTags[tag].name);
        }
        axios({
            method: 'POST',
            url: 'http://' + this.server + ':5000/api/messages',
            headers: headers,
            data: {
                priority: this.View.current.state.priority,
                content: this.View.current.state.question,
                tags: tags
            }
        }).then((response) => {
            this.props.history.push(`/`);
        }).catch((error) => {
            console.log(error);
            this.View.current.setState({
                error: 'Error creating thread',
                loading: false
            });
        });
    }

    render() {
        return (
            <MessageCreateView
                ref={this.View}
                cancel={this.cancel}
                addMessage={this.addMessage} />
        );
    }
}