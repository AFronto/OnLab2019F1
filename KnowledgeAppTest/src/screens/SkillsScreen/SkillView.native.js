import React, { Component } from "react";
import { Text, View, List, ListItem, Button, Icon, Fab } from "native-base";
import { ListView, RefreshControl } from "react-native";
import commonStyles from "../_common/commonStyles";

export default class SkillView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      loading: true,
      error: "",
      skills: ""
    };
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.skills];
    var id = newData[rowId].id;
    newData.splice(rowId, 1);
    this.setState({ skills: newData });
    this.props.deleteSkill(id);
  }

  addSkillPressed(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.skills];
    var id = newData[rowId].id;
    newData[rowId].userKnows = true;
    this.setState({ skills: newData });
    this.props.addSkillToMe(id);
  }

  removeSkillPressed(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.skills];
    var id = newData[rowId].id;
    newData[rowId].userKnows = false;
    this.setState({ skills: newData });
    this.props.removeSkillFromMe(id);
  }

  listItemClicked = skill => {
    console.log(skill);
  };

  _onRefresh = () => {
    this.props.loadSkills();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={commonStyles.errorTextStyle}>{this.state.error}</Text>
        <List
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._onRefresh}
              progressBackgroundColor={"#5cb85c"}
              colors={["#FFFFFF"]}
            />
          }
          leftOpenValue={75}
          rightOpenValue={-75}
          dataSource={this.ds.cloneWithRows(this.state.skills)}
          renderRow={skill => (
            <ListItem
              onPress={() => this.listItemClicked(skill)}
              style={[
                commonStyles.defaultBackground,
                {
                  margin: 1,
                  justifyContent: "center"
                }
              ]}
            >
              <Text style={commonStyles.menuText}> {skill.name} </Text>
            </ListItem>
          )}
          renderLeftHiddenRow={(skill, secId, rowId, rowMap) => (
            <View>
              {skill.userKnows ? (
                <Button
                  full
                  danger
                  style={{ height: "100%" }}
                  onPress={_ => this.removeSkillPressed(secId, rowId, rowMap)}
                >
                  <Icon active name="md-remove" />
                </Button>
              ) : (
                <Button
                  full
                  success
                  style={{ height: "100%" }}
                  onPress={_ => this.addSkillPressed(secId, rowId, rowMap)}
                >
                  <Icon active name="md-add" />
                </Button>
              )}
            </View>
          )}
          renderRightHiddenRow={(_skill, secId, rowId, rowMap) => (
            <Button
              full
              danger
              onPress={_ => this.deleteRow(secId, rowId, rowMap)}
            >
              <Icon active name="trash" />
            </Button>
          )}
        />
        <Fab
          onPress={this.props.redirectToCreate}
          style={{ backgroundColor: "#5067FF" }}
        >
          <Icon name="md-add" />
        </Fab>
      </View>
    );
  }
}
