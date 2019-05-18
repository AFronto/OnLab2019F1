import React from "react";
import { ScrollView } from "react-native";
import { View, Card, CardItem, List, Text, Textarea, Button, Icon} from 'native-base';
import commonStyles from '../../components/commonStyles';
import { grey } from "ansi-colors";

export default class ConversationView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            currentMessage: "",
            loggedInUser: 1
        };
    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: "Hello developer",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "React Native",
                        avatar: "https://placeimg.com/140/140/any"
                    }
                }
            ]
        });
    }

    onSend = () => {
        var newMessageList = this.state.messages;
        newMessageList.push({
            _id: this.state.messages.length+1,
            text: this.state.currentMessage,
            createdAt: new Date(),
            user: {
                _id: this.state.loggedInUser,
                name: 'alma'
            }
        });
        this.setState({ messages: newMessageList, currentMessage: ""});
    }

    render() {
        console.log(this.state);
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