import React, { Component } from 'react';
import commonStyles from '../components/commonStyles';
import { Text, Spinner, View} from "native-base";

export default class SkillView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            error: '',
            skills: ""
        };

    }

    render() {
        return (
            this.state.loading ? 
                <Spinner color='#5067ff' />
                :
                <View>
                    <Text style={commonStyles.menuText}>
                        SkillView
                    </Text>
                    <Text style={commonStyles.errorTextStyle}>
                        {this.state.error}
                    </Text>
                </View>
        );
    }
}