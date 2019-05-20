import React, { Component } from 'react';
import AllThreadView from "./Components/AllThreadView";
import { View, Fab, Icon } from 'native-base';
import { RefreshControl } from 'react-native';
import ConversationView from './Components/ConversationView';

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

    read = (id) =>{
        this.setState({reading:id});
        this.props.loadConversation(id);
    }

    delete = (id) => {
        this.setState({ reading: null });
        this.props.deleteConversation(id);
    }

    refreshView = () => {
        return (<RefreshControl
            refreshing={this.state.loading}
            onRefresh={this._onRefresh}
            progressBackgroundColor={"#5cb85c"}
            colors={["#FFFFFF"]}
        />);
    }

    _onRefresh = () => {
        this.props.loadList();
    }

    render(){
        if (this.state.reading){
            return (<ConversationView
                        ref={this.Conversation}
                        sendMessage={this.props.sendMessage}
                        questionId={this.state.reading} />)
        }else{
            return(
                <View style={{ flex: 1 }}>
                    <AllThreadView 
                        ref={this.List} 
                        read={this.read} 
                        delete={this.delete} 
                        refresh={this.refreshView}/>
                    <Fab
                        onPress={this.props.redirectToCreate}
                        style={{ backgroundColor: '#5067FF' }}>
                        <Icon name="md-add" />
                    </Fab>
                </View>
            );
        }
    }
}