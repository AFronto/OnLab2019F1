import React, { Component } from "react";
import { Text, View, List, ListItem, Button, Icon, Fab } from "native-base";
import { ListView, RefreshControl, ScrollView } from "react-native";
import commonStyles from "../../_common/commonStyles";

export default class AllSkillTreeView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      loading: true,
      error: "",
      skills: "",
      skillsShown: "",
      actRowMap: ""
    };
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.skillsShown];
    var id = newData[rowId].id;
    newData.splice(rowId, 1);
    this.setState({ skillsShown: newData });
    this.props.deleteSkill(id);
  }

  addSkillPressed(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.skillsShown];
    var id = newData[rowId].id;
    newData[rowId].userKnows = true;
    this.setState({ skillsShown: newData });
    this.props.addSkillToMe(id);
  }

  removeSkillPressed(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.skillsShown];
    var id = newData[rowId].id;
    newData[rowId].userKnows = false;
    this.setState({ skillsShown: newData });
    this.props.removeSkillFromMe(id);
  }

  listItemClicked = (skill, rowMap) => {
    Object.keys(rowMap).forEach(row => {
      if (rowMap[row]) {
        rowMap[row].props.closeRow();
      }
    });
    this.listChildrenOf(skill);
    this.setState({ actRowMap: rowMap });
  };

  findSkillInTree = skill => {
    let skills = this.state.skills;

    while (true) {
      if (skill.id) {
        if (skills.some(s => s.id === skill.id)) {
          return skills.find(s => s.id === skill.id);
        } else {
          skills = skills.flatMap(s => s.children);
        }
      } else {
        if (skills.some(s => s.$id === skill.$ref)) {
          return skills.find(s => s.$id === skill.$ref);
        } else {
          skills = skills.flatMap(s => s.children);
        }
      }
    }
  };

  backToParent = () => {
    const { skillsShown, actRowMap } = this.state;

    Object.keys(actRowMap).forEach(row => {
      if (actRowMap[row]) {
        actRowMap[row].props.closeRow();
      }
    });

    if (skillsShown[0].parent.parent !== null) {
      this.listChildrenOf(skillsShown[0].parent.parent);
    } else {
      this.props.setRunOnClick(null);
      this.props.loadSkills();
    }
  };

  listChildrenOf = skill => {
    const parent = this.findSkillInTree(skill);
    const newData = [...parent.children];
    if (newData.length > 0) {
      this.setState(
        {
          skillsShown: newData.map(s => {
            return { id: s.id, name: s.name, userKnows: s.userKnows, parent };
          })
        },
        () => {
          this.props.setRunOnClick(this.backToParent);
        }
      );
    }
  };

  addNewSkill = () => {
    this.props.setRunOnClick(null);
    this.props.redirectToCreate();
  };

  _onRefresh = () => {
    this.props.loadSkills();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, marginTop: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._onRefresh}
              progressBackgroundColor={"#5cb85c"}
              colors={["#FFFFFF"]}
            />
          }
        >
          <List
            style={{ marginTop: 19, paddingBottom: 80 }}
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.skillsShown)}
            renderRow={(skill, _secId, _rowId, rowMap) => (
              <ListItem
                onPress={() => this.listItemClicked(skill, rowMap)}
                style={[
                  commonStyles.defaultOverlayBackgroundColor,
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
        </ScrollView>
        <Fab onPress={this.addNewSkill} style={{ backgroundColor: "#5067FF" }}>
          <Icon name="md-add" />
        </Fab>
      </View>
    );
  }
}
