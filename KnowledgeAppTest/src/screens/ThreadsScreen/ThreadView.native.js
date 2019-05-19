import React, { Component } from 'react';
import AllThreadView from "./Components/AllThreadView";
import { View, Fab, Icon, Spinner} from 'native-base';
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

    render(){
        if(this.state.loading){
            return (
                <Spinner color='#5067ff' />
            );
        } else if (this.state.reading){
            return (<ConversationView
                        ref={this.Conversation}
                        sendMessage={this.props.sendMessage}
                        questionId={this.state.reading} />)
        }else{
            return(
                <View style={{ flex: 1 }}>
                    <AllThreadView ref={this.List} read={this.read}/>
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