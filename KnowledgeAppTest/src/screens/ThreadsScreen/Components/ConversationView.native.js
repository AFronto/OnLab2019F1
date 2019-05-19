import React from "react";
import { GiftedChat, Bubble, InputToolbar} from "react-native-gifted-chat";

export default class ConversationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loggedInUser: 1
        };
    }

    onSend(messages = []) {
        this.props.sendMessage(this.props.questionId, messages[0].text, this.state.loggedInUser);
    }
    
    reciveMessage = (message, user, username, creationTime, id) => {
        console.log("Message recived!");
        let messages = [
            {
                _id: id,
                text: message,
                createdAt: new Date(creationTime*1000),
                user: {
                    _id: user,
                    name: username
                }
            }
        ]
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
                    _id: this.state.loggedInUser
                }}
            />
        );
    }
}