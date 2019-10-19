import React, { Component } from "react";
import {
  Text,
  View,
  List,
  ListItem,
  Button,
  Icon,
  Fab,
  Card,
  CardItem
} from "native-base";
import { ListView, RefreshControl, ScrollView, Platform } from "react-native";
import commonStyles from "../../_common/commonStyles";
import { Modal } from "../../_common/modal";

export default class AllSkillTreeView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      actRowMap: "",
      modalVisible: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.error === "Not leaf skill" && !prevState.modalVisible) {
      return { modalVisible: true };
    }
    return null;
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.props.skillsShown];
    var id = newData[rowId].id;
    newData.splice(rowId, 1);
    if (newData.length === 0 && this.props.skillsShown[0].parent) {
      this.backToParent();
    } else {
      this.props.modifySkillsShownList(newData);
    }
    this.props.deleteSkill(id);
  }

  addSkillPressed(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.props.skillsShown];
    var id = newData[rowId].id;
    newData[rowId].userKnows = true;
    this.props.modifySkillsShownList(newData);
    this.props.addSkillToMe(id);
  }

  removeSkillPressed(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.props.skillsShown];
    var id = newData[rowId].id;
    newData[rowId].userKnows = false;
    this.props.modifySkillsShownList(newData);
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
    let skills = this.props.skills;

    while (true) {
      if (skill.$id) {
        if (skills.some(s => s.$id === skill.$id)) {
          return skills.find(s => s.$id === skill.$id);
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
    const { actRowMap } = this.state;
    const { skillsShown } = this.props;

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
      this.props
        .modifySkillsShownList(
          newData.map(s => {
            return {
              id: s.id,
              $id: s.$id,
              name: s.name,
              userKnows: s.userKnows,
              parent
            };
          })
        )
        .then(_ => {
          this.props.setRunOnClick(this.backToParent);
        });
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
              refreshing={this.props.loading}
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
            dataSource={this.ds.cloneWithRows(this.props.skillsShown)}
            renderRow={(skill, _secId, _rowId, rowMap) => (
              <ListItem
                onPress={() => this.listItemClicked(skill, rowMap)}
                style={[
                  commonStyles.cardItemContentRowCenter,
                  {
                    margin: 1
                  }
                ]}
              >
                {skill.userKnows ? (
                  <View style={commonStyles.cardItemContentRowCenter}>
                    <Icon
                      name="md-contact"
                      style={{ color: "#FFFFFF", marginRight: 5 }}
                    />
                    <Text style={commonStyles.menuText}> {skill.name} </Text>
                  </View>
                ) : (
                  <Text style={commonStyles.menuText}> {skill.name} </Text>
                )}
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
                    You are trying to delete a skill{"\n"}
                    with children.{"\n"}
                    {Platform.OS === "web" && "\n"}
                  </Text>
                  <Text style={commonStyles.commonText}>
                    These actions cannot be completed! {"\n"}
                    Your actions will be reverted!
                  </Text>
                </View>
              </CardItem>
              <CardItem style={commonStyles.cardItemContentRowSpaceAround}>
                <Button
                  onPress={() => {
                    this._onRefresh();
                    this.setModalVisible(false);
                  }}
                >
                  <Text style={commonStyles.commonText}>I understand!</Text>
                </Button>
              </CardItem>
            </Card>
          </View>
        </Modal>
      </View>
    );
  }
}
