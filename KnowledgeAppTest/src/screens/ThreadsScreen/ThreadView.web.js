import React, { Component } from 'react';
import AllThreadView from "./Components/AllThreadView";
import { View, Button, Text } from 'native-base';
import commonStyles from "../components/commonStyles";

export default class ThreadView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: ''
        };
        this.List = React.createRef();
    }

    render() {
        return (
            <View>
                <Button 
                    block rounded 
                    onPress={this.props.redirectToCreate}
                    style={commonStyles.commonWideButton}>
                    <Text style={commonStyles.commonText}>New Thread</Text>
                </Button>
                <AllThreadView ref={this.List}/>
            </View>
        )
    }
}