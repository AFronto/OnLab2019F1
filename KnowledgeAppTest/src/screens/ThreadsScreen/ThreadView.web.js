import React, { Component } from 'react';
import AllThreadView from "./Components/AllThreadView";
import ConversationView from "./Components/ConversationView";
import { View, Button, Text, Spinner, Icon} from 'native-base';
import commonStyles from "../components/commonStyles";


export default class ThreadView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: '',
            reading: null
        };
        this.List = React.createRef();
        this.Conversation = React.createRef();
    }

    read = (id) => {
        this.setState({ reading: id });
        this.props.loadConversation(id);
    }

    delete = (id) => {
        this.setState({ reading: null });
        this.props.deleteConversation(id);
    }

    refresh = () => {
        this.setState({ reading: null });
        this.props.loadList();
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "row" }}>
                {
                    this.state.reading?
                        <ConversationView 
                            ref={this.Conversation}
                            sendMessage={this.props.sendMessage}
                            questionId={this.state.reading}/>
                    :
                    <View/>
                }
                <View style={{ width: "35%" }}>
                    <View style={{ flex: 1, flexDirection: "row", width: "100%", flexGrow: 0, marginBottom: 40, paddingTop: 10}}>
                        <Button 
                            block rounded 
                            onPress={this.props.redirectToCreate}
                            style={{ marginLeft: 10, marginRight: 15,flexGrow: 1, flexShrink: 1 }}>
                            <Text style={commonStyles.commonText}>New Thread</Text>
                        </Button>
                        <Button
                            block rounded success
                            style={{marginRight:10}}
                            onPress={this.refresh}
                            >
                            <Icon name="md-refresh" style={{ color: '#FFFFFF' }} />
                        </Button>
                    </View>
                    {this.state.loading?
                        <Spinner color='#5067ff' />
                        :
                        <AllThreadView  ref={this.List} read={this.read} delete={this.delete} refresh={()=> {return null;}}/>
                    }
                </View>
            </View>
        );
    }
}