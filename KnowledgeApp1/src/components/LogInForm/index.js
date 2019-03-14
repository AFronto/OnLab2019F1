import React, { Component } from 'react';
import LogInFormRF from './LogInFormRF';
import Authentication from "../../Authentication";

class LogInForm extends Component {
    handleSubmit = ({ username, password }) => {
        Authentication.signIn(username, password)
    }

    render() {
        return <LogInFormRF onSubmit={this.handleSubmit} />;
    }
}

export default LogInForm;