import React, { Component } from "react";
import {
  Spinner,
  List,
  ListItem,
  Icon,
  Input,
  InputGroup,
  Button,
  Text,
  View,
  Badge
} from "native-base";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import commonStyles from "../_common/commonStyles";

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: "",
      userName: "",
      email: "",
      profileChanged: false,
      updateSuccess: false,
      passwordSuccess: false,
      password: "",
      knownSkills: []
    };
  }

  render() {
    return this.state.loading ? (
      <Spinner color="#5067ff" />
    ) : (
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
              <View style={{ width: "100%" }}>
                {this.state.error.message !== undefined ? (
                  <Text style={commonStyles.errorTextStyle}>
                    {this.state.error.message}
                  </Text>
                ) : (
                  <View />
                )}
                <InputGroup
                  style={commonStyles.commonWideButton}
                  error={this.state.error.username !== undefined}
                >
                  <Icon
                    name="md-person"
                    style={{
                      color:
                        this.state.error.username !== undefined
                          ? "#ed2f2f"
                          : "#FFFFFF"
                    }}
                  />
                  <Input
                    placeholder="User Name"
                    style={{ color: "#FFFFFF", fontSize: 18 }}
                    defaultValue={this.state.userName}
                    onChangeText={userName =>
                      this.setState({
                        userName,
                        updateSuccess: false,
                        profileChanged: true
                      })
                    }
                  />
                </InputGroup>
                {this.state.error.username !== undefined ? (
                  <Text style={commonStyles.errorTextStyle}>
                    {this.state.error.username}
                  </Text>
                ) : (
                  <View />
                )}
                <InputGroup
                  style={commonStyles.commonWideButton}
                  error={this.state.error.email !== undefined}
                >
                  <Icon
                    name="md-mail"
                    style={{
                      color:
                        this.state.error.email !== undefined
                          ? "#ed2f2f"
                          : "#FFFFFF"
                    }}
                  />
                  <Input
                    placeholder="Email"
                    style={{ color: "#FFFFFF", fontSize: 18 }}
                    defaultValue={this.state.email}
                    onChangeText={email =>
                      this.setState({
                        email,
                        updateSuccess: false,
                        profileChanged: true
                      })
                    }
                  />
                </InputGroup>
                {this.state.error.email !== undefined ? (
                  <Text style={commonStyles.errorTextStyle}>
                    {this.state.error.email}
                  </Text>
                ) : this.state.updateSuccess ? (
                  <Text style={commonStyles.successTextStyle}>
                    Profile updated successfully!
                  </Text>
                ) : (
                  <View />
                )}
                <Button
                  block={Platform.OS === "android"}
                  rounded={Platform.OS === "android"}
                  disabled={!this.state.profileChanged}
                  style={
                    Platform.OS === "android"
                      ? commonStyles.commonWideButton
                      : [
                          commonStyles.commonWideButton,
                          commonStyles.profileSaveButton
                        ]
                  }
                  onPress={this.props.updateProfile}
                >
                  <Text style={commonStyles.commonText}>Save Changes</Text>
                </Button>
              </View>
            </ListItem>
            <ListItem style={{ marginRight: 15 }}>
              <View style={{ width: "100%" }}>
                <InputGroup
                  style={commonStyles.commonWideButton}
                  error={this.state.error.password !== undefined}
                >
                  <Icon
                    name="md-unlock"
                    style={{
                      color:
                        this.state.error.password !== undefined
                          ? "#ed2f2f"
                          : "#FFFFFF"
                    }}
                  />
                  <Input
                    placeholder="Password"
                    secureTextEntry
                    value={this.state.password}
                    style={{ color: "#FFFFFF", fontSize: 18 }}
                    onChangeText={password =>
                      this.setState({ password, passwordSuccess: false })
                    }
                  />
                </InputGroup>
                {this.state.error.password !== undefined ? (
                  <Text style={commonStyles.errorTextStyle}>
                    {this.state.error.password}
                  </Text>
                ) : this.state.passwordSuccess ? (
                  <Text style={commonStyles.successTextStyle}>
                    Password successfully changed!
                  </Text>
                ) : (
                  <View />
                )}
                <Button
                  block={Platform.OS === "android"}
                  rounded={Platform.OS === "android"}
                  style={
                    Platform.OS === "android"
                      ? commonStyles.commonWideButton
                      : [
                          commonStyles.commonWideButton,
                          commonStyles.profileSaveButton
                        ]
                  }
                  onPress={this.props.updatePassword}
                >
                  <Text style={commonStyles.commonText}>Change Password</Text>
                </Button>
              </View>
            </ListItem>
            <ListItem style={{ marginRight: 15 }}>
              <View style={{ width: "100%" }}>
                <Text style={[commonStyles.menuText, { marginBottom: 10 }]}>
                  Known Skills:
                </Text>
                {this.state.knownSkills.length > 0 ? (
                  <View style={commonStyles.badgeContainer}>
                    {this.state.knownSkills.map(skill => (
                      <Badge info style={{ margin: 2 }}>
                        <Text style={commonStyles.smallText}>{skill.name}</Text>
                      </Badge>
                    ))}
                  </View>
                ) : (
                  <View style={commonStyles.alignToRowCenter}>
                    <Text style={commonStyles.commonText}>
                      No skills learnt!
                    </Text>
                  </View>
                )}
              </View>
            </ListItem>
          </List>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
