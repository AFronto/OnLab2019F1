import React, { Component } from "react";
import { Login } from "./Components/LogIn";
import { Registration } from "./Components/Registration";
import { View } from "native-base";

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true
    };
    this.whichForm = this.whichForm.bind(this);
    this.authSwitch = this.authSwitch.bind(this);
  }

  authSwitch() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  whichForm() {
    if (!this.state.showLogin) {
      return (
        <Registration newJWT={this.props.newJWT} authSwitch={this.authSwitch} />
      );
    } else {
      return <Login newJWT={this.props.newJWT} authSwitch={this.authSwitch} />;
    }
  }

  render() {
    return <View style={styles.container}>{this.whichForm()}</View>;
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};
