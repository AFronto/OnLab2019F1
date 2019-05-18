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
            reading: false
        };
        this.List = React.createRef();
    }

    read = (id) =>{
        this.setState({reading:true});
        this.props.loadConversation(id);
    }

    render(){
        if(this.state.loading){
            return (
                <Spinner color='#5067ff' />
            );
        } else if (this.state.reading){
            return (<ConversationView/>)
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