import React, { Component } from "react";
import { Platform } from "react-native";
import SideBarView from "./SideBarView";
import { withRouter } from "../../../HomeScreen/routing";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actSite: "/"
    };
  }

  redirectTo = text => {
    this.props.history.push(text);
    if (Platform.OS === "android") {
      this.props.closeDrawer();
    }
    this.setState({ actSite: text });
  };

  render() {
    return (
      <SideBarView
        redirectTo={this.redirectTo}
        deleteJWT={this.props.deleteJWT}
        actSite={this.state.actSite}
      />
    );
  }
}

export default withRouter(SideBar);
