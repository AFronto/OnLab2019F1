import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, ListView } from "react-native";
import { Picker, Text, View, List, ListItem, Icon, Button, Spinner, Textarea } from "native-base";
import commonStyles from '../components/commonStyles';

export default class MessageCreateView extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            question: '',
            error: '',
            loading: false,
            selected: 0,
            tags: [],
            addedTags: [],
            priority: 1
        };
    }

    onPriorityChange = (value) => {
        this.setState({
            priority: value
        });
    }

    onValueChange = (value) => {
        this.setState({
            selected: value
        });
    }

    addTag = () => {
        if (!this.state.addedTags.includes(this.state.tags[this.state.selected])) {
            var newTagList = this.state.addedTags;
            newTagList.unshift(this.state.tags[this.state.selected]);
            this.setState({ addedTags: newTagList});
        }
    }

    deleteTag(index) {
        var newTagList = this.state.addedTags;
        newTagList.splice(index, 1);
        this.setState({ addedTags: newTagList });
    }

    render() {
        var priorityList = [1, 2, 3, 4, 5];
        return (
            <ScrollView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ width: '100%' }} behavior='padding' enabled>

                    <List style={{ marginBottom: 15 }}>
                        <ListItem style={{ marginRight: 15 }}>
                            <Textarea rowSpan={5}
                                placeholder="Question"
                                style={{ color: '#FFFFFF', width: "100%", fontSize: 18 }}
                                onChangeText={question => this.setState({ question })} />
                        </ListItem>
                        <ListItem style={{ marginRight: 15 }}>
                            <View style={{ width: '100%' }}>
                                <Text style={commonStyles.menuText}>
                                    Tags:
                                </Text>
                                <View style={{ width: '100%', flexDirection: "row" }}>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={Platform.OS === 'android'
                                            ?
                                            { width: '100%', color: '#FFFFFF' }
                                            :
                                            { width: '100%', color: '#FFFFFF', backgroundColor: '#131726' }}
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange}>
                                        {this.state.tags.map((item, index) => {
                                            return (<Picker.Item label={item.name} value={index} key={index} />)
                                        })}
                                    </Picker>
                                    <Button transparent iconRight block onPress={this.addTag}>
                                        <Icon name="md-arrow-forward" style={{ color: '#FFFFFF' }} />
                                    </Button>
                                </View>
                                <List>
                                    {this.state.addedTags.map((skill, index) => {
                                        return (
                                            <View style={commonStyles.complexListElementContainer}>
                                                <Text style={commonStyles.commonText}> {skill.name} </Text>
                                                <Button transparent iconRight block onPress={() => this.deleteTag(index)}>
                                                    <Icon name="md-close" style={{ color: '#FFFFFF' }} />
                                                </Button>
                                            </View>
                                        )
                                    })
                                    }
                                </List>
                            </View>
                        </ListItem>
                        <ListItem>
                            <View style={{ width: '100%'}}>
                                <Text style={commonStyles.menuText}>
                                    Priority:
                                </Text>
                                <View style={{ width:'100%', flexDirection: "row" }}>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={Platform.OS === 'android'
                                            ?
                                            { width: 40, color: '#FFFFFF' }
                                            :
                                            { width: 40, color: '#FFFFFF', backgroundColor: '#131726' }}
                                        selectedValue={this.state.priority}
                                        onValueChange={this.onPriorityChange}>
                                        {priorityList.map((item, index) => {
                                            return (<Picker.Item label={item.toString()} value={item} key={index} />)
                                        })}
                                    </Picker>
                                </View>
                            </View>
                        </ListItem>
                    </List>

                    <Text style={commonStyles.errorTextStyle}>
                        {this.state.error}
                    </Text>

                    {!this.state.loading ?
                        <Button
                            block rounded
                            style={commonStyles.commonWideButton}
                            onPress={this.props.addMessage}
                            >
                            <Text style={commonStyles.commonText}>Add</Text>
                        </Button>
                        :
                        <Spinner color='#5067ff' />
                    }
                    <Button
                        block rounded danger
                        style={commonStyles.commonWideButton}
                        onPress={this.props.cancel}>
                        <Text style={commonStyles.commonText}>Cancel</Text>
                    </Button>

                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}