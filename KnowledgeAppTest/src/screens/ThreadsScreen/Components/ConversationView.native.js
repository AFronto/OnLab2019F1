import React from "react";
import { GiftedChat, Bubble, InputToolbar} from "react-native-gifted-chat";

export default class ConversationView extends React.Component {
    state = {
        messages: []
    };

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: "Hello developer",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "React Native"
                    }
                }
            ]
        });
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
    }

    renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    left: {
                        color: 'white',
                    },
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#1a1d2e',
                    },
                    right: {
                        backgroundColor: "#5067ff",
                    }
                }}
                usernameStyle={{
                    color: 'white',
                }}
            />
        );
    }

    renderInputToolbar = (props) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{ 
                    borderTopWidth: 1.5,
                    borderTopColor: '#1a1d2e',
                    backgroundColor: '#131726'
    
                }}
                textStyle={{
                    color: "#FFFFFF", 
                }}
                textInputStyle={{
                    color: "#FFFFFF"
                }}
            />
        );
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                renderBubble={this.renderBubble}
                renderInputToolbar={this.renderInputToolbar}
                showUserAvatar={true}
                renderUsernameOnMessage={true}
                user={{
                    _id: 1,
                    name:"alma"
                }}
            />
        );
    }
}