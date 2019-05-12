import React, { Component } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';
import SkillCreateView from './SkillCreateView';

export default class SkillCreateScreen extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            this.server = '10.0.2.2';
            this.props.setTitle("New Skill");
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
                skills: response.data.skills,
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

    addSkill = () =>{
        const headers = {
            'Authorization': 'Bearer ' + this.props.jwt
        };
        axios({
            method: 'POST',
            url: 'http://' + this.server + ':5000/api/skills',
            headers: headers,
            data: {
                name: this.View.current.state.skillName,
                description: this.View.current.state.description,
                isRoot: this.View.current.state.isRoot
            }
        }).then((response) => {
            axios({
                method: 'PATCH',
                url: `http://${this.server}:5000/api/skills/${response.data.id}/parent`,
                headers: headers,
                data:{
                    skills: this.View.current.state.addedSkills
                }
            }).then((response) => {
                console.log("Adding parrents succesful");
            }).catch((error) => {
                console.log(error);
            });
            this.props.history.push(`/`);
        }).catch((error) => {
            console.log(error);
            this.View.current.setState({
                error: 'Error creating skill',
                loading: false
            });
        });
    }

    cancel = () =>{
        this.props.history.push(`/`);
    }

    render() {
        return (
            <SkillCreateView ref={this.View} addSkill = {this.addSkill} cancel = {this.cancel}/>
        );
    }
}