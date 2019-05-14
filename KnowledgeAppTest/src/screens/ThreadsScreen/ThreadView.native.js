import React, { Component } from 'react';
import AllThreadView from "./Components/AllThreadView";
import { View, Fab, Icon } from 'native-base';

export default class ThreadView extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            loading: true,
            error: '',
            threads: ""
        };
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <AllThreadView threads={this.state.threads}/>
                <Fab
                    onPress={this.props.redirectToCreate}
                    style={{ backgroundColor: '#5067FF' }}>
                    <Icon name="md-add" />
                </Fab>
            </View>
        )
    }
}