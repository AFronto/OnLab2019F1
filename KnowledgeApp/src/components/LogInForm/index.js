import React, { Component } from 'react';
import LogInFormRF from './LogInFormRF';

class LogInForm extends Component {
    handleSubmit = ({ firstName, lastName }) => {
        console.log(`firstname: ${firstName}`);
        console.log(`lastName: ${lastName}`);
    }

    render() {
        return <LogInFormRF onSubmit={this.handleSubmit} />;
    }
}

export default LogInForm;