import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import LogInForm from '../../components/LogInForm';
import styles from './styles';


export default class LogIn extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <LogInForm style={styles.form} />
            </KeyboardAvoidingView>
        );
    }
}
