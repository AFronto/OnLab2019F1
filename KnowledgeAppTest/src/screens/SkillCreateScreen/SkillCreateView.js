import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ListView
} from "react-native";
import {
  Picker,
  Text,
  View,
  List,
  ListItem,
  InputGroup,
  Icon,
  Input,
  Button,
  Spinner,
  Textarea
} from "native-base";
import commonStyles from "../_common/commonStyles";

export default class SkillCreateView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      skillName: "",
      description: "",
      error: "",
      loading: false,
      selected: 0,
      skills: [],
      addedSkills: [],
      isRoot: true
    };
  }

  onValueChange = value => {
    this.setState({
      selected: value
    });
  };

  addParentSkill = () => {
    console.log(this.state.selected);
    if (
      this.state.skills.length > 0 &&
      !this.state.addedSkills.includes(this.state.skills[this.state.selected])
    ) {
      var newSkillList = this.state.addedSkills;
      newSkillList.unshift(this.state.skills[this.state.selected]);
      this.setState({ addedSkills: newSkillList, isRoot: false });
    }
  };

  deleteRow(index) {
    var newSkillList = this.state.addedSkills;
    newSkillList.splice(index, 1);
    if (newSkillList.length === 0) {
      this.setState({ isRoot: true });
    }
    this.setState({ addedSkills: newSkillList });
  }

  render() {
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
              <InputGroup>
                <Icon name="md-cloud" style={{ color: "#FFFFFF" }} />
                <Input
                  placeholder="Skill Name"
                  style={{ color: "#FFFFFF", fontSize: 18 }}
                  onChangeText={skillName => this.setState({ skillName })}
                />
              </InputGroup>
            </ListItem>
            <ListItem style={{ marginRight: 15 }}>
              <Textarea
                rowSpan={5}
                placeholder="Description"
                style={{ color: "#FFFFFF", width: "100%", fontSize: 18 }}
                onChangeText={description => this.setState({ description })}
              />
            </ListItem>
            <ListItem style={{ marginRight: 15 }}>
              <View style={{ width: "100%" }}>
                <Text style={commonStyles.menuText}>Parents:</Text>
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
                    {this.state.skills.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item.name}
                          value={index}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                  <Button
                    transparent
                    iconRight
                    block
                    onPress={this.addParentSkill}
                  >
                    <Icon
                      name="md-arrow-forward"
                      style={{ color: "#FFFFFF" }}
                    />
                  </Button>
                </View>
                <List>
                  {this.state.addedSkills.map((skill, index) => {
                    return (
                      <View style={commonStyles.complexListElementContainer}>
                        <Text style={commonStyles.commonText}>
                          {" "}
                          {skill.name}{" "}
                        </Text>
                        <Button
                          transparent
                          iconRight
                          block
                          onPress={() => this.deleteRow(index)}
                        >
                          <Icon name="md-close" style={{ color: "#FFFFFF" }} />
                        </Button>
                      </View>
                    );
                  })}
                </List>
              </View>
            </ListItem>
          </List>

          <Text style={commonStyles.errorTextStyle}>{this.state.error}</Text>

          {!this.state.loading ? (
            <Button
              block
              rounded
              style={commonStyles.commonWideButton}
              onPress={this.props.addSkill}
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
      </ScrollView>
    );
  }
}
