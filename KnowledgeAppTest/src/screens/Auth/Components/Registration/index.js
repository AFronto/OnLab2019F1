import React, { Component, Fragment } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  Button,
  Text,
  List,
  ListItem,
  Input,
  Spinner,
  InputGroup,
  Icon
} from "native-base";
import axios from "axios";
import commonStyles from "../../../_common/commonStyles";
import env from "../../../../env";
import deviceStorage from "../../../../services/deviceStorage";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: "",
      loading: false
    };

    this.server =
      Platform.OS === "android" ? env.ServerUrlForAndroid : env.ServerUrlForWeb;

    this.registerUser = this.registerUser.bind(this);
  }

  registerUser() {
    const { username, email, password } = this.state;

    this.setState({ error: "", loading: true });

    axios
      .post("http://" + this.server + ":5000/api/auth/register", {
        username: username,
        email: email,
        password: password
      })
      .then(response => {
        deviceStorage.saveItem("id_token", response.data.token);
        deviceStorage.saveItem(
          "token_ExpTime",
          response.data.tokenExpirationTime
        );
        this.setState({ loading: false });
        this.props.newJWT(response.data.token);
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: error.response.data.error });
        this.setState({ loading: false });
      });
  }

  render() {
    const { error, loading } = this.state;

    return (
      <Fragment>
        <KeyboardAvoidingView style={{ width: "100%" }}>
          <List style={{ marginBottom: 15 }}>
            <ListItem style={{ marginRight: 15 }}>
              <InputGroup>
                <Icon name="md-mail" style={{ color: "#FFFFFF" }} />
                <Input
                  placeholder="Email"
                  style={{ color: "#FFFFFF", fontSize: 18 }}
                  onChangeText={email => this.setState({ email })}
                />
              </InputGroup>
            </ListItem>
            <ListItem style={{ marginRight: 15 }}>
              <InputGroup>
                <Icon name="md-person" style={{ color: "#FFFFFF" }} />
                <Input
                  placeholder="Username"
                  style={{ color: "#FFFFFF", fontSize: 18 }}
                  onChangeText={username => this.setState({ username })}
                />
              </InputGroup>
            </ListItem>
            <ListItem style={{ marginRight: 15 }}>
              <InputGroup>
                <Icon name="md-unlock" style={{ color: "#FFFFFF" }} />
                <Input
                  placeholder="Password"
                  secureTextEntry
                  style={{ color: "#FFFFFF", fontSize: 18 }}
                  onChangeText={password => this.setState({ password })}
                />
              </InputGroup>
            </ListItem>
          </List>

          <Text style={commonStyles.errorTextStyle}>{error}</Text>

          {!loading ? (
            <Button
              block
              rounded
              style={commonStyles.commonWideButton}
              onPress={this.registerUser}
            >
              <Text style={commonStyles.commonText}>Register</Text>
            </Button>
          ) : (
            <Spinner color="#5067ff" />
          )}
        </KeyboardAvoidingView>
        <Button
          block
          transparent
          style={commonStyles.commonWideButton}
          onPress={this.props.authSwitch}
        >
          <Text style={commonStyles.commonText}>
            Already have an account? Log in!
          </Text>
        </Button>
      </Fragment>
    );
  }
}

export { Registration };
