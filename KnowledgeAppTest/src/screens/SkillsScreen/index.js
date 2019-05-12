import React, { Component } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';
import SkillView from './SkillView';

export default class SkillsScreen extends Component
{
    constructor(props){
        super(props);
        if (Platform.OS === 'android'){
            this.server = '10.0.2.2';
            this.props.setTitle("Skills");
        }else{
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

    redirectToCreate = () => {
        this.props.history.push(`/createSkill`);
    }

    deleteSkill = (id) =>{
        const headers = {
            'Authorization': 'Bearer ' + this.props.jwt
        };
        this.View.current.setState({
            error: ""
        });

        axios({
            method: 'DELETE',
            url: 'http://' + this.server + `:5000/api/skills/${id}`,
            headers: headers,
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
            this.View.current.setState({
                error: error.response.data.error,
                loading: false
            });
        });
    }

    addSkillToMe = (id) =>{
        const headers = {
            'Authorization': 'Bearer ' + this.props.jwt
        };
        this.View.current.setState({
            error: ""
        });

        axios({
            method: 'PATCH',
            url: 'http://' + this.server + `:5000/api/skills/${id}/add`,
            headers: headers,
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error); 
            this.View.current.setState({
                error: error.response.data.error,
                loading: false
            });
        });
    }

    removeSkillFromMe = (id) => {
        const headers = {
            'Authorization': 'Bearer ' + this.props.jwt
        };
        this.View.current.setState({
            error: ""
        });
        
        axios({
            method: 'PATCH',
            url: 'http://' + this.server + `:5000/api/skills/${id}/remove`,
            headers: headers,
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
            this.View.current.setState({
                error: error.response.data.error,
                loading: false
            });
        });
    }

    render() {
        return (
            <SkillView ref={this.View} 
                redirectToCreate={this.redirectToCreate} 
                addSkillToMe={this.addSkillToMe}
                removeSkillFromMe={this.removeSkillFromMe} 
                deleteSkill={this.deleteSkill}/>
        );
    }
}