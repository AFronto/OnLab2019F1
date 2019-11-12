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
      email: ""
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
              <View>
                <InputGroup style={commonStyles.commonWideButton}>
                  <Icon name="md-person" style={{ color: "#FFFFFF" }} />
                  <Input
                    placeholder="User Name"
                    style={{ color: "#FFFFFF", fontSize: 18 }}
                    defaultValue={this.state.userName}
                    onChangeText={userName => this.setState({ userName })}
                  />
                </InputGroup>
                <Button style={commonStyles.commonWideButton}>
                  <Text style={commonStyles.commonText}>Change</Text>
                </Button>
              </View>
            </ListItem>
            <ListItem style={{ marginRight: 15 }}>
              <View>
                <InputGroup style={commonStyles.commonWideButton}>
                  <Icon name="md-mail" style={{ color: "#FFFFFF" }} />
                  <Input
                    placeholder="Email"
                    style={{ color: "#FFFFFF", fontSize: 18 }}
                    defaultValue={this.state.email}
                    onChangeText={email => this.setState({ email })}
                  />
                </InputGroup>
                <Button style={commonStyles.commonWideButton}>
                  <Text style={commonStyles.commonText}>Change</Text>
                </Button>
              </View>
            </ListItem>
            <ListItem style={{ marginRight: 15 }}>
              <View>
                <InputGroup style={commonStyles.commonWideButton}>
                  <Icon name="md-unlock" style={{ color: "#FFFFFF" }} />
                  <Input
                    placeholder="Password"
                    style={{ color: "#FFFFFF", fontSize: 18 }}
                  />
                </InputGroup>
                <Button style={commonStyles.commonWideButton}>
                  <Text style={commonStyles.commonText}>Change</Text>
                </Button>
              </View>
            </ListItem>
            <ListItem style={{ marginRight: 15 }}>
              <View>
                <Text style={[commonStyles.menuText, { marginBottom: 10 }]}>
                  Known Skills:{" "}
                </Text>
                <View style={commonStyles.badgeContainer}>
                  {[
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25,
                    26
                  ].map(index => (
                    <Badge info style={{ margin: 2 }}>
                      <Text style={commonStyles.smallText}>Alma {index}</Text>
                    </Badge>
                  ))}
                </View>
              </View>
            </ListItem>
          </List>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
