import { PropTypes } from 'prop-types';
import React from 'react';
import { Button, View, Platform, Text} from 'react-native';
import { Field } from 'redux-form';
import RFTextView from '../../../RFTextInput';
import styles from './styles';

const LogInFormView = ({ handleSubmit }) => (
    <View style={Platform.OS !== 'web' ? styles.mobilForm : styles.webForm}>
        <Text style={styles.label}>User Name:</Text>
        <Field
            name="username"
            component={RFTextView}
        />
        <Text style={styles.label}>Password:</Text>
        <Field
            name="password"
            component={RFTextView}
        />
        <Button
            title="Sign In"
            onPress={handleSubmit}
        />
    </View>
);

LogInFormView.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};



export default LogInFormView;