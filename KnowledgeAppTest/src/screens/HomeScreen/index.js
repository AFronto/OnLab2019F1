import React, { Component } from "react";
import { View, Platform } from "react-native";
import {
  Drawer,
  Header,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Title
} from "native-base";
import { Router, Switch, Route } from "./routing";
import SideBar from "./Components/SideBar";
import SkillsScreen from "../SkillsScreen";
import ThreadsScreen from "../ThreadsScreen";
import ProfileScreen from "../ProfileScreen";
import SkillCreateScreen from "../SkillCreateScreen";
import MessageCreateScreen from "../MessageCreateScreen";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      runOnClick: null
    };
  }

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  setTitle = title => {
    this.setState({ title: title });
  };

  setRunOnClick = func => {
    this.setState({ runOnClick: func });
  };

  render() {
    const { webHomeContainer } = styles;

    if (Platform.OS === "android") {
      return (
        <Router>
          <Drawer
            ref={ref => {
              this.drawer = ref;
            }}
            content={
              <SideBar
                deleteJWT={this.props.deleteJWT}
                closeDrawer={this.closeDrawer}
              />
            }
            onClose={() => this.closeDrawer()}
          >
            <Header style={{ backgroundColor: "#1A1D2E" }}>
              <Left>
                {this.state.runOnClick ? (
                  <Button transparent onPress={this.state.runOnClick}>
                    <Icon name="md-arrow-back" />
                  </Button>
                ) : (
                  <Button transparent onPress={this.openDrawer}>
                    <Icon name="md-menu" />
                  </Button>
                )}
              </Left>
              <Body>
                <Title>{this.state.title}</Title>
              </Body>
              <Right />
            </Header>
            <Switch>
              <Route
                path="/skills"
                render={props => (
                  <SkillsScreen
                    {...props}
                    jwt={this.props.jwt}
                    setTitle={this.setTitle}
                    setRunOnClick={this.setRunOnClick}
                  />
                )}
              />
              <Route
                path="/createSkill"
                render={props => (
                  <SkillCreateScreen
                    {...props}
                    jwt={this.props.jwt}
                    setTitle={this.setTitle}
                  />
                )}
              />
              <Route
                path="/createMessage"
                render={props => (
                  <MessageCreateScreen
                    {...props}
                    jwt={this.props.jwt}
                    setTitle={this.setTitle}
                  />
                )}
              />
              <Route
                exact
                path="/"
                render={props => (
                  <ThreadsScreen
                    {...props}
                    jwt={this.props.jwt}
                    setTitle={this.setTitle}
                    setRunOnClick={this.setRunOnClick}
                  />
                )}
              />
              <Route
                path="/profile"
                render={props => (
                  <ProfileScreen
                    {...props}
                    jwt={this.props.jwt}
                    setTitle={this.setTitle}
                  />
                )}
              />
            </Switch>
          </Drawer>
        </Router>
      );
    } else {
      return (
        <View style={webHomeContainer}>
          <Router>
            <SideBar deleteJWT={this.props.deleteJWT} />
            <Switch>
              <Route
                path="/skills"
                render={props => (
                  <SkillsScreen {...props} jwt={this.props.jwt} />
                )}
              />
              <Route
                path="/createSkill"
                render={props => (
                  <SkillCreateScreen {...props} jwt={this.props.jwt} />
                )}
              />
              <Route
                path="/createMessage"
                render={props => (
                  <MessageCreateScreen {...props} jwt={this.props.jwt} />
                )}
              />
              <Route
                exact
                path="/"
                render={props => (
                  <ThreadsScreen {...props} jwt={this.props.jwt} />
                )}
              />
              <Route
                path="/profile"
                render={props => (
                  <ProfileScreen {...props} jwt={this.props.jwt} />
                )}
              />
            </Switch>
          </Router>
        </View>
      );
    }
  }
}

const styles = {
  webHomeContainer: {
    flex: 1,
    backgroundColor: "#131726",
    justifyContent: "flex-start",
    flexDirection: "row",
    height: "100%"
  }
};
