import React, { Component } from 'react';
import AllThreadView from "./Components/AllThreadView";
import { View, Fab, Icon, Spinner, Button} from 'native-base';
import ConversationView from './Components/ConversationView';

export default class ThreadView extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            loading: true,
            error: '',
            reading: null,
            fabActive: false
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
                    <AllThreadView ref={this.List} read={this.read} delete={this.delete}/>
                    <Fab
                        active={this.state.fabActive}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.setState({ fabActive: !this.state.fabActive })}
                        >
                        <Icon name="md-more" />
                        <Button
                            style={{ backgroundColor: '#5067FF' }}
                            onPress={this.props.redirectToCreate}>
                            <Icon name="md-add" />
                        </Button>
                        <Button
                            style={{ backgroundColor: '#5cb85c' }}
                            onPress={this.props.loadList}>
                            <Icon name="md-refresh" />
                        </Button>
                    </Fab>
                </View>
            );
        }
    }
}