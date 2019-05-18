import React, { Component } from 'react';
import AllThreadView from "./Components/AllThreadView";
import ConversationView from "./Components/ConversationView";
import { View, Button, Text } from 'native-base';
import commonStyles from "../components/commonStyles";


export default class ThreadView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: '',
            reading: false
        };
        this.List = React.createRef();
    }

    read = (id) => {
        this.setState({ reading: true });
        this.props.loadConversation(id);
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "row" }}>
                {
                    this.state.reading?
                    <ConversationView />
                    :
                    <View/>
                }
                <View style={{ width: "35%" }}>
                    <Button 
                        block rounded 
                        onPress={this.props.redirectToCreate}
                        style={commonStyles.commonWideButton}>
                        <Text style={commonStyles.commonText}>New Thread</Text>
                    </Button>
                    <AllThreadView ref={this.List} read={this.read}/>
                </View>
            </View>
        )
    }
}