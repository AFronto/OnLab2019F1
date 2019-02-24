import React from 'react';
import { StyleSheet,  KeyboardAvoidingView } from 'react-native';
import LogInForm from './components/LogInForm';



export default class LogIn extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    login = () => {
        // let self = this;
        // this.setState({ validationError: null, exception: null });

        // Authentication.signIn(this.state.user, this.state.password).then(() => self.navigate('Main')).catch(error => {
        //     if (error.message == '401') this.setState({ validationError: 'Invalid user name or password' });
        //     else this.setState({ exception: error.message });
        // });

        console.log(this.state)
    };

    render() {
        const handleUserInput = user => this.setState({ user: user });
        const handlePasswordInput = pwd => this.setState({ password: pwd });
        return (  
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <LogInForm style={styles.form} />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingVertical: 20,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#131726'
    },
    form: {
        height: '100%',
        width: '100%'
    }
});