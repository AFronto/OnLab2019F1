import React, { Component } from "react";
import { Text, List, Card, CardItem, Button, Badge, View } from "native-base";
import { ScrollView } from "react-native";
import commonStyles from "../../_common/commonStyles";

export default class AllThreadView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: "",
      threads: []
    };
  }

  deleteThread = (id, index) => {
    var newList = this.state.threads;
    newList.splice(index, 1);
    this.setState({ threads: newList });
    this.props.delete(id);
  };

  render() {
    return (
      <ScrollView
        style={{ flex: 1, marginTop: 1 }}
        refreshControl={this.props.refresh()}
      >
        <List style={{ marginTop: 9, paddingBottom: 80 }}>
          {this.state.threads.map((question, index) => {
            return (
              <Card transparent style={commonStyles.commonWideButton}>
                <CardItem style={{ backgroundColor: "#1a1d2e" }}>
                  <Text style={commonStyles.commonText}>
                    {question.content}
                  </Text>
                </CardItem>
                <CardItem style={commonStyles.cardItemContentRow}>
                  {question.relatingSkillName ? (
                    <View style={commonStyles.badgeContainer}>
                      {question.relatingSkillName.map(skillName => (
                        <Badge info style={{ margin: 2 }}>
                          <Text style={commonStyles.smallText}>
                            {skillName}
                          </Text>
                        </Badge>
                      ))}
                    </View>
                  ) : (
                    <View />
                  )}
                  <Badge
                    success={question.priority === 1}
                    warning={question.priority === 2}
                    danger={question.priority === 3}
                    style={{ margin: 2 }}
                  >
                    <Text style={commonStyles.smallText}>
                      {"Priority: " + question.priority}
                    </Text>
                  </Badge>
                </CardItem>
                <CardItem style={commonStyles.cardItemContentRow}>
                  <Button bordered onPress={() => this.props.read(question.id)}>
                    <Text style={commonStyles.commonText}>Chat</Text>
                  </Button>
                  {question.ownerId === this.state.loggedInUser ? (
                    <Button
                      bordered
                      danger
                      onPress={() => this.deleteThread(question.id, index)}
                    >
                      <Text style={commonStyles.commonText}>Delete</Text>
                    </Button>
                  ) : (
                    <View />
                  )}
                </CardItem>
              </Card>
            );
          })}
        </List>
      </ScrollView>
    );
  }
}
