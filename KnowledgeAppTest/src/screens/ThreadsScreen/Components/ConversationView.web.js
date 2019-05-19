import React from "react";
import { ScrollView } from "react-native";
import { View, Card, CardItem, List, Text, Textarea, Button, Icon} from 'native-base';
import commonStyles from '../../components/commonStyles';

export default class ConversationView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            currentMessage: "",
            loggedInUser: 1
        };
    }

    onSend = () => {
        this.props.sendMessage(this.props.questionId, this.state.currentMessage, this.state.loggedInUser);
        this.setState({ currentMessage: "" });
    }

    reciveMessage = (message, user, username, creationTime, id) =>{
        console.log("Message recived!");
        var newMessageList = this.state.messages;
        newMessageList.push({
            _id: id,
            text: message,
            createdAt: new Date(creationTime * 1000),
            user: {
                _id: user,
                name: username
            }
        });
        this.setState({ messages: newMessageList });
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <ScrollView style={{ flex: 1, marginBottom: 50 }} 
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}>
                    <List style={{ marginTop: 10, marginLeft: 10, marginRight: 10}}>
                        {this.state.messages.map((message, index) => {
                            return (
                                <View>
                                    {message.user._id === this.state.loggedInUser ? 
                                        <Card transparent 
                                            style={{marginBottom:10, alignSelf: "flex-end", marginLeft:50}}>
                                            <CardItem style={{ backgroundColor: "#5067ff"}}>
                                                <Text style={commonStyles.commonText}> 
                                                    {message.text}
                                                </Text>
                                            </CardItem>
                                            <CardItem style={commonStyles.webChatBubleMineFooter}>
                                                <Text style={commonStyles.webChatBubleFooterString}>
                                                    {"~"+message.user.name}
                                                </Text>
                                                <Text style={commonStyles.webChatBubleFooterString}>
                                                    {message.createdAt.toString().slice(0,21)}
                                                </Text>
                                            </CardItem>
                                        </Card>
                                        :
                                        <Card transparent 
                                            style={{ marginBottom: 10, alignSelf: "flex-start", marginRight: 50 }}>
                                            <CardItem style={{ backgroundColor: "#1a1d2e" }}>
                                                <Text style={commonStyles.commonText}>
                                                    {message.text}
                                                </Text>
                                            </CardItem>
                                            <CardItem style={commonStyles.webChatBubleOtherFooter}>
                                                <Text style={commonStyles.webChatBubleFooterString}>
                                                    {"~"+message.user.name}
                                                </Text>
                                                <Text style={commonStyles.webChatBubleFooterString}>
                                                    {message.createdAt.toString().slice(0,21)}
                                                </Text>
                                            </CardItem>
                                        </Card>
                                    }   
                                </View>
                            )
                        })
                        }
                    </List>
                </ScrollView>
                <View style={{ flex: 1, flexDirection: "row", alignItems:"flex-end", flexGrow:0}}>
                    <Textarea rowSpan={2}
                        placeholder="Type a message..."
                        style={{ color: '#FFFFFF', width: "100%", fontSize: 18, borderWidth: 1, borderColor:"#1a1d2e" }}
                        value={this.state.currentMessage}
                        onChangeText={currentMessage => this.setState({ currentMessage })}/>
                    <Button transparent
                        disabled={this.state.currentMessage.length===0}
                        style={{ alignSelf: "flex-end"}}
                        iconRight block onPress={this.onSend}>
                        <Icon name="md-arrow-forward" style={{ color: '#FFFFFF' }} />
                    </Button> 
                </View>
            </View>
        );
    }
}