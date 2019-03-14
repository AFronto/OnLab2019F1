import PropTypes from 'prop-types';
import React from 'react';
import { TextInput, Text, View  } from 'react-native';
import styles from './styles';

const RFTextInput = ({ 
    input: { onChange, value },
    meta: { error, valid }
}) => (
    <View>
        <TextInput
            onChangeText={onChange}
            value={value}
                style={[styles.rootInput , { borderColor: !valid ? 'red' : 'gray' }]}
        />
        {!valid && <Text style={styles.rootError}>{error}</Text>}
    </View>
);

RFTextInput.propTypes = {
    input: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
    }).isRequired,
    meta: PropTypes.shape({
        error: PropTypes.string,
        valid: PropTypes.bool.isRequired,
    }).isRequired,
}

export default RFTextInput;