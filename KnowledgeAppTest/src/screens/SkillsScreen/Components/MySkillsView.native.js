import React, { Component } from "react";
import { Text, List, Card, CardItem, Button } from "native-base";
import { ScrollView, RefreshControl } from "react-native";
import commonStyles from "../../_common/commonStyles";

export default class MySkillsView extends Component {
  constructor(props) {
    super(props);
  }

  removeSkillFromMe = (id, index) => {
    var newList = this.props.mySkills;
    newList.splice(index, 1);
    this.props.modifyMySkillList(newList);
    this.props.removeSkillFromMe(id);
  };

  _onRefresh = () => {
    this.props.loadMySkills();
  };

  render() {
    return (
      <ScrollView
        style={{ flex: 1, marginTop: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.props.loading}
            onRefresh={this._onRefresh}
            progressBackgroundColor={"#5cb85c"}
            colors={["#FFFFFF"]}
          />
        }
      >
        <List style={{ marginTop: 9, paddingBottom: 80 }}>
          {this.props.mySkills.map((skill, index) => {
            return (
              <Card transparent style={commonStyles.commonWideButton}>
                <CardItem style={commonStyles.cardItemContentRow}>
                  <Text style={commonStyles.commonText}>{skill.name}</Text>
                  <Button
                    danger
                    bordered
                    onPress={() => this.removeSkillFromMe(skill.id, index)}
                  >
                    <Text style={commonStyles.commonText}>Forget</Text>
                  </Button>
                </CardItem>
              </Card>
            );
          })}
        </List>
      </ScrollView>
    );
  }
}
