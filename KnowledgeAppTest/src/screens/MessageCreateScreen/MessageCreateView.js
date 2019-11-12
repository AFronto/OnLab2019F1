import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ListView
} from "react-native";
import {
  Card,
  CardItem,
  Picker,
  Text,
  View,
  List,
  ListItem,
  Icon,
  Button,
  Spinner,
  Textarea
} from "native-base";
import commonStyles from "../_common/commonStyles";
import { Modal } from "../_common/modal";

export default class MessageCreateView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      question: "",
      error: "",
      loading: false,
      selected: 0,
      tags: [],
      addedTags: [],
      priority: 1,
      modalVisible: false
    };
  }

  onPriorityChange = value => {
    this.setState({
      priority: value
    });
  };

  onValueChange = value => {
    this.setState({
      selected: value
    });
  };

  addTag = () => {
    if (
      this.state.tags.length > 0 &&
      !this.state.addedTags.includes(this.state.tags[this.state.selected])
    ) {
      var newTagList = this.state.addedTags;
      newTagList.unshift(this.state.tags[this.state.selected]);
      this.setState({ addedTags: newTagList });
    }
  };

  deleteTag(index) {
    var newTagList = this.state.addedTags;
    newTagList.splice(index, 1);
    this.setState({ addedTags: newTagList });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  warnIfNeeded = () => {
    const { addedTags } = this.state;

    if (addedTags.length > 0) {
      return false;
    } else {
      this.setModalVisible(true);
      return true;
    }
  };

  addMessage = () => {
    if (!this.warnIfNeeded()) {
      this.props.addMessage();
    }
  };

  render() {
    var priorityList = [1, 2, 3];
    return (
      <ScrollView
        style={
          Platform.OS === "android"
            ? { flex: 1 }
            : {
                flex: 1,
                paddingLeft: "20%",
                paddingRight: "20%",
                paddingTop: 50
              }
        }
      >
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="padding"
          enabled
        >
          <List style={{ marginBottom: 15 }}>
            <ListItem style={{ marginRight: 15 }}>
              <Textarea
                rowSpan={5}
                placeholder="Question"
                style={{
                  color: "#FFFFFF",
                  width: "100%",
                  fontSize: 18
                }}
                onChangeText={question => this.setState({ question })}
              />
            </ListItem>
            <ListItem style={{ marginRight: 15 }}>
              <View style={{ width: "100%" }}>
                <Text style={commonStyles.menuText}>Tags:</Text>
                <View style={{ width: "100%", flexDirection: "row" }}>
                  <Picker
                    note
                    mode="dropdown"
                    style={
                      Platform.OS === "android"
                        ? { width: "100%", color: "#FFFFFF" }
                        : {
                            width: "100%",
                            color: "#FFFFFF",
                            backgroundColor: "#131726"
                          }
                    }
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange}
                  >
                    {this.state.tags.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item.name}
                          value={index}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                  <Button transparent iconRight block onPress={this.addTag}>
                    <Icon
                      name="md-arrow-forward"
                      style={{ color: "#FFFFFF" }}
                    />
                  </Button>
                </View>
                <List>
                  {this.state.addedTags.map((skill, index) => {
                    return (
                      <View style={commonStyles.complexListElementContainer}>
                        <Text style={commonStyles.commonText}>
                          {skill.name}
                        </Text>
                        <Button
                          transparent
                          iconRight
                          block
                          onPress={() => this.deleteTag(index)}
                        >
                          <Icon name="md-close" style={{ color: "#FFFFFF" }} />
                        </Button>
                      </View>
                    );
                  })}
                </List>
              </View>
            </ListItem>
            <ListItem>
              <View style={{ width: "100%" }}>
                <Text style={commonStyles.menuText}>Priority:</Text>
                <View style={{ width: "100%", flexDirection: "row" }}>
                  <Picker
                    note
                    mode="dropdown"
                    style={
                      Platform.OS === "android"
                        ? { width: 40, color: "#FFFFFF" }
                        : {
                            width: 40,
                            color: "#FFFFFF",
                            backgroundColor: "#131726"
                          }
                    }
                    selectedValue={this.state.priority}
                    onValueChange={this.onPriorityChange}
                  >
                    {priorityList.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item.toString()}
                          value={item}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </ListItem>
          </List>

          <Text style={commonStyles.errorTextStyle}>{this.state.error}</Text>

          {!this.state.loading ? (
            <Button
              block
              rounded
              style={commonStyles.commonWideButton}
              onPress={this.addMessage}
            >
              <Text style={commonStyles.commonText}>Add</Text>
            </Button>
          ) : (
            <Spinner color="#5067ff" />
          )}
          <Button
            block
            rounded
            danger
            style={commonStyles.commonWideButton}
            onPress={this.props.cancel}
          >
            <Text style={commonStyles.commonText}>Cancel</Text>
          </Button>
        </KeyboardAvoidingView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
          style={{ backgroundColor: "#13172688" }}
        >
          <View
            style={[
              commonStyles.modalPositioning,
              { backgroundColor: "#13172688" }
            ]}
          >
            <Card
              style={
                Platform.OS === "android"
                  ? commonStyles.androidModalCard
                  : commonStyles.webModalCard
              }
            >
              <CardItem style={commonStyles.cardItemContentRowFlexStart}>
                <Icon name="md-warning" style={{ color: "#FFFFFF" }} />
                <View style={commonStyles.textRows}>
                  <Text style={commonStyles.commonText}>
                    There are no Tags {"\n"}
                    added to this question. {"\n"}
                    {Platform.OS === "web" && "\n"}
                  </Text>
                  <Text style={commonStyles.commonText}>
                    Are you sure you want to create {"\n"}
                    this question?
                  </Text>
                </View>
              </CardItem>
              <CardItem style={commonStyles.cardItemContentRowSpaceAround}>
                <Button
                  onPress={() => {
                    this.props.addMessage();
                    this.setModalVisible(false);
                  }}
                >
                  <Text style={commonStyles.commonText}>I am sure!</Text>
                </Button>
                <Button
                  danger
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                >
                  <Text style={commonStyles.commonText}>Cancel</Text>
                </Button>
              </CardItem>
            </Card>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
